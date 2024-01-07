import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {UserDTO} from "../models/userDTO.model";
import {User} from "../models/User";
import {ErrorHandlingService} from "./errorhandling.service";

@Injectable({
    providedIn: "root"
  }
)

export class UserService {
  public userName$: Subject<string> = new BehaviorSubject<string>("name");
  public users: UserDTO[] = [];

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService,
  ) {
  }

  setUser(account: User): void {
    sessionStorage.setItem('user', JSON.stringify(account));
  }

  getUser() {
    const userJson = sessionStorage.getItem('user');
    if (userJson !== null) {
      return JSON.parse(userJson);
    }
  }

  getJWT(): string | null {
    return sessionStorage.getItem('jwt');
  }

  setJWT(jwt: string): void {
    sessionStorage.setItem('jwt', jwt);
  }

  destroyJWT(): void {
    sessionStorage.removeItem('jwt');
  }

  destroyUser(): void {
    sessionStorage.removeItem('user');
  }
}
