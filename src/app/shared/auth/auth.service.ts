import { Injectable } from '@angular/core';
import { LocalstorageService } from '../local-storage/localstorage.service';

@Injectable()
export class AuthServiceGuard {
  constructor(private localStorage: LocalstorageService) {
    this.localStorage = localStorage;
  }

  usuarioEstaAutenticado(): boolean {
    const token = this.localStorage.obter('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
