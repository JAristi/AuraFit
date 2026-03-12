const { Op } = require("sequelize");
const db = require("../models");
const Progress = db.progress;

class ProgressRepository {
    async createOrUpdate(data) {
        const [record, created] = await Progress.findOrCreate({
            where: { userId: data.userId, date: data.date },
            defaults: data
        });

        if (!created) {
            await record.update(data);
        }

        return record;
    }

    async findByDateRange(userId, startDate, endDate) {
        return await Progress.findAll({
            where: {
                userId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['date', 'DESC']]
        });
    }

    async getStreak(userId) {
        const records = await Progress.findAll({
            where: { userId },
            attributes: ['date'],
            order: [['date', 'DESC']]
        });

        if (records.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if the most recent record is today or yesterday
        const lastDate = new Date(records[0].date);
        lastDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) return 0; // Streak broken

        // Count consecutive days
        for (let i = 0; i < records.length; i++) {
            const recordDate = new Date(records[i].date);
            recordDate.setHours(0, 0, 0, 0);

            const expectedDate = new Date(today);
            expectedDate.setDate(expectedDate.getDate() - (i + diffDays));
            expectedDate.setHours(0, 0, 0, 0);

            if (recordDate.getTime() === expectedDate.getTime()) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }
}

module.exports = new ProgressRepository();
