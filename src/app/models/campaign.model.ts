import { Card } from '../cards/card-item';
import { CheckboxComponent } from '../cards/checkbox/checkbox.component';
import { NumberComponent } from '../cards/number/number.component';
import { ProgressComponent } from '../cards/progress/progress.component';
import { TextComponent } from '../cards/text/text.component';

export class Campaign {

  constructor(
    private id: string = '',
    private title: string,
    private master: string,
    private masterName: string,
    private participants: string[],
    private participantsNames: string[],
    private dashboard: Card[] = [],
    private characters = []) {}

    static fromCampaign(model: Campaign) {
      return new Campaign(
        model.id,
        model.title,
        model.master,
        model.masterName,
        model.participants,
        model.participantsNames,
        Campaign.jsonToCardArray(model.dashboard),
        Campaign.jsonToCharacters(model.characters)
      );
    }

    static jsonToCardArray(data: any) {
      let result = [];
      for (let entry of data) {
        let component = Campaign.resolveComponentName(entry.type);
        let card = new Card(component, entry.type, entry.title, entry.value);
        result.push(card);
      }
      return result;
    }

    static jsonToCharacters(data: any) {
      let result = [];
      for (let character of data)
        result[character.id] = Campaign.jsonToCardArray(character.cards);
      return result;
    }

    static cardArrayToJson(cards: Card[]) {
      let result = [];
      for (let card of cards) {
        result.push({type: card.type, title: card.title, value: card.value});
      }
      return result;
    }

    static charactersToJson(characters) {
      let result = [];
      for (let i in characters) {
        result.push({id: i, cards: Campaign.cardArrayToJson(characters[i])});
      }
      return result;
    }

    static resolveComponentName(type: string) {
      if (type === 'checkbox') {
        return CheckboxComponent;
      } else if (type === 'number') {
        return NumberComponent;
      } else if (type === 'progress') {
        return ProgressComponent;
      } else if (type === 'text') {
        return TextComponent;
      }
    }

    setId(id: string) { this.id = id; }
    getId() { return this.id; }
    getTitle() { return this.title; }
    getMaster() { return this.master; }
    getMasterName() { return this.masterName; }
    getParticipants() { return this.participants; }
    getParticipantsNames() { return this.participantsNames; }
    getDashboard() { return this.dashboard; }
    getCharacters() { return this.characters; }

}
