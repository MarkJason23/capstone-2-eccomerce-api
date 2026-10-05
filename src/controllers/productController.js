const Product = require('../models/Product');

// POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;

    if (!name || price === undefined || !category || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, category, and stock are required'
      });
    }

    if (Number(price) < 0 || Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price and stock cannot be negative'
      });
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products?category=&search=
exports.getProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      // Escape regex special characters so user input is treated as plain text
      const escaped = String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = { $regex: escaped, $options: 'i' };
    }

    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted'
    });
  } catch (error) {
    next(error);
  }
};
