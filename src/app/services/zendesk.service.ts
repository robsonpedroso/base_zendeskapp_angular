import { Injectable } from '@angular/core';

declare const ZAFClient: any;

@Injectable({
  providedIn: 'root',
})
export class ZendeskService {
  private client = ZAFClient.init();

  async getTicketAndCurrentUser() {
    // contexto (onde o app está rodando, id do ticket, etc.)
    const context = await this.client.context();

    // dados do ticket e do usuário atual
    const [ticketResp, userResp] = await Promise.all([
      this.client.get([
        'ticket.id',
        'ticket.subject',
        'ticket.requester',
        'ticket.assignee',
        'ticket.status',
      ]),
      this.client.get('currentUser'),
    ]);

    return {
      context,
      ticket: ticketResp.ticket,
      currentUser: userResp.currentUser,
    };
  }
}
