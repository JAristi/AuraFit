import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
  <main class="hero-section">
    <div class="hero-content">
      <h1 class="animate-fade">Transforma tu vida con <span>Inteligencia</span></h1>
      <p>Planes de nutrición y entrenamiento personalizados, optimizados por expertos para tus metas específicas.</p>
      <div class="cta-group">
        <button class="btn-primary" routerLink="/auth">Empezar ahora</button>
        <button class="btn-secondary">Ver servicios</button>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="glass-card stat-item">
        <h3>1.2k+</h3>
        <p>Usuarios Activos</p>
      </div>
      <div class="glass-card stat-item">
         <h3>98%</h3>
         <p>Éxito Garantizado</p>
      </div>
    </div>
  </main>

  <section class="services">
    <h2 class="section-title">Nuestros Servicios</h2>
    <div class="cards-grid">
      <div class="glass-card service-card">
        <div class="card-icon">🥗</div>
        <h3>Nutrición</h3>
        <p>Dietas balanceadas adaptadas a tu metabolismo.</p>
      </div>
      <div class="glass-card service-card">
         <div class="card-icon">🏋️</div>
         <h3>Entrenamiento</h3>
         <p>Rutinas personalizadas para gimnasio o casa.</p>
      </div>
      <div class="glass-card service-card">
         <div class="card-icon">📊</div>
         <h3>Seguimiento</h3>
         <p>Análisis de progreso semanal detallado.</p>
      </div>
    </div>
  </section>
  `,
    styles: [`
  .hero-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    margin-bottom: 6rem;
  }

  .hero-content h1 {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  .hero-content h1 span {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-content p {
    color: var(--text-dim);
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
    max-width: 500px;
  }

  .cta-group {
    display: flex;
    gap: 1.5rem;
  }

  .btn-secondary {
    background: transparent;
    border: 1px solid var(--border-glass);
    padding: 12px 28px;
    border-radius: 12px;
    color: var(--text-main);
    cursor: pointer;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .stat-item {
    padding: 2rem;
    text-align: center;
  }
  .stat-item h3 {
    font-size: 2.5rem;
    color: var(--primary);
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  .service-card {
    padding: 2.5rem;
    text-align: center;
  }
  .card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  .service-card h3 {
    margin-bottom: 1rem;
  }
  .service-card p {
    color: var(--text-dim);
  }

  @media (max-width: 768px) {
    .hero-section {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .hero-content h1 {
      font-size: 3rem;
    }
    .hero-content p {
      margin: 0 auto 2.5rem;
    }
    .cta-group {
      justify-content: center;
    }
    .stats-grid {
      margin-top: 3rem;
    }
  }
  `]
})
export class HomeComponent { }
