import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DepartmentDto } from '../services/api.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="departments.length; else empty">
      <div *ngFor="let d of departments" class="list-item">
        <div>
          <div style="font-weight:600">{{d.name}}</div>
          <div class="small">{{d.code}}</div>
        </div>
        <div class="small">{{d.description}}</div>
      </div>
    </div>
    <ng-template #empty>
      <div class="small">Aucun département trouvé.</div>
    </ng-template>
  `
})
export class DepartmentListComponent implements OnInit{
  private api = inject(ApiService);
  departments: DepartmentDto[] = [];
  ngOnInit(){
    this.api.getDepartments().subscribe({next: d => this.departments = d, error: () => this.departments = []});
  }
}
