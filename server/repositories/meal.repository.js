const { Op } = require("sequelize");
const db = require("../models");
const Meal = db.meals;

class MealRepository {
    async create(data) {
        return await Meal.create(data);
    }

    async findById(id, userId) {
        return await Meal.findOne({ where: { id, userId } });
    }

    async update(id, userId, data) {
        const meal = await this.findById(id, userId);
        if (!meal) return null;
        return await meal.update(data);
    }

    async delete(id, userId) {
        const meal = await this.findById(id, userId);
        if (!meal) return null;
        await meal.destroy();
        return true;
    }

    async findByDate(userId, date) {
        return await Meal.findAll({
            where: { userId, date },
            order: [['mealType', 'ASC'], ['createdAt', 'ASC']]
        });
    }

    async findByDateRange(userId, startDate, endDate) {
        return await Meal.findAll({
            where: {
                userId,
                date: { [Op.between]: [startDate, endDate] }
            },
            order: [['date', 'DESC'], ['mealType', 'ASC']]
        });
    }

    async getDailySummary(userId, date) {
        const meals = await this.findByDate(userId, date);
        const summary = {
            totalCalories: 0,
            totalProteins: 0,
            totalCarbs: 0,
            totalFats: 0,
            mealCount: meals.length,
            byType: {
                desayuno: [],
                almuerzo: [],
                comida: [],
                snack: []
            }
        };

        meals.forEach(meal => {
            summary.totalCalories += meal.calories || 0;
            summary.totalProteins += meal.proteins || 0;
            summary.totalCarbs += meal.carbs || 0;
            summary.totalFats += meal.fats || 0;
            if (summary.byType[meal.mealType]) {
                summary.byType[meal.mealType].push(meal);
            }
        });

        summary.totalProteins = +summary.totalProteins.toFixed(1);
        summary.totalCarbs = +summary.totalCarbs.toFixed(1);
        summary.totalFats = +summary.totalFats.toFixed(1);

        return summary;
    }
}

module.exports = new MealRepository();
