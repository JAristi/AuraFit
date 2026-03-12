import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    signup(user: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/signup`, user);
    }

    signin(credentials: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/signin`, credentials);
    }

    googleSignin(credential: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/google`, { credential });
    }

    getPlans(userId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/plans?userId=${userId}`);
    }

    createPlan(plan: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/plans`, plan);
    }

    // Progress
    getProgress(startDate: string, endDate: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/progress?startDate=${startDate}&endDate=${endDate}`);
    }

    saveProgress(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/progress`, data);
    }

    getStreak(): Observable<any> {
        return this.http.get(`${this.baseUrl}/progress/streak`);
    }

    // Nutrition
    getMealSummary(date: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/meals/summary?date=${date}`);
    }

    createMeal(meal: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/meals`, meal);
    }

    updateMeal(id: number, meal: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/meals/${id}`, meal);
    }

    deleteMeal(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/meals/${id}`);
    }
}
