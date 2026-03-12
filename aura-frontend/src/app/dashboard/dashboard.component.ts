import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styles: [`
    /* Styles are in the HTML file inline */
  `]
})
export class DashboardComponent {
    user: any = null;
    userInitials = '';
    today = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
    
    // Dynamic Stats
    stats = {
        caloriesConsumed: 0,
        caloriesGoal: 2200,
        waterConsumed: 0, // Mocked as it's not in DB yet
        waterGoal: 3.0,
        nextMeal: 'No programada',
        nextMealMacros: { p: 0, c: 0, g: 0 },
        training: {
            title: 'No programado',
            exercises: [] as string[]
        }
    };

    constructor(private router: Router, private apiService: ApiService) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.userInitials = this.getInitials(this.user.name || '');
            this.loadTodayData();
        }
    }

    private loadTodayData() {
        const dateStr = new Date().toISOString().split('T')[0];
        
        // Load Nutrition Summary
        this.apiService.getMealSummary(dateStr).subscribe({
            next: (summary) => {
                this.stats.caloriesConsumed = summary.totalCalories;
                // Basic logic for next meal (e.g. if breakfast is done, show lunch)
                if (summary.byType.desayuno.length === 0) {
                    this.stats.nextMeal = 'Desayuno Saludable';
                    this.stats.nextMealMacros = { p: 20, c: 30, g: 10 };
                } else if (summary.byType.almuerzo.length === 0) {
                    this.stats.nextMeal = 'Almuerzo Equilibrado';
                    this.stats.nextMealMacros = { p: 40, c: 50, g: 15 };
                } else if (summary.byType.comida.length === 0) {
                    this.stats.nextMeal = 'Cena Ligera';
                    this.stats.nextMealMacros = { p: 30, c: 20, g: 8 };
                } else {
                    this.stats.nextMeal = 'Snack de Tarde';
                    this.stats.nextMealMacros = { p: 10, c: 15, g: 5 };
                }
            }
        });

        // Load Training (mocked for now, but could be from plans)
        this.stats.training = {
            title: 'Empuje (Pecho, Hombro, Tríceps)',
            exercises: ['Press de Banca - 4x10', 'Elevaciones Laterales - 3x15', 'Copa de Tríceps - 3x12']
        };
    }

    getCaloryPercentage(): number {
        return Math.min(Math.round((this.stats.caloriesConsumed / this.stats.caloriesGoal) * 100), 100);
    }

    private getInitials(name: string): string {
        return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
    }

    isActive(route: string): boolean {
        return this.router.url === route || this.router.url.startsWith(route + '/');
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }
}
