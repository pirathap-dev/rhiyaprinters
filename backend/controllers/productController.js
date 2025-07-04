import Product from '../models/Product.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const { category, 'sub[]': sub, minPrice, maxPrice, search } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (sub) filter.sub = sub;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // case-insensitive name search
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// export const getAllProducts = async (req, res) => {
//   try {
//     const { category, 'sub[]': sub, minPrice, maxPrice, search } = req.query;

//     let filter = {};

//     if (category) filter.category = category;

//     if (sub) {
//       const subArray = Array.isArray(sub) ? sub : [sub];
//       filter.sub = { $in: subArray };
//     }


//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     if (search) {
//       filter.name = { $regex: search, $options: 'i' };
//     }

//     const products = await Product.find(filter).sort({ createdAt: -1 });

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product ? res.json(product) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated ? res.json(updated) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    deleted ? res.json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const { type } = req.params;

    const filter = {
      category: type === 'accessories'
        ? 'Accessories'
        : type === 'tshirts'
          ? 'T-Shirts'
          : type === 'hoodies'
            ? 'Hoodies'
            : ''
    };

    if (!filter.category) {
      return res.status(400).json({ error: 'Invalid product type' });
    }

    if (filter.category === 'Accessories') {
      const top = await Product.aggregate([
        { $match: filter },
        { $sort: { updatedAt: -1, createdAt: -1 } },
        {
          $group: {
            _id: '$sub',
            topProducts: { $push: '$$ROOT' }
          }
        },
        {
          $project: {
            sub: '$_id',
            topProducts: { $slice: ['$topProducts', 4] },
            _id: 0
          }
        }
      ]);

      res.json(top);
    } else {
      const top = await Product.find(filter)
        .sort({ updatedAt: -1, createdAt: -1 })
        .limit(3);
      res.json(top);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

