import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable} from "rxjs";
import {environment} from "../../../environment/environment";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {ApiResponse} from "../models/ApiResponse.model";
import {User} from "../models/User";
import {ToastService} from "../toast/toast-services";
import {ErrorHandlingService} from "./errorhandling.service";
import {CartService} from "./cart.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

    private LoggedIn = new BehaviorSubject<boolean>(this.userLoggedIn());


    constructor(private http: HttpClient,
                private router: Router,
                private userService: UserService,
                private toastService: ToastService,
                private errorHandlingService: ErrorHandlingService,
                private cartService: CartService) {}

  login(email: string, password: string): Observable<boolean> {
    const apiUrl = 'auth/login';
    const loginData = {
      email: email,
      password: password
    };
    return this.http.post<ApiResponse>(environment.apiKey + apiUrl, loginData).pipe(
      map((response: any) => {
        if (response.code === 'ACCEPTED') {
          this.userService.setJWT(response.message);
          this.userDetailHandler().subscribe({next: () => {
              this.LoggedIn.next(true);
              this.toastService.show('Login successful', {classname: 'bg-success text-light', delay: 2000});
              this.router.navigate(['/home']);
            }});
        } else {
          this.toastService.show(response.message, {classname: 'bg-danger text-light', delay: 2000});
            this.LoggedIn.next(false);
        }
        return true;
      }),
    );
  }

  registerHandler(name: string, email: string, password: string) {
      const registerData = {
            name: name,
            email: email,
            password: password,
      }

      return this.http.post<ApiResponse>(environment.apiKey + 'auth/register', registerData,)
          .pipe(
              map(data => {
                  if (data.code === 'ACCEPTED') {
                      return data;
                  } else {
                      throw new Error(data.message);
                  }
              }),
              catchError(error => {
                  if (error instanceof HttpErrorResponse) {
                      this.errorHandlingService.handleHttpError('HTTP error occurred:', error)
                  }
                  return this.errorHandlingService.throwError(error)
              })
          );
  };

    userDetailHandler(): Observable<void> {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
        return this.http.get<ApiResponse>(environment.apiKey + 'auth/info',
            {
                headers: header
            }).pipe(
            map(data => {
                if (data.code === 'ACCEPTED') {
                    const { id, fullName, email, password, role } = data.payload;
                    const user = new User(id, fullName, email, password, role);
                    this.userService.setUser(user);
                    this.userService.userName$.next(fullName)
                } else {
                    throw new Error(data.message)
                }
            }))
    }

    userLoggedIn(): boolean {
        return this.userService.getJWT() != undefined;
    }

    logout(): void {
        this.cartService.removeAllProducts();
        this.userService.destroyJWT();
        this.userService.destroyUser();
        this.router.navigate(['/login']);
        this.LoggedIn.next(false);
        this.toastService.show('Je hebt met succes uitgelogd',
            {classname: 'bg-info text-light', delay: 2000});
    }
}
