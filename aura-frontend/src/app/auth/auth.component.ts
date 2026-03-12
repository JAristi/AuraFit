import { Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, AfterViewInit {
  isLogin = true;
  userData = { name: '', email: '', password: '', confirmPassword: '' };
  errorMessage = '';
  googleReady = false;

  @ViewChild('googleBtnContainer') googleBtnContainer!: ElementRef;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    // Google Identity Services se inicializa en ngAfterViewInit
  }

  ngAfterViewInit() {
    this.initializeGoogleSignIn();
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }


  private initializeGoogleSignIn(retries = 5) {
    if (typeof google === 'undefined') {
      if (retries > 0) {
        setTimeout(() => this.initializeGoogleSignIn(retries - 1), 500);
      }
      return;
    }

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => {
        this.ngZone.run(() => {
          this.handleGoogleResponse(response);
        });
      }
    });

    this.renderGoogleButton();
  }

  private renderGoogleButton() {
    if (this.googleBtnContainer && this.googleBtnContainer.nativeElement) {
      google.accounts.id.renderButton(
        this.googleBtnContainer.nativeElement,
        {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          width: this.googleBtnContainer.nativeElement.offsetWidth
        }
      );
      this.googleReady = true;
    }
  }


  private handleGoogleResponse(response: any) {
    this.apiService.googleSignin(response.credential).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Hola ${res.name}, has iniciado sesión con Google.`,
          background: '#1a1f26',
          color: '#f8fafc',
          confirmButtonColor: '#00f2fe',
          timer: 2000,
          timerProgressBar: true
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const msg = err.status === 0
          ? 'No se pudo conectar con el servidor.'
          : (err.error?.message || 'Error al iniciar sesión con Google.');

        Swal.fire({
          icon: 'error',
          title: 'Error con Google',
          text: msg,
          background: '#1a1f26',
          color: '#f8fafc',
          confirmButtonColor: '#00f2fe'
        });
      }
    });
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.isLogin) {
      if (!this.userData.email || !this.userData.password) {
        this.errorMessage = 'Por favor, completa todos los campos.';
        return;
      }

      this.apiService.signin({ email: this.userData.email, password: this.userData.password }).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          const msg = err.status === 0
            ? 'No se pudo conectar con el servidor. Por favor, verifica que el backend esté ejecutándose.'
            : (err.error?.message || 'Credenciales no válidas. Intenta de nuevo.');

          Swal.fire({
            icon: 'error',
            title: 'Error de acceso',
            text: msg,
            background: '#1a1f26',
            color: '#f8fafc',
            confirmButtonColor: '#00f2fe'
          });
        }
      });
    } else {
      // Frontend validation
      if (!this.userData.name || !this.userData.email || !this.userData.password || !this.userData.confirmPassword) {
        this.errorMessage = 'Todos los campos son obligatorios.';
        return;
      }

      if (!this.validateEmail(this.userData.email)) {
        this.errorMessage = 'El correo electrónico no es válido.';
        return;
      }

      if (this.userData.password.length < 6) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }

      if (this.userData.password !== this.userData.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }

      this.apiService.signup(this.userData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Te has unido a AURA.fit. Ya puedes iniciar sesión.',
            background: '#1a1f26',
            color: '#f8fafc',
            confirmButtonColor: '#00f2fe',
            timer: 3000,
            timerProgressBar: true
          });
          this.isLogin = true;
          this.userData = { name: '', email: '', password: '', confirmPassword: '' };
        },
        error: (err) => {
          const msg = err.status === 0
            ? 'No se pudo conectar con el servidor. Por favor, verifica que el backend esté ejecutándose.'
            : (err.error?.message || 'Hubo un problema al crear tu cuenta. Intenta de nuevo.');

          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: msg,
            background: '#1a1f26',
            color: '#f8fafc',
            confirmButtonColor: '#00f2fe'
          });
        }
      });
    }
  }
}
