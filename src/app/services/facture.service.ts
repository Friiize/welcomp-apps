import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  getData(image: File): Observable<FactureInterface>;
}

@Injectable({
  providedIn: 'root'
})
export class FactureService implements FactureServiceInterface {

  constructor(private readonly http: HttpClient) {}

  getData(image: File): Observable<FactureInterface> {
    return this.http.get<FactureInterface>(`${environment.api}/nailedthis/${image}`);
  }
}
