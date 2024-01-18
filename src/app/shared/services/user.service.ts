import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, Subject} from "rxjs";
import {User} from "../models/User";
import {ErrorHandlingService} from "./errorhandling.service";
import {ApiResponse} from "../models/ApiResponse.model";
import {environment} from "../../../environment/environment";
import {ToastService} from "../toast/toast-services";
import CryptoJS from 'crypto-js';


@Injectable({
    providedIn: "root"
  }
)

export class UserService {
  public userName$: Subject<string> = new BehaviorSubject<string>("name");
  private secretKey: string = 'secretKey';

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService,
    private toastService: ToastService
  ) {
  }

  setUser(account: User): void {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(account), this.secretKey).toString();
    sessionStorage.setItem('user', encryptedData);
  }

  getUser(): User | null {
    const userJson = sessionStorage.getItem('user');
    if (userJson !== null && userJson.trim() !== '') {
      try {
        const decryptedData = CryptoJS.AES.decrypt(userJson, this.secretKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
      } catch (error) {
        return null;
      }
    }
    return null;
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
    const apiKey = 'https://159.223.241.7:8443/auth/get';

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
