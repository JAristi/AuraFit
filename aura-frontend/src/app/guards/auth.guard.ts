import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            if (user && user.accessToken) {
                return true;
            }
        } catch (e) {
            // Invalid JSON in localStorage
        }
    }

    router.navigate(['/auth']);
    return false;
};
