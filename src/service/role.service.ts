import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../model/role';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getRole(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerUrl}/role_all`);
  }
  public addRole(role : Role): Observable<Role> {
    console.log(role);
    return this.http.post<Role>(`${this.apiServerUrl}/create_role`, role);
  }
  public getRolePage(id : number): Observable<Role> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<Role>(`${this.apiServerUrl}/role`, {params: params})
  }

  public updateRole(role : Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiServerUrl}/update_role`, role);
  }

  public deleteRole(id : number): Observable<void> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.delete<void>(`${this.apiServerUrl}/delete_role`, {params : params});
  }
}
