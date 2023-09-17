import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { LoginDto } from '../../models/login-dto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  urlbase = environment.host + '/auth';

  constructor(private http: HttpClient) {}

  obterToken(loginDto: LoginDto): Observable<any> {
    return this.http.post(`${this.urlbase}/login`, loginDto);
  }
}
