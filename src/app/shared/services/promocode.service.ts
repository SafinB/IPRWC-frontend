import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiResponse} from "../models/ApiResponse.model";
import {environment} from "../../../environment/environment";
import {UserService} from "./user.service";
import {Promocode} from "../models/Promocode.model";
import {ErrorHandlingService} from "./errorhandling.service";

@Injectable({
  providedIn: 'root'
})
export class PromocodeService{

    public promoID!: string;


    constructor(private http: HttpClient,
                private userService: UserService,
                private errorHandlingService: ErrorHandlingService) {
    }
    public getAllCodes(): Observable<any> {
        const apiKey = 'http://localhost:8080/promocode/get';

        return this.http.get<ApiResponse>(apiKey).pipe(
            map(data => {
                if (data.code === "ACCEPTED") {
                    const promoCodes: any[] = [];
                    data.payload.forEach((payloadItem: any) => {
                        promoCodes.push({
                            id: payloadItem.id,
                            code: payloadItem.code,
                            active: payloadItem.active,
                            discount: payloadItem.discount,
                        });
                    });
                    return promoCodes;
                } else {
                    throw new Error(data.message);
                }
            }));
    }

    getPromoCodeById(id: string): Observable<Promocode> {
        const apiKey = `${environment.apiKey}promocode/get/${id}`;

        return this.http.get<ApiResponse>(apiKey, {
            headers: new HttpHeaders({ "Authorization": "Bearer " + this.userService.getJWT() })
        }).pipe(
            map(data => {
                if (data.code === "ACCEPTED") {
                    const payloadItem = data.payload;
                    return new Promocode(
                        payloadItem.id,
                        payloadItem.code,
                        payloadItem.active,
                        payloadItem.discount
                    );
                } else {
                    throw new Error(data.message);
                }
            }),
            catchError((error) => {
                this.errorHandlingService.throwError(error);
                return throwError(error);
            })
        );
    }


    public postCode(newCode: Object): Observable<void> {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
        return this.http.post<ApiResponse>(environment.apiKey + 'promocode/insert', newCode, {
            headers: header
        })
            .pipe(map(data => {
                if (data.code === 'ACCEPTED') {
                } else {
                    throw new Error(data.message)
                }
            }));
    }

    public deleteCode(id: string): Observable<void> {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
        return this.http.delete<ApiResponse>(environment.apiKey + 'promocode/delete/' + id, {
            headers: header
        })
            .pipe(map(data => {
                if (data.code === 'ACCEPTED') {
                } else {
                    throw new Error(data.message)
                }
            }));
    }
}
