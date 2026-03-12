const db = require("../models");
const User = db.users;

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({
            where: {
                email: email
            }
        });
    }

    async findById(id) {
        return await User.findByPk(id);
    }
}

module.exports = new UserRepository();
