import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  baseUrl: string;
  constructor(private http: HttpClient) { this.baseUrl = environment.API_URL; }

  postMessage(msg: string) {
    console.log(msg)

  }

    public saveStudent(data: any): Observable<any> {
    let url = this.baseUrl + '/finance/data/save-incentives';
    url = url.replace(/[?&]$/, '');
    return this.http.post<any>(url, data);
  }


}
