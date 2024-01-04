export class UserModel {
  public id?: string;
  public fullName: string;
  public email?: string;
  public password?: string;
  public role?: boolean;


  constructor(id: string, fullName: string, email: string, password: string, role: boolean) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
