import {Injectable} from "@angular/core";
import {catchError, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiResponse} from "../models/ApiResponse.model";
import {environment} from "../../../environment/environment";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class PromocodeService{

    constructor(private http: HttpClient,
                private userService: UserService) {
    }
    public getAllCodes(): Observable<any> {
        const apiKey = 'https://159.223.241.7:8080/promocode/get';

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

    public toggleCodeStatus(id: string, active: boolean): Observable<void> {
        const header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()});
        return this.http.put<ApiResponse>(environment.apiKey + 'promocode/toggle-status/' + id, { active }, {
            headers: header
        }).pipe(
            map(data => {
                if (data.code === 'ACCEPTED') {

                } else {
                    throw new Error(data.message);
                }
            })
        );
    }

}
