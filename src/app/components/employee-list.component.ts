import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, EmployeeDto } from '../services/api.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="employees.length; else empty">
      <div *ngFor="let e of employees" class="list-item">
        <div>
          <div style="font-weight:600">{{e.fullName}}</div>
          <div class="small">{{e.email}} • {{e.departmentName}}</div>
        </div>
        <div class="tag">{{e.position || '–'}}</div>
      </div>
    </div>
    <ng-template #empty>
      <div class="small">Aucun employé trouvé (utilisez le backend pour peupler).</div>
    </ng-template>
  `
})
export class EmployeeListComponent implements OnInit{
  private api = inject(ApiService);
  employees: EmployeeDto[] = [];
  ngOnInit(){
    this.api.getEmployees().subscribe({next: e => this.employees = e, error: () => this.employees = []});
  }
}
