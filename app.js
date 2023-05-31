const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

let products = [
    {
        "id": 1,
        "name": "Product A",
        "price": 10.99
    },
    {
        "id": 2,
        "name": "Product B",
        "price": 5.99
    },
    {
        "id": 3,
        "name": "Product C",
        "price": 15.49
    },
    {
        "id": 4,
        "name": "Product D",
        "price": 8.75
    },
    {
        "id": 5,
        "name": "Product E",
        "price": 12.99
    },
    {
        "id": 6,
        "name": "Product F",
        "price": 6.25
    },
    {
        "id": 7,
        "name": "Product G",
        "price": 9.99
    },
    {
        "id": 8,
        "name": "Product H",
        "price": 18.49
    },
    {
        "id": 9,
        "name": "Product I",
        "price": 7.85
    },
    {
        "id": 10,
        "name": "Product J",
        "price": 14.99
    }
]

// GET endpoint
app.get('/products', (req, res) => {
    res.json(products);
});

// POST endpoint
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT endpoint
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    let updatedProduct = null;

    products = products.map(product => {
        if (product.id === productId) {
            product.name = name || product.name;
            product.price = price || product.price;
            updatedProduct = product;
        }
        return product;
    });

    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE endpoint
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const initLength = products.length;

    products = products.filter(product => product.id !== productId);

    if (products.length === initLength) {
        res.status(404).json({ message: 'Product not found' });
    } else {
        res.json({ message: 'Product deleted' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});
