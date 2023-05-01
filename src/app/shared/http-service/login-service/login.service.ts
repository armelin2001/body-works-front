import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../../models/login-dto';
import { environment } from 'src/enviroments/environment';

@Injectable()
export class LoginService {
  urlbase = environment.host + '/usuario';

  constructor(private http: HttpClient) {}

  realizaLogin(loginDto: LoginDto): Observable<any> {
    return this.http.post(`${this.urlbase}/login`, loginDto);
  }
}
