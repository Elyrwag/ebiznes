import React, {useState, useEffect} from 'react';
import { useShop } from "../context/ShopContext";
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useShop(); // custom hook

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.error('Get products error: ', err));
    }, []);

    return (
        <div>
            <h1>Produkty</h1>
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        <h2>{p.name}</h2>
                        <p>Cena: {p.price} PLN</p>
                        <button onClick={() => addToCart(p)}>Dodaj do koszyka</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
