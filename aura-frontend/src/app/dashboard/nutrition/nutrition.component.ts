import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-nutrition',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './nutrition.component.html',
    styleUrl: './nutrition.component.css'
})
export class NutritionComponent implements OnInit {
    selectedDate = '';
    loading = false;

    // Macro summary
    totalCalories = 0;
    totalProteins = 0;
    totalCarbs = 0;
    totalFats = 0;
    mealCount = 0;

    // Meals grouped by type
    mealsByType: any = {
        desayuno: [],
        almuerzo: [],
        comida: [],
        snack: []
    };

    // Form
    showForm = false;
    editingMeal: any = null;
    formData = {
        mealType: 'desayuno',
        name: '',
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        notes: ''
    };

    // Recipes
    recipes = [
        { name: 'Bowl de Quinoa con Pollo', calories: 450, proteins: 35, carbs: 40, fats: 12, icon: '🥗', description: 'Quinoa, pollo a la plancha, aguacate, espinaca y tomate cherry.' },
        { name: 'Batido Proteico de Banana', calories: 280, proteins: 25, carbs: 30, fats: 8, icon: '🥤', description: 'Banana, proteína en polvo, leche de almendra y mantequilla de maní.' },
        { name: 'Avena con Frutas', calories: 320, proteins: 12, carbs: 50, fats: 8, icon: '🥣', description: 'Avena con arándanos, fresas, miel y semillas de chía.' },
        { name: 'Salmón con Verduras', calories: 520, proteins: 42, carbs: 15, fats: 28, icon: '🐟', description: 'Salmón al horno con brócoli, zanahoria y espárragos.' },
        { name: 'Wrap de Pavo', calories: 380, proteins: 30, carbs: 35, fats: 14, icon: '🌯', description: 'Tortilla integral con pavo, lechuga, tomate y hummus.' },
        { name: 'Yogurt con Granola', calories: 250, proteins: 15, carbs: 35, fats: 6, icon: '🥛', description: 'Yogurt griego natural con granola casera y miel.' }
    ];

    mealTypeLabels: { [key: string]: string } = {
        'desayuno': '🌅 Desayuno',
        'almuerzo': '☀️ Almuerzo',
        'comida': '🌙 Comida',
        'snack': '🍎 Snacks'
    };

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.selectedDate = this.getTodayString();
        this.loadMeals();
    }

    private getTodayString(): string {
        return new Date().toISOString().split('T')[0];
    }

    loadMeals() {
        if (!this.selectedDate) return;
        this.loading = true;

        this.apiService.getMealSummary(this.selectedDate).subscribe({
            next: (summary) => {
                this.totalCalories = summary.totalCalories;
                this.totalProteins = summary.totalProteins;
                this.totalCarbs = summary.totalCarbs;
                this.totalFats = summary.totalFats;
                this.mealCount = summary.mealCount;
                this.mealsByType = summary.byType;
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                console.error('Error loading meals:', err);
            }
        });
    }

    onDateChange() {
        this.loadMeals();
    }

    openAddForm(mealType: string) {
        this.editingMeal = null;
        this.formData = {
            mealType,
            name: '',
            calories: 0,
            proteins: 0,
            carbs: 0,
            fats: 0,
            notes: ''
        };
        this.showForm = true;
    }

    openEditForm(meal: any) {
        this.editingMeal = meal;
        this.formData = {
            mealType: meal.mealType,
            name: meal.name,
            calories: meal.calories,
            proteins: meal.proteins,
            carbs: meal.carbs,
            fats: meal.fats,
            notes: meal.notes || ''
        };
        this.showForm = true;
    }

    closeForm() {
        this.showForm = false;
        this.editingMeal = null;
    }

    saveMeal() {
        if (!this.formData.name) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo requerido',
                text: 'El nombre de la comida es obligatorio.',
                background: '#1a1f26',
                color: '#f8fafc',
                confirmButtonColor: '#00f2fe'
            });
            return;
        }

        const payload = { ...this.formData, date: this.selectedDate };

        const request = this.editingMeal
            ? this.apiService.updateMeal(this.editingMeal.id, payload)
            : this.apiService.createMeal(payload);

        request.subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: this.editingMeal ? '¡Actualizado!' : '¡Registrado!',
                    text: this.editingMeal ? 'Comida actualizada correctamente.' : 'Comida registrada correctamente.',
                    background: '#1a1f26',
                    color: '#f8fafc',
                    confirmButtonColor: '#00f2fe',
                    timer: 1500,
                    timerProgressBar: true
                });
                this.closeForm();
                this.loadMeals();
            },
            error: (err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.error?.message || 'No se pudo guardar la comida.',
                    background: '#1a1f26',
                    color: '#f8fafc',
                    confirmButtonColor: '#00f2fe'
                });
            }
        });
    }

    deleteMeal(meal: any) {
        Swal.fire({
            title: '¿Eliminar comida?',
            text: `¿Seguro que deseas eliminar "${meal.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff453a',
            cancelButtonColor: '#6e6e73',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#1a1f26',
            color: '#f8fafc'
        }).then((result) => {
            if (result.isConfirmed) {
                this.apiService.deleteMeal(meal.id).subscribe({
                    next: () => {
                        this.loadMeals();
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado',
                            text: 'La comida ha sido eliminada.',
                            background: '#1a1f26',
                            color: '#f8fafc',
                            confirmButtonColor: '#00f2fe',
                            timer: 1500,
                            timerProgressBar: true
                        });
                    },
                    error: () => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar la comida.',
                            background: '#1a1f26',
                            color: '#f8fafc',
                            confirmButtonColor: '#00f2fe'
                        });
                    }
                });
            }
        });
    }

    addRecipeAsMeal(recipe: any) {
        Swal.fire({
            title: 'Agregar receta',
            text: `¿Agregar "${recipe.name}" como comida de hoy?`,
            icon: 'question',
            input: 'select',
            inputOptions: {
                'desayuno': '🌅 Desayuno',
                'almuerzo': '☀️ Almuerzo',
                'comida': '🌙 Comida',
                'snack': '🍎 Snack'
            },
            inputPlaceholder: 'Selecciona el tipo',
            showCancelButton: true,
            confirmButtonColor: '#00f2fe',
            cancelButtonColor: '#6e6e73',
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            background: '#1a1f26',
            color: '#f8fafc'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const payload = {
                    date: this.selectedDate,
                    mealType: result.value,
                    name: recipe.name,
                    calories: recipe.calories,
                    proteins: recipe.proteins,
                    carbs: recipe.carbs,
                    fats: recipe.fats,
                    notes: recipe.description
                };
                this.apiService.createMeal(payload).subscribe({
                    next: () => {
                        this.loadMeals();
                        Swal.fire({
                            icon: 'success',
                            title: '¡Agregado!',
                            text: `"${recipe.name}" se añadió a tu plan del día.`,
                            background: '#1a1f26',
                            color: '#f8fafc',
                            confirmButtonColor: '#00f2fe',
                            timer: 1500,
                            timerProgressBar: true
                        });
                    },
                    error: () => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo agregar la receta.',
                            background: '#1a1f26',
                            color: '#f8fafc',
                            confirmButtonColor: '#00f2fe'
                        });
                    }
                });
            }
        });
    }

    getMealTypeKeys(): string[] {
        return Object.keys(this.mealsByType);
    }
}
