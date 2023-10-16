import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.API_URL;
  }

  public saveStudent(data: any): Observable<any> {
    let url = this.baseUrl + 'api/addStudent';
    url = url.replace(/[?&]$/, '');
    return this.http.post<any>(url, data);
  }

  public saveCourse(data: any): Observable<any> {
    let url = this.baseUrl + 'api/addCourse';
    url = url.replace(/[?&]$/, '');
    return this.http.post<any>(url, data);
  }

  getAvailabeCourses(): Observable<any> {
    let url = this.baseUrl + 'api/getAllCourses';
    return this.http.get<any>(url);
  }

  loadAllData(): Observable<any> {
    let url = this.baseUrl + 'api/getAllData';
    return this.http.get<any>(url);
  }

  public deleteStudent(data: any): Observable<any> {
    let url = this.baseUrl + 'api/updateData';
    url = url.replace(/[?&]$/, '');
    return this.http.put<any>(url, data);
  }
}
