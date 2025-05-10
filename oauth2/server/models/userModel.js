const { DataTypes, Op } = require('sequelize');
const db = require('../databases/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    github_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    jwtToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    google_access_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    github_access_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }

            if (user.google_access_token) {
                user.google_access_token = await bcrypt.hash(user.google_access_token, 10);
            }
            if (user.github_access_token) {
                user.github_access_token = await bcrypt.hash(user.github_access_token, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password && user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }

            if (user.google_access_token && user.changed('google_access_token')) {
                user.google_access_token = await bcrypt.hash(user.google_access_token, 10);
            }
            if (user.github_access_token && user.changed('github_access_token')) {
                user.github_access_token = await bcrypt.hash(user.github_access_token, 10);
            }
        },
    }
});

User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

User.prototype.generateJWT = function () {
    return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_TOKEN, { expiresIn: '1h' });
};

db.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized.');
    })
    .catch(err => {
        console.error('Error while synchronizing:', err.original.code);
        process.exit(1);
    });

module.exports = User;