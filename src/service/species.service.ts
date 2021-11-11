import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Species } from '../model/species';


@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiServerUrl}/species_all`);
  }
  public addSpecies(species : Species): Observable<Species> {
    console.log(species);
    return this.http.post<Species>(`${this.apiServerUrl}/create_species`, species);
  }
  public getSpeciesPage(id : number): Observable<Species> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<Species>(`${this.apiServerUrl}/species`, {params: params})
  }

  public updateSpecies(species : Species): Observable<Species> {
    return this.http.put<Species>(`${this.apiServerUrl}/update_species`, species);
  }

  public deleteSpecies(id : number): Observable<void> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.delete<void>(`${this.apiServerUrl}/delete_species`, {params : params});
  }
}
