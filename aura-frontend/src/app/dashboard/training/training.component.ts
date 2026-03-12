import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-training',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './training.component.html',
    styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {
    activeCategory = 'Todos';
    categories = ['Todos', 'Empuje', 'Tracción', 'Pierna', 'Core', 'Cardio'];
    selectedSplit: any = null;

    splits = [
        {
            id: 1,
            name: 'Push / Pull / Legs',
            icon: '🔄',
            frequency: '3-6 días / semana',
            muscleGroups: ['Pecho', 'Espalda', 'Piernas', 'Hombros']
        },
        {
            id: 2,
            name: 'Full Body',
            icon: '⚖️',
            frequency: '3 días / semana',
            muscleGroups: ['Cuerpo Completo']
        },
        {
            id: 3,
            name: 'Torso / Pierna',
            icon: '📐',
            frequency: '4 días / semana',
            muscleGroups: ['Tren Superior', 'Tren Inferior']
        }
    ];

    exercises = [
        { id: 1, name: 'Press de Banca', category: 'Empuje', muscleGroup: 'Pecho', equipment: 'Barra', instructions: 'Acostado en un banco, empuja la barra hacia arriba extendiendo los brazos.' },
        { id: 2, name: 'Sentadillas', category: 'Pierna', muscleGroup: 'Cuádriceps', equipment: 'Barra', instructions: 'Baja las caderas manteniendo la espalda recta y vuelve a subir.' },
        { id: 3, name: 'Dominadas', category: 'Tracción', muscleGroup: 'Espalda', equipment: 'Barra fija', instructions: 'Cuélgate y tira de tu peso hacia arriba hasta que la barbilla pase la barra.' },
        { id: 4, name: 'Press Militar', category: 'Empuje', muscleGroup: 'Hombros', equipment: 'Mancuernas', instructions: 'Empuja las pesas sobre tu cabeza desde la altura de los hombros.' },
        { id: 5, name: 'Peso Muerto', category: 'Pierna', muscleGroup: 'Isquios / Espalda', equipment: 'Barra', instructions: 'Levanta la barra del suelo manteniendo la espalda neutra.' },
        { id: 6, name: 'Remo con Remo', category: 'Tracción', muscleGroup: 'Espalda', equipment: 'Mancuerna', instructions: 'Inclina el torso y tira de la mancuerna hacia tu cadera.' },
        { id: 7, name: 'Plancha', category: 'Core', muscleGroup: 'Abdominales', equipment: 'Ninguno', instructions: 'Mantén el cuerpo recto apoyado en antebrazos y pies.' },
        { id: 8, name: 'Burpees', category: 'Cardio', muscleGroup: 'Total', equipment: 'Ninguno', instructions: 'Haz una flexión, salta y repite de forma explosiva.' }
    ];

    filteredExercises = this.exercises;

    ngOnInit() {
        this.selectedSplit = this.splits[0];
    }

    setCategory(cat: string) {
        this.activeCategory = cat;
        if (cat === 'Todos') {
            this.filteredExercises = this.exercises;
        } else {
            this.filteredExercises = this.exercises.filter(ex => ex.category === cat);
        }
    }

    selectSplit(split: any) {
        this.selectedSplit = split;
        Swal.fire({
            title: 'Distribución Seleccionada',
            text: `Has activado el plan: ${split.name}. ¡A darle con toda!`,
            icon: 'success',
            background: '#1a1f26',
            color: '#f8fafc',
            confirmButtonColor: '#00f2fe',
            timer: 2000,
            timerProgressBar: true
        });
    }

    addToWorkout(exercise: any) {
        Swal.fire({
            title: '¡Buen trabajo!',
            text: `${exercise.name} se ha añadido a tu entrenamiento de hoy.`,
            icon: 'info',
            background: '#1a1f26',
            color: '#f8fafc',
            confirmButtonColor: '#00f2fe',
            timer: 1500,
            showConfirmButton: false
        });
    }

    getCategoryIcon(cat: string): string {
        const icons: { [key: string]: string } = {
            'Empuje': '💪',
            'Tracción': '🧗',
            'Pierna': '🦵',
            'Core': '🛡️',
            'Cardio': '🏃'
        };
        return icons[cat] || '🏋️';
    }
}
