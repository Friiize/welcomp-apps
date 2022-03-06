import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64ConvertorService {

  constructor() { }
  convertToFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const baseStr = atob(arr[1]);
    let n = baseStr.length;
    const u8arr = new Uint8Array(n);
    while(n--) {
      u8arr[n] = baseStr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }
}
