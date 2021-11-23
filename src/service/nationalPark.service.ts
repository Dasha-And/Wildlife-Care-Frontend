import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NationalPark } from '../model/nationalPark';


@Injectable({
  providedIn: 'root'
})
export class NationalParkService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getNationalPark(): Observable<NationalPark[]> {
    return this.http.get<NationalPark[]>(`${this.apiServerUrl}/nationalParks`);
  }
  public addNationalPark(nationalPark : NationalPark): Observable<NationalPark> {
    console.log(nationalPark);
    return this.http.post<NationalPark>(`${this.apiServerUrl}/create_nationalPark`, nationalPark);
  }
  public getNationalParkPage(id : number): Observable<NationalPark> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<NationalPark>(`${this.apiServerUrl}/nationalPark`, {params: params})
  }

  public updateNationalPark(nationalPark : NationalPark): Observable<NationalPark> {
    return this.http.put<NationalPark>(`${this.apiServerUrl}/update_nationalPark`, nationalPark);
  }

  public deleteNationalPark(id : number): Observable<void> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.delete<void>(`${this.apiServerUrl}/delete_nationalPark`, {params : params});
  }
}
