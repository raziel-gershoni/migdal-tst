import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area, Garage } from './models';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  headers = new HttpHeaders().append(`Content-Type`, `application/json; charset=UTF-8`);

  constructor(private http: HttpClient) { }

  getGarages(area: string, city: string): Observable<Garage> {
    return this.http.post(`https://customersservices.migdal.co.il/api/experts/getgarages`, {Area: area, City: city}, {headers: this.headers});
  }

  getAreas(): Observable<Area> {
    return this.http.post<Area>(`https://front.migdal.co.il//experts/api/garageareas`, {}, {headers: this.headers});
  }
}
