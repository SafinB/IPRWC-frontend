import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
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

    public promoCodes: Promocode[] = [];

    constructor(private http: HttpClient,
                private userService: UserService,
                private errorHandlingService: ErrorHandlingService) {
    }
    public getAllCodes(): Observable<any> {
        const apiKey = 'http://localhost:8080/promocode/get';

        return this.http.get<ApiResponse>(apiKey).pipe(
            map(data => {
                if (data.code === "ACCEPTED") {
                    const products: any[] = [];
                    data.payload.forEach((payloadItem: any) => {
                        products.push({
                            id: payloadItem.id,
                            code: payloadItem.code,
                            active: payloadItem.active,
                            discount: payloadItem.discount,
                        });
                    });
                    return products;
                } else {
                    throw new Error(data.message);
                }
            }));
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
