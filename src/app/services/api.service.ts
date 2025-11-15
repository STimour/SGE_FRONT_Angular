import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTO interfaces (lightweight client-side shapes)
export interface EmployeeDto { id: number; fullName: string; email: string; phoneNumber: string; departmentName: string; position?: string; salary?: number; isActive?: boolean; seniority?: number }
export interface EmployeeCreateDto { firstName:string; lastName:string; email:string; phoneNumber:string; departmentId:number; position?:string; salary?:number }
export interface EmployeeUpdateDto { firstName?:string; lastName?:string; phoneNumber?:string; address?:string; position?:string; salary?:number; isActive?:boolean; endDate?:string; departmentId?:number }
export interface DepartmentDto { id:number; name:string; code:string; description?:string }
export interface DepartmentCreateDto { name:string; code:string; description?:string }
export interface DepartmentUpdateDto { name?:string; description?:string }
export interface AttendanceDto { id:number; employeeId:number; employeeName?:string; date:string; clockIn?:string; clockOut?:string; breakDuration?:number; workedHours?:number; overtimeHours?:number; notes?:string }
export interface AttendanceCreateDto { employeeId:number; date:string; clockIn?:string; clockOut?:string; breakDurationHours?:number; notes?:string }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = '/api';
  constructor(private http: HttpClient) {}

  // -------------------- Employees --------------------
  getEmployees(): Observable<EmployeeDto[]> { return this.http.get<EmployeeDto[]>(`${this.base}/employees`); }
  getEmployee(id: number): Observable<EmployeeDto> { return this.http.get<EmployeeDto>(`${this.base}/employees/${id}`); }
  getEmployeeByEmail(email: string): Observable<EmployeeDto | null> { return this.http.get<EmployeeDto | null>(`${this.base}/employees/by-email`, { params: new HttpParams().set('email', email) }); }
  getEmployeesByDepartment(departmentId: number): Observable<EmployeeDto[]> { return this.http.get<EmployeeDto[]>(`${this.base}/departments/${departmentId}/employees`); }
  getEmployeesPaged(pageIndex: number, pageSize: number): Observable<EmployeeDto[]> { return this.http.get<EmployeeDto[]>(`${this.base}/employees`, { params: new HttpParams().set('pageIndex', String(pageIndex)).set('pageSize', String(pageSize)) }); }
  createEmployee(payload: EmployeeCreateDto): Observable<EmployeeDto> { return this.http.post<EmployeeDto>(`${this.base}/employees`, payload); }
  updateEmployee(id: number, payload: EmployeeUpdateDto): Observable<void> { return this.http.put<void>(`${this.base}/employees/${id}`, payload); }
  deleteEmployee(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/employees/${id}`); }

  // -------------------- Departments --------------------
  getDepartments(): Observable<DepartmentDto[]> { return this.http.get<DepartmentDto[]>(`${this.base}/departments`); }
  getDepartmentById(id: number): Observable<DepartmentDto> { return this.http.get<DepartmentDto>(`${this.base}/departments/${id}`); }
  getDepartmentByCode(code: string): Observable<DepartmentDto | null> { return this.http.get<DepartmentDto | null>(`${this.base}/departments/by-code`, { params: new HttpParams().set('code', code) }); }
  createDepartment(payload: DepartmentCreateDto): Observable<DepartmentDto> { return this.http.post<DepartmentDto>(`${this.base}/departments`, payload); }
  updateDepartment(id: number, payload: DepartmentUpdateDto): Observable<void> { return this.http.put<void>(`${this.base}/departments/${id}`, payload); }
  deleteDepartment(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/departments/${id}`); }

  // -------------------- Attendances --------------------
  clockIn(employeeId: number, dateTime?: string, notes?: string): Observable<AttendanceDto> {
    return this.http.post<AttendanceDto>(`${this.base}/attendances/clockin`, { employeeId, dateTime, notes });
  }
  clockOut(employeeId: number, dateTime?: string, notes?: string): Observable<AttendanceDto> {
    return this.http.post<AttendanceDto>(`${this.base}/attendances/clockout`, { employeeId, dateTime, notes });
  }
  createAttendance(payload: AttendanceCreateDto): Observable<AttendanceDto> { return this.http.post<AttendanceDto>(`${this.base}/attendances`, payload); }
  getAttendanceById(id: number): Observable<AttendanceDto | null> { return this.http.get<AttendanceDto | null>(`${this.base}/attendances/${id}`); }
  getAttendancesByEmployee(employeeId: number, startDate?: string, endDate?: string): Observable<AttendanceDto[]> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    return this.http.get<AttendanceDto[]>(`${this.base}/attendances/employee/${employeeId}`, { params });
  }
  getAttendancesByDate(date: string): Observable<AttendanceDto[]> { return this.http.get<AttendanceDto[]>(`${this.base}/attendances/date/${date}`); }
  getTodayAttendance(employeeId: number): Observable<AttendanceDto | null> { return this.http.get<AttendanceDto | null>(`${this.base}/attendances/today/${employeeId}`); }
  getMonthlyWorkedHours(employeeId: number, year: number, month: number): Observable<number> { return this.http.get<number>(`${this.base}/attendances/${employeeId}/monthly-hours`, { params: new HttpParams().set('year', String(year)).set('month', String(month)) }); }

  // -------------------- Import (fichiers) --------------------
  importEmployees(file: File, behavior: 'Update' | 'Skip' = 'Update'): Observable<HttpEvent<any>> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('behavior', behavior);
    return this.http.post(`${this.base}/import/employees`, fd, { reportProgress: true, observe: 'events' });
  }
  importDepartments(file: File, behavior: 'Update' | 'Skip' = 'Update'): Observable<HttpEvent<any>> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('behavior', behavior);
    return this.http.post(`${this.base}/import/departments`, fd, { reportProgress: true, observe: 'events' });
  }
}
