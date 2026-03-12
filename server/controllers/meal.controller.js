const mealRepository = require("../repositories/meal.repository");

exports.create = async (req, res) => {
    try {
        const meal = await mealRepository.create({
            userId: req.userId,
            date: req.body.date,
            mealType: req.body.mealType,
            name: req.body.name,
            calories: req.body.calories,
            proteins: req.body.proteins,
            carbs: req.body.carbs,
            fats: req.body.fats,
            notes: req.body.notes
        });
        res.status(201).send(meal);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const meal = await mealRepository.update(req.params.id, req.userId, {
            mealType: req.body.mealType,
            name: req.body.name,
            calories: req.body.calories,
            proteins: req.body.proteins,
            carbs: req.body.carbs,
            fats: req.body.fats,
            notes: req.body.notes
        });
        if (!meal) {
            return res.status(404).send({ message: "Comida no encontrada." });
        }
        res.status(200).send(meal);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await mealRepository.delete(req.params.id, req.userId);
        if (!result) {
            return res.status(404).send({ message: "Comida no encontrada." });
        }
        res.status(200).send({ message: "Comida eliminada." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).send({ message: "La fecha es requerida." });
        }
        const meals = await mealRepository.findByDate(req.userId, date);
        res.status(200).send(meals);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getDailySummary = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).send({ message: "La fecha es requerida." });
        }
        const summary = await mealRepository.getDailySummary(req.userId, date);
        res.status(200).send(summary);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).send({ message: "startDate y endDate son requeridos." });
        }
        const meals = await mealRepository.findByDateRange(req.userId, startDate, endDate);
        res.status(200).send(meals);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
