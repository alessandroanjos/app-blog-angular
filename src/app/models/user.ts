export class User {

  constructor(
    public id:string,
    public name:string,
    public email: string,
    public isActive: boolean,
    public password: string,
  ) {
  }
}
