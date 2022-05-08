import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IcsFileMakerService {
  constructor() {}
  convertToICS(data: string, filename: string) {
    const dataBlob = new Blob([data]);
    return new File([dataBlob], filename);
  }
}
