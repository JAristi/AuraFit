import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            if (user && user.accessToken) {
                const cloned = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });
                return next(cloned);
            }
        } catch (e) {
            // Invalid JSON
        }
    }

    return next(req);
};
