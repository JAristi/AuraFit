import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-progress',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
    progressRecords: any[] = [];
    streak = 0;
    startDate = '';
    endDate = '';
    loading = false;

    // Summary stats
    totalCalories = 0;
    avgCalories = 0;
    latestWeight: number | null = null;
    weightChange: number | null = null;
    totalActivityMinutes = 0;
    daysTracked = 0;

    // Form for logging progress
    showForm = false;
    formData = {
        date: this.getTodayString(),
        calories: 0,
        weight: null as number | null,
        activityType: '',
        activityDuration: 0,
        notes: ''
    };

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.setDefaultDateRange();
        this.loadProgress();
        this.loadStreak();
    }

    private getTodayString(): string {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    private setDefaultDateRange() {
        const today = new Date();
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        this.endDate = today.toISOString().split('T')[0];
        this.startDate = monthAgo.toISOString().split('T')[0];
    }

    loadProgress() {
        if (!this.startDate || !this.endDate) return;
        this.loading = true;

        this.apiService.getProgress(this.startDate, this.endDate).subscribe({
            next: (records) => {
                this.progressRecords = records;
                this.calculateStats();
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                console.error('Error loading progress:', err);
            }
        });
    }

    loadStreak() {
        this.apiService.getStreak().subscribe({
            next: (res) => {
                this.streak = res.streak;
            },
            error: (err) => {
                console.error('Error loading streak:', err);
            }
        });
    }

    private calculateStats() {
        const records = this.progressRecords;
        this.daysTracked = records.length;

        if (records.length === 0) {
            this.totalCalories = 0;
            this.avgCalories = 0;
            this.latestWeight = null;
            this.weightChange = null;
            this.totalActivityMinutes = 0;
            return;
        }

        this.totalCalories = records.reduce((sum: number, r: any) => sum + (r.calories || 0), 0);
        this.avgCalories = Math.round(this.totalCalories / records.length);
        this.totalActivityMinutes = records.reduce((sum: number, r: any) => sum + (r.activityDuration || 0), 0);

        // Weight: latest and change
        const withWeight = records.filter((r: any) => r.weight != null).sort((a: any, b: any) => a.date.localeCompare(b.date));
        if (withWeight.length > 0) {
            this.latestWeight = withWeight[withWeight.length - 1].weight;
            if (withWeight.length > 1) {
                this.weightChange = +(withWeight[withWeight.length - 1].weight - withWeight[0].weight).toFixed(1);
            } else {
                this.weightChange = null;
            }
        }
    }

    onFilterApply() {
        this.loadProgress();
    }

    toggleForm() {
        this.showForm = !this.showForm;
    }

    saveProgress() {
        if (!this.formData.date) return;

        this.apiService.saveProgress(this.formData).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registrado!',
                    text: 'Tu progreso del día ha sido guardado.',
                    background: '#1a1f26',
                    color: '#f8fafc',
                    confirmButtonColor: '#00f2fe',
                    timer: 2000,
                    timerProgressBar: true
                });
                this.showForm = false;
                this.loadProgress();
                this.loadStreak();
            },
            error: (err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.error?.message || 'No se pudo guardar el progreso.',
                    background: '#1a1f26',
                    color: '#f8fafc',
                    confirmButtonColor: '#00f2fe'
                });
            }
        });
    }

    formatDate(dateStr: string): string {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('es-CO', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    getActivityIcon(type: string): string {
        const icons: { [key: string]: string } = {
            'cardio': '🏃',
            'fuerza': '🏋️',
            'yoga': '🧘',
            'natacion': '🏊',
            'ciclismo': '🚴',
            'caminata': '🚶',
            'otro': '💪'
        };
        return icons[type?.toLowerCase()] || '💪';
    }
}
