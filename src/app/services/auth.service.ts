import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private bIsUserLogged = false;

  constructor() { }

  isUserLogged(): boolean {return this.bIsUserLogged; }
}
