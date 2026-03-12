const db = require("../models");
const Plan = db.plans;

exports.create = async (req, res) => {
    try {
        const plan = await Plan.create({
            userId: req.body.userId,
            type: req.body.type,
            title: req.body.title,
            content: req.body.content
        });
        res.send(plan);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const userId = req.query.userId;
        const plans = await Plan.findAll({ where: { userId: userId } });
        res.send(plans);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
