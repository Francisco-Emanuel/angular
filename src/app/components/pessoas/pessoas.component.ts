import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasService } from './pessoas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from './pessoa.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css',
})
export class Pessoas implements OnInit {
  private pessoasService = inject(PessoasService);
  private fb = inject(FormBuilder);

  public pessoas = signal<Pessoa[]>([]);
  public pessoaForm: FormGroup;
  public editandoId = signal<string | null>(null);

  constructor() {

    this.pessoaForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.buscarPessoas();
  }


  private buscarPessoas(): void {
    this.pessoasService.getPessoas().subscribe({
      next: (listaDePessoas) => this.pessoas.set(listaDePessoas),
      error: (err) => console.error('Erro ao buscar pessoas:', err),
    });
  }

  public salvarPessoa(): void {
    if (this.pessoaForm.invalid) {
      return;
    }

    const pessoaParaSalvar = this.pessoaForm.value;

    if (this.editandoId()) {
      const id = this.editandoId()!;
      this.pessoasService
        .atualizarPessoa({ id, ...pessoaParaSalvar })
        .pipe(
          tap((pessoaAtualizada) => {
            this.pessoas.update((lista) => lista.map((p) => (p.id === id ? pessoaAtualizada : p)));
            this.cancelarEdicao();
          })
        )
        .subscribe({
          error: (err) => console.error('Erro ao atualizar pessoa:', err),
        });
    } else {
      this.pessoasService
        .criarPessoa(pessoaParaSalvar)
        .pipe(
          tap((novaPessoa) => {
            this.pessoas.update((lista) => [...lista, novaPessoa]);
            this.pessoaForm.reset();
          })
        )
        .subscribe({
          error: (err) => console.error('Erro ao criar pessoa:', err),
        });
    }
  }

  public deletarPessoa(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoasService
        .excluirPessoa(id)
        .pipe(
          tap(() => {
            this.pessoas.update((lista) => lista.filter((p) => p.id !== id));
          })
        )
        .subscribe({
          error: (err) => console.error('Erro ao excluir pessoa:', err),
        });
    }
  }

  public iniciarEdicao(pessoa: Pessoa): void {
    this.editandoId.set(pessoa.id);
    this.pessoaForm.setValue({
      name: pessoa.name,
      email: pessoa.email,
    });
  }

  public cancelarEdicao(): void {
    this.editandoId.set(null);
    this.pessoaForm.reset();
  }
}
