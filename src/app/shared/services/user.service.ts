import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, Subject} from "rxjs";
import {UserDTO} from "../models/userDTO.model";
import {User} from "../models/User";
import {ErrorHandlingService} from "./errorhandling.service";
import {ApiResponse} from "../models/ApiResponse.model";
import {environment} from "../../../environment/environment";
import {ToastService} from "../toast/toast-services";

@Injectable({
    providedIn: "root"
  }
)

export class UserService {
  public userName$: Subject<string> = new BehaviorSubject<string>("name");

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService,
    private toastService: ToastService
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

  public getAll(): Observable<any> {
    const apiKey = 'http://localhost:8080/auth/get';

    return this.http.get<ApiResponse>(apiKey).pipe(
        map(data => {
          if (data.code === "ACCEPTED") {
            const users: any[] = [];
            data.payload.forEach((payloadItem: any) => {
              users.push({
                id: payloadItem.id,
                name: payloadItem.name,
                email: payloadItem.email,
                password: payloadItem.password,
                role: payloadItem.role,
              });
            });
            return users;
          } else {
            throw new Error(data.message);
          }
        }),
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            this.errorHandlingService.handleHttpError('HTTP error occurred:', error);
          }
          return this.errorHandlingService.throwError(error);
        })
    );
  }

  public deleteUser(id: string): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.getJWT()})
    return this.http.delete<ApiResponse>(environment.apiKey + 'auth/delete/' + id, {
      headers: header
    }).pipe(
        map(data => {
              if (data.code === 'ACCEPTED') {
                this.toastService.show('User has been deleted',
                    {classname: 'bg-info text-light', delay: 2000
                });
              } else {
                throw new Error(data.message)
              }
            }
        ));
  }
}
