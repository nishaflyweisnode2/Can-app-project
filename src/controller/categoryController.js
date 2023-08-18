const Category = require('../model/categoryModel');

const { createCategoryValidation } = require('../validation/categoryValidation');


const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const { error } = createCategoryValidation.validate({ name, });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const category = new Category({
            name,
        });

        await category.save();

        return res.status(201).json({
            message: 'Category created successfully',
            category,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create category' });
    }
};

module.exports = {
    createCategory,
};
