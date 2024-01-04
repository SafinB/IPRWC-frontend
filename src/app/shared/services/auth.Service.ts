import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, Subscription} from "rxjs";
import {environment} from "../../../environment/environment";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {ApiResponse} from "../models/ApiResponse.model";
import {User} from "../../models/user.model";
import {ToastService} from "../toast/toast-services";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private loggedIn: boolean = false;
  private infoSub: Subscription = new Subscription();

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private toastService: ToastService,
              ) {}

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
              this.loggedIn = true;
              this.toastService.show('Login successful', {classname: 'bg-success text-light', delay: 5000});
              this.router.navigate(['/home']);
            }});
        } else {
          this.toastService.show(response.message, {classname: 'bg-danger text-light', delay: 5000});
          this.loggedIn = false;
        }
        return true;
      }),
    );
  }

  registerHandler(user: User): Observable<void> {
    return this.http.post<ApiResponse>(environment.apiKey + 'auth/register', user)
      .pipe(map(data => {
        if (data.code === 'ACCEPTED') {
          this.userService.setJWT(data.message);
          this.infoSub = this.infoHandler().subscribe({
            next: () => {
              this.infoSub.unsubscribe();
            },
          })
        } else {
          throw new Error(data['message'])
        }
      }));
  }

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

  infoHandler(): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.get<ApiResponse>(environment.apiKey + 'auth/info',
      {
        headers: header
      }).pipe(
      map(data => {
        if (data.code === 'ACCEPTED') {
          const user = new User(
            data.payload.id,
            data.payload.fullName,
            data.payload.email,
            data.payload.password,
            data.payload.role,
          );
          this.userService.setUser(user);
        } else {
          throw new Error(data.message)
        }
      }))
  }

    logout(): void {
        this.userService.destroyJWT();
        this.userService.destroyUser();
        this.router.navigate(['/login']);
        this.loggedIn = false;
        this.toastService.show('You have succesfully logged out', {classname: 'bg-info text-light', delay: 2000});
    }
}
