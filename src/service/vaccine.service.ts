import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vaccine } from '../model/vaccine';


@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getVaccine(): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(`${this.apiServerUrl}/vaccines`);
  }
  public addVaccine(vaccine : Vaccine): Observable<Vaccine> {
    console.log(vaccine);
    return this.http.post<Vaccine>(`${this.apiServerUrl}/create_vaccine`, vaccine);
  }
  public getVaccinePage(id : number): Observable<Vaccine> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<Vaccine>(`${this.apiServerUrl}/vaccine`, {params: params})
  }

  public updateVaccine(vaccine : Vaccine): Observable<Vaccine> {
    return this.http.put<Vaccine>(`${this.apiServerUrl}/update_vaccine`, vaccine);
  }

  public deleteVaccine(id : number): Observable<void> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.delete<void>(`${this.apiServerUrl}/delete_vaccine`, {params : params});
  }
}
