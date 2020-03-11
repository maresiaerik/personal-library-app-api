const models = require('../models');

module.exports = {
    getAllCategories() {
        return models.Category.find();
    },
    getCategoryById(id) {
        if (!id || !id.length) {
            throw new Error('Id missing');
        }
        return models.Category.find( { _id: id } );
    },
    getCategoryByName(name) {
        if (!name || !name.length) {
            throw new Error('Name missing');
        }
        return models.Category.find( { name: { $regex: name, $options: 'i' } } );
    },
    createCategory(name) {
        if (!name || !name.length) {
            throw new Error('Name missing');
        }
        const category = new models.Category({ name });
        return category.save();
    },
    updateCategory(body) {
        if (!body) {
            throw new Error('Body missing');
        }
        return models.Category.update( { _id: body.id }, body);
    },
    deleteCategory(id) {
        if (!id || !id.length) {
            throw new Error('Id missing');
        }
        return models.Category.remove({ _id: id });
    },
}
