export class Campaign {

  constructor(
    private id: string = '',
    private title: string,
    private master: string,
    private masterName: string,
    private participants: string[],
    private participantsNames: string[]) {}

    static fromCampaign(model: Campaign) {
      return new Campaign(
        model.id,
        model.title,
        model.master,
        model.masterName,
        model.participants,
        model.participantsNames
      );
    }

    setId(id: string) { this.id = id; }
    getId() { return this.id; }
    getTitle() { return this.title; }
    getMaster() { return this.master; }
    getMasterName() { return this.masterName; }
    getParticipants() { return this.participants; }
    getParticipantsNames() { return this.participantsNames; }

    // TODO: Add dashboard

}
