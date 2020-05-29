export class Campaing {
  constructor(private title: string, private master: string, private participants: string[]){}

  getTitle() { return this.title; }
  getMaster() { return this.master; }
  getParticipants() { return this.participants; }

  // TODO: Add dashboard

}
