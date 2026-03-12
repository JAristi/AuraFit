import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

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

    constructor(private router: Router) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.userInitials = this.getInitials(this.user.name || '');
        }
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
