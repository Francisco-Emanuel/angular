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

  /*
   * ???
   */
  public getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API_URL);
  }
}
