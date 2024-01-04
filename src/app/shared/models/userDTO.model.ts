export class UserDTO {

  public id: string;
  public fullName: string;
  public role: boolean;

  constructor(id: string, fullName: string, role: boolean) {
    this.id = id;
    this.fullName = fullName;
    this.role = role;
  }
}
