const progressRepository = require("../repositories/progress.repository");

exports.create = async (req, res) => {
    try {
        const record = await progressRepository.createOrUpdate({
            userId: req.userId,
            date: req.body.date,
            calories: req.body.calories,
            weight: req.body.weight,
            activityType: req.body.activityType,
            activityDuration: req.body.activityDuration,
            notes: req.body.notes
        });
        res.status(200).send(record);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findByRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).send({ message: "startDate y endDate son requeridos." });
        }

        const records = await progressRepository.findByDateRange(
            req.userId,
            startDate,
            endDate
        );
        res.status(200).send(records);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getStreak = async (req, res) => {
    try {
        const streak = await progressRepository.getStreak(req.userId);
        res.status(200).send({ streak });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
