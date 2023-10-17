import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { UsuarioDto, UsuarioFichaDto } from '../../models/usuario-dto';

@Injectable()
export class UsuarioService {
  urlbase = environment.host + '/usuario';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: UsuarioDto): Observable<any> {
    return this.http.post(`${this.urlbase}`, usuario);
  }

  obterUsuario(id: string): Observable<any> {
    return this.http.get(`${this.urlbase}/${id}`);
  }

  atualizaUsuario(usuario: UsuarioDto): Observable<any> {
    return this.http.patch(`${this.urlbase}/${usuario.id}`, usuario);
  }

  atualizarStatusPagamento(
    id: string,
    statusPagamento: string
  ): Observable<any> {
    return this.http.patch(`${this.urlbase}/${id}/status-pagamento`, {
      statusPagamento,
    });
  }

  obterTodosUsuarios(): Observable<any> {
    return this.http.get(`${this.urlbase}`);
  }

  excluirUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.urlbase}/${id}`);
  }

  salvarFichaUsuario(fichaUsuario: UsuarioFichaDto): Observable<any> {
    return this.http.post(`${this.urlbase}/ficha`, fichaUsuario);
  }
}
