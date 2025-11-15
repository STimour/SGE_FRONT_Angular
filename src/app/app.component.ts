import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './components/employee-list.component';
import { DepartmentListComponent } from './components/department-list.component';
import { AttendanceListComponent } from './components/attendance-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, EmployeeListComponent, DepartmentListComponent, AttendanceListComponent],
  template: `
  <div class="app-shell">
    <div class="topbar">
      <div class="logo">
        <div class="mark">SG</div>
        <div>
          <div style="font-weight:700">SGE</div>
          <div class="small">Gestion des employés & présences</div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div>
        <section class="card">
          <h3 class="section-title">Employés</h3>
          <app-employee-list></app-employee-list>
        </section>

        <section class="card" style="margin-top:14px">
          <h3 class="section-title">Présences récentes</h3>
          <app-attendance-list></app-attendance-list>
        </section>
      </div>

      <aside>
        <section class="card">
          <h3 class="section-title">Départements</h3>
          <app-department-list></app-department-list>
        </section>
      </aside>
    </div>
  </div>
  `,
  styles: [``]
})
export class AppComponent {
}
