const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

const products = [
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
    return res.json(products);
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
        return res.json(updatedProduct);
    } else {
        return res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE endpoint
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const initLength = products.length;

    products = products.filter(product => product.id !== productId);

    if (products.length === initLength) {
        return res.status(404).json({ message: 'Product not found' });
    } else {
        return res.json({ message: 'Product deleted' });
    }
});

// recherche des produits par nom
app.get('/products', (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Missing name' });
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(name.toLowerCase())
    );

    return res.json(filteredProducts);
});

// pagination des resultats
app.get('/products/page/:pageNumber', (req, res) => {
    const { pageNumber } = req.params;
    const pageSize = 5; // Number of products per page
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedProducts = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / pageSize);

    return res.json({
        data: paginatedProducts,
        currentPage: pageNumber,
        totalPages: totalPages
    });
});

// gestion d'erreurs et retours
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error' });
});


// Start server
app.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});
