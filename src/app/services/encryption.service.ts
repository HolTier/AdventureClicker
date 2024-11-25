import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  encryptData(data: any, key: string): string {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  decryptData(data: string, key: string): string {
    return CryptoJS.AES.decrypt(data, key).toString();
  }
}
