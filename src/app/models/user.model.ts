export class User {
  id: string;
  name: string;
  email: string;
  role: string;

  constructor(id: string, name: string, email: string, role: string, role1: any) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
