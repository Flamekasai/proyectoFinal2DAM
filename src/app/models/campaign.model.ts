export class Campaign {

  constructor(
    private id: string = '',
    private title: string,
    private master: string,
    private participants: string[]) {}

    setId(id: string) { this.id = id; }
    getId() { return this.id; }
    getTitle() { return this.title; }
    getMaster() { return this.master; }
    getParticipants() { return this.participants; }

    // TODO: Add dashboard

}
