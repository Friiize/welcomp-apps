import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface FactureInterface {
  deuDate?: Date;
  sold?: number;
  creditCard?: string;
  clientNumber?: number;
  factureNumber?: number;
}

interface FactureServiceInterface {
  getData(image: FormData): Observable<FactureInterface>;
  test();
}

@Injectable({
  providedIn: 'root'
})
export class FactureService implements FactureServiceInterface {

  constructor(private readonly http: HttpClient) {}

  getData(image: FormData): Observable<FactureInterface> {
    return this.http.post<FactureInterface>(`${environment.api}/`, {});
  }
  test() {
    return this.http.get(`${environment.api}/`);
  }
}
