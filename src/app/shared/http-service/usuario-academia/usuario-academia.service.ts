import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { UsuarioAcademiaAdmDto } from '../../models/usuario-academia.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioAcademiaService {
    urlBase = environment.host + '/usuario-academia';

    constructor(private http: HttpClient) { }

    cadastrarUsuarioAcademia(usuarioAcademia: UsuarioAcademiaAdmDto): Observable<any> {
        return this.http.post(`${this.urlBase}`, usuarioAcademia);
    }

    obterUsuarioAcademia(id: string): Observable<any> {
        return this.http.get(`${this.urlBase}/${id}`);
    }

    atualizaUsuarioAcademia(usuarioAcademia: UsuarioAcademiaAdmDto): Observable<any> {
        return this.http.patch(`${this.urlBase}/${usuarioAcademia.id}`, usuarioAcademia);
    }

    deletaUsuarioAcademia(id: string): Observable<any> {
        return this.http.delete(`${this.urlBase}/${id}`);
    }

    obterTodosUsuariosAcademia(): Observable<any> {
        return this.http.get(`${this.urlBase}`);
    }
}