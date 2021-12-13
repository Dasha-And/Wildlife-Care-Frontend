import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnimalVaccination } from '../model/animalVaccination';
import {LoginForm} from "../model/login";


@Injectable({
  providedIn: 'root'
})
export class AnimalVaccinationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getAnimalVaccinations(id : number): Observable<AnimalVaccination[]> {
    return this.http.get<AnimalVaccination[]>(`${this.apiServerUrl}/${id}/animalVaccinations`);
  }

  public getAnimalVaccinationById(animalVaccinationId : number): Observable<AnimalVaccination> {
    let params = new HttpParams()
      .set('animalVaccinationId', animalVaccinationId);
    return this.http.get<AnimalVaccination>(`${this.apiServerUrl}/animalVaccination`, {params: params});
  }

  public addAnimalVaccination(animalVaccination : AnimalVaccination): Observable<AnimalVaccination> {
    console.log(animalVaccination);
    return this.http.post<AnimalVaccination>(`${this.apiServerUrl}/create_animalVaccination`, animalVaccination);
  }

  public updateAnimalVaccination(animalVaccination : AnimalVaccination): Observable<AnimalVaccination> {
    return this.http.put<AnimalVaccination>(`${this.apiServerUrl}/update_animalVaccination`, animalVaccination);
  }
  public deleteAnimalVaccination(animalVaccinationId : number): Observable<void> {
    let params = new HttpParams()
      .set('id', animalVaccinationId);
    return this.http.delete<void>(`${this.apiServerUrl}/delete_animalVaccination`, {params: params});
  }
}
