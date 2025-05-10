var axios = require('axios');
var User = require('../models/UserModel');
var { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const registerUser = async (email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('Email used by another user');

    const user = await User.create({ email, password });
    const token = user.generateJWT();

    user.jwtToken = token;
    await user.save();

    return token;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user?.checkPassword(password)) throw new Error('Błędny email lub hasło');

    if (user.jwtToken) return user.jwtToken;

    const token = user.generateJWT();
    user.jwtToken = token;
    await user.save();

    return token;
};

const loginUserWithOAuth = async (providerToken, provider) => {
    const oauthUser = await verifyOAuthToken(providerToken, provider);
    let user;

    if (!oauthUser.email) user = await User.findOne({ where: { github_id: oauthUser.id } });
    else user = await User.findOne({ where: { email: oauthUser.email } });

    if (!user) {
        if (provider === 'google') {
            user = await User.create({
                email: oauthUser.email,
                google_access_token: providerToken,
            });
        }

        else if (provider === 'github') {
            user = await User.create({
                github_id: oauthUser.id,
                github_access_token: providerToken,
            });
        }

        else throw new Error('Unsupported provider');
    }

    if (user.jwtToken) return user.jwtToken;

    const token = user.generateJWT();
    user.jwtToken = token;
    await user.save();

    return token;
};

const verifyOAuthToken = async (providerToken, provider) => {
    if (provider === 'google') {
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: providerToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            return ticket.getPayload();
        } catch (error) {
            throw new Error('Google token is invalid or expired');
        }
    }

    if (provider === 'github') {
        try {
            const userResponse = await axios.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${providerToken}` }
            });

            return userResponse.data;
        } catch (error) {
            throw new Error('Github token is invalid or expired');
        }
    }

    throw new Error('Unsupported provider');
};

const initiateGoogleLogin = (req, res) => {
    const authUrl = googleClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.email'],
        redirect_uri: "http://localhost:5000/api/users/google/callback",
    });

    res.json({ authUrl });
};

const processGoogleCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await googleClient.getToken({
            code,
            redirect_uri: "http://localhost:5000/api/users/google/callback"
        });

        const idToken = tokens.id_token;
        const jwtToken = await loginUserWithOAuth(idToken, 'google');

        res.cookie('token', jwtToken);
        res.redirect('http://localhost:3000/secret');
    } catch (error) {
        console.error('Błąd podczas logowania przez Google:', error);
        res.status(500).json({ error: 'Błąd podczas logowania przez Google' });
    }
}

const initiateGithubLogin = (req, res) => {
    const callbackUrl = 'http://localhost:5000/api/users/github/callback';
    const scope = 'user:email';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${callbackUrl}&scope=${scope}`;

    res.json({ authUrl: githubAuthUrl });
};

const processGithubCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code,
                redirect_uri: 'http://localhost:5000/api/users/github/callback'
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.data.access_token) {
            throw new Error('GitHub token is missing in the response');
        }

        const accessToken = response.data.access_token;
        const jwtToken = await loginUserWithOAuth(accessToken, 'github');

        res.cookie('token', jwtToken);
        res.redirect('http://localhost:3000/secret');
    } catch (error) {
        console.error('Błąd podczas logowania przez GitHub:', error);
        res.status(500).json({ error: 'Błąd podczas logowania przez GitHub' });
    }
};

module.exports = { registerUser, loginUser, initiateGoogleLogin, processGoogleCallback, initiateGithubLogin, processGithubCallback };