import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasService } from './pessoas.service'; // 👈 Importe o serviço
import { Pessoa } from './pessoa.model';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule], // 👈 Adicione CommonModule para as diretivas
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css',
})
export class Pessoas implements OnInit {
  private pessoasService = inject(PessoasService);

  // Cria um signal para armazenar a lista de pessoas.
  // Começa com um array vazio.
  public pessoas = signal<Pessoa[]>([]);

  // ngOnInit é um "gancho" que roda quando o componente é inicializado.
  // É o lugar ideal para buscar dados iniciais.
  ngOnInit(): void {
    this.buscarPessoas();
  }

  private buscarPessoas(): void {
    // Chama o método do serviço. O .subscribe() "ativa" a chamada HTTP.
    this.pessoasService.getPessoas().subscribe({
      next: (listaDePessoas) => {
        // Quando os dados chegarem, atualiza o signal
        this.pessoas.set(listaDePessoas);
        console.log('Pessoas carregadas com sucesso!', listaDePessoas);
      },
      error: (err) => {
        // Em caso de erro, exibe no console
        console.error('Erro ao buscar pessoas:', err);
      },
    });
  }
}
