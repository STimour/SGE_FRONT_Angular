import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, AttendanceDto } from '../services/api.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="attendances.length; else empty">
      <div *ngFor="let a of attendances.slice(0,6)" class="list-item">
        <div>
          <div style="font-weight:600">{{a.employeeName}}</div>
          <div class="small">{{a.date}} • {{a.clockIn || '—'}} → {{a.clockOut || '—'}}</div>
        </div>
        <div class="small">{{a.workedHours ?? '—'}}h</div>
      </div>
    </div>
    <ng-template #empty>
      <div class="small">Aucune présence récente disponible.</div>
    </ng-template>
  `
})
export class AttendanceListComponent implements OnInit{
  private api = inject(ApiService);
  attendances: AttendanceDto[] = [];
  ngOnInit(){
    // Pour la démo on récupère toutes les présences (si endpoint disponible côté backend)
    // Le backend proposé expose plusieurs méthodes ; ajustez l'endpoint côté API si besoin.
    this.api.getEmployees().subscribe({next: emps => {
      // récupérer les présences des premiers employés (si existant)
      if(emps.length) this.api.getAttendancesByEmployee(emps[0].id).subscribe({next: at => this.attendances = at, error: ()=> this.attendances = []});
    }, error: ()=> this.attendances = []});
  }
}
