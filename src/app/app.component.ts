import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZendeskService } from './services/zendesk.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" *ngIf="loaded; else loading">
      <h2>Informações do Ticket</h2>
      <div *ngIf="ticket; else noTicket">
        <p><strong>ID:</strong> {{ ticket?.id }}</p>
        <p><strong>Assunto:</strong> {{ ticket?.subject }}</p>
        <p><strong>Status:</strong> {{ ticket?.status }}</p>
        <p><strong>Requester:</strong> {{ ticket?.requester?.name }}</p>
        <p><strong>Assignee:</strong> {{ ticket?.assignee?.name }}</p>
      </div>
      <ng-template #noTicket>
        <p>Nenhum ticket encontrado no contexto.</p>
      </ng-template>

      <h2>Usuário Logado</h2>
      <div *ngIf="currentUser">
        <p><strong>Nome:</strong> {{ currentUser.name }}</p>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <p><strong>Role:</strong> {{ currentUser.role }}</p>
      </div>
    </div>

    <ng-template #loading>
      <p>Carregando dados do Zendesk...</p>
    </ng-template>
  `,
  styles: [
    `
      .container {
        font-family: system-ui, sans-serif;
        padding: 12px;
        font-size: 13px;
      }
      h2 {
        margin: 8px 0;
        font-size: 14px;
      }
      p {
        margin: 2px 0;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  ticket: any;
  currentUser: any;
  loaded = false;
  zendeskService = inject(ZendeskService);

  async ngOnInit() {
    try {
      console.log('ngOnInit');
      const { ticket, currentUser } =
        await this.zendeskService.getTicketAndCurrentUser();
      this.ticket = ticket;
      this.currentUser = currentUser;
    } catch (e) {
      console.error('Erro ao carregar dados do Zendesk', e);
    } finally {
      this.loaded = true;
    }
  }
}
