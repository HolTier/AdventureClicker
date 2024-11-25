import { Injectable } from '@angular/core';
import { CookieService} from 'ngx-cookie-service';
import { EncryptionService } from './encryption.service';

const SECRET_KEY = 'secret12345678910'; // As it is only a game save, we don't need store key safely

@Injectable({
  providedIn: 'root'
})
export class ClickerCookieService {

  constructor(private cookieService: CookieService, private encryptionService: EncryptionService) { }

  setCookieSave(data: string): void {
    this.cookieService.set("GameSave",
      this.encryptionService.encryptData(data, SECRET_KEY), {expires: 1, sameSite: 'Lax'})
  }

  getCookieSave(): null | string {
    const cookieSaveExist: boolean = this.cookieService.check("GameSave");
    if (cookieSaveExist) {
      return this.encryptionService.decryptData(this.cookieService.get("GameSave"), SECRET_KEY);
    }
    else return null;
  }
}
