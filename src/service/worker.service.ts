import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Worker } from '../model/worker';
import {LoginForm} from "../model/login";


@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getWorker(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.apiServerUrl}/workers`);
  }

  public getWorkerById(workerId : number): Observable<Worker> {
    let params = new HttpParams()
      .set('workerId', workerId);
    return this.http.get<Worker>(`${this.apiServerUrl}/worker`, {params: params});
  }

  public addWorker(worker : Worker): Observable<Worker> {
    console.log(worker);
    return this.http.post<Worker>(`${this.apiServerUrl}/registration`, worker);
  }

  public login(worker : LoginForm): Observable<Worker> {
    // @ts-ignore
    return this.http.post<LoginForm>(`${this.apiServerUrl}/login`, worker);
  }

  public updateWorker(worker : Worker, id : number): Observable<Worker> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.put<Worker>(`${this.apiServerUrl}/update_worker`, worker, {params: params});
  }
  public deleteWorker(workerId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteWorker/${workerId}`);
  }
}
