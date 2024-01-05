export class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public role?: boolean;


  constructor(id: string, name: string, email: string, password: string, role: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
