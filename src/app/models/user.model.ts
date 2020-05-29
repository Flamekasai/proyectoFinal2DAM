export class User {

  constructor(private id: string, private email: string, private name: string) {}

  setId(id: string) { this.id = id; }
  getId() { return this.id; }
  getEmail() { return this.email; }
  getName() { return this.name; }

}
