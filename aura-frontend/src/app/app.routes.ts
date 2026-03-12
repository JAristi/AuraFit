import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './dashboard/progress/progress.component';
import { NutritionComponent } from './dashboard/nutrition/nutrition.component';
import { TrainingComponent } from './dashboard/training/training.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: 'progress', component: ProgressComponent },
            { path: 'nutrition', component: NutritionComponent },
            { path: 'training', component: TrainingComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
