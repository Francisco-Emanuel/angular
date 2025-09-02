import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './pessoa.model'; // 👈 Importe o modelo

@Injectable({
  providedIn: 'root', // Isso torna o serviço disponível em toda a aplicação
})
export class PessoasService {
  // URL base da sua API Quarkus
  private readonly API_URL = 'http://localhost:8080/pessoas'; // 👈 Ajuste o endpoint se necessário

  // Injete o HttpClient para fazer as requisições
  private http = inject(HttpClient);

  /**
   * Busca todas as pessoas da API.
   * @returns Um Observable com a lista de pessoas.
   */
  public getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API_URL);
  }

  // Você pode adicionar outros métodos aqui (ex: getPessoaPorId, criarPessoa, etc.)
}
