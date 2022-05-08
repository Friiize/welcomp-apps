import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Photo} from '@capacitor/camera';
import {Base64ConvertorService} from './base64-convertor.service';

export interface FactureInterface {
  dueDate?: string[];
  sold?: string[];
  iban?: string[];
  // eslint-disable-next-line id-blacklist
  numbers?: { number: string }[];
}

interface FactureServiceInterface {
  postprocessData(image: FormData): Observable<FactureInterface>;

  convertImage(image: Photo);

  convertFile(file): Promise<File>;

  archiveFacture(formData: FormData): Observable<any>;

  listUnarchived(): Observable<FactureInterface>;
}

@Injectable({
  providedIn: 'root'
})
export class FactureService implements FactureServiceInterface {
  private data;

  constructor(private readonly http: HttpClient, private readonly base64Convertor: Base64ConvertorService) {
  }

  postprocessData(image: FormData): Observable<FactureInterface> {
    this.data = this.http.post<FactureInterface>(`${environment.api}/`, image);
    return this.data;
  }

  async convertImage(image: Photo): Promise<File> {
    return this.base64Convertor.convertToFile((image.dataUrl), 'factureImage');
  }

  archiveFacture(formData: FormData): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.api}/reminder/`, formData, {responseType: 'text'});
  }

  async convertFile(file): Promise<File> {
    return this.base64Convertor.convertToFile(file, 'reminder');
  }

  listUnarchived(): Observable<FactureInterface> {
    return this.http.get<FactureInterface>(`${environment.api}/unarchived/`);
  }
}

