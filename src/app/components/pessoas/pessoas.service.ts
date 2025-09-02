import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private readonly API_URL = 'http://localhost:8080/pessoas';

  private http = inject(HttpClient);

  /**
   * (GET) Busca todas as pessoas da API.
   */
  public getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API_URL);
  }

  /**
   * (POST) Cria uma nova pessoa.
   * O 'Omit<Pessoa, 'id'>' significa que enviaremos um objeto Pessoa sem o 'id',
   * já que o ID geralmente é gerado pelo servidor.
   */
  public criarPessoa(pessoa: Omit<Pessoa, 'id'>): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.API_URL, pessoa);
  }

  /**
   * (PUT) Atualiza uma pessoa existente.
   */
  public atualizarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    // A URL para atualizar geralmente inclui o ID do recurso: /pessoas/{id}
    return this.http.put<Pessoa>(`${this.API_URL}/${pessoa.id}`, pessoa);
  }

  /**
   * (DELETE) Exclui uma pessoa pelo seu ID.
   * Espera uma resposta vazia (status 204 No Content), por isso o 'Observable<void>'.
   */
  public excluirPessoa(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
