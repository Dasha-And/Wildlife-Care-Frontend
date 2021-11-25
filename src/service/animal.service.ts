import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../model/animal';
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getAnimals(id: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiServerUrl}/${id}/animals`);
  }
  public addAnimal(animal : Animal): Observable<Animal> {
    console.log(animal);
    return this.http.post<Animal>(`${this.apiServerUrl}/create_animal`, animal);
  }
  public getAnimalPage(id : number): Observable<Animal> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<Animal>(`${this.apiServerUrl}/animal`, {params: params})
  }

  public updateAnimal(animal : Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiServerUrl}/update_animal`, animal);
  }

  public deleteAnimal(id : number): Observable<void> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.delete<void>(`${this.apiServerUrl}/delete_animal`, {params : params});
  }

  public getIconUrl(id : number){
    let params = new HttpParams()
      .set('id', id);
    return this.http.get(`${this.apiServerUrl}/get_icon_url`, {params: params, responseType: "text"});
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', httpError.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
