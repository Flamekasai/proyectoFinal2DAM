export class User {
  constructor(private _id: string, private _email: string, private _name: string) {}

  getId() { return this._id; }
  getEmail() { return this._email; }
  getName() { return this._name; }

}
