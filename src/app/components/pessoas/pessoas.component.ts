import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './pessoa.model';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css',
})
export class Pessoas implements OnInit {
  /*
   * Injetando o serviço
   */
  private pessoasService = inject(PessoasService);

  /*
   * A lista de pessoas, não entendi muito bem
   */
  public pessoas = signal<Pessoa[]>([]);

  /*
   * Função para rodar o buscarPessoas() logo que a aplicação inicia
   */
  ngOnInit(): void {
    this.buscarPessoas();
  }

  private buscarPessoas(): void {
    this.pessoasService.getPessoas().subscribe({
      next: (listaDePessoas) => {
        this.pessoas.set(listaDePessoas);
        console.log('Pessoas carregadas com sucesso!', listaDePessoas);
      },
      error: (err) => {
        console.error('Erro ao buscar pessoas:', err);
      },
    });
  }
}
