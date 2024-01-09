import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {ErrorHandlingService} from "./errorhandling.service";
import {environment} from "../../../environment/environment";
import {UserService} from "./user.service";
import {ApiResponse} from "../models/ApiResponse.model";
import {ToastService} from "../toast/toast-services";


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient,
                private errorHandlingService: ErrorHandlingService,
                private userService: UserService,
                private toastService: ToastService) {
    }

    public getAll(): Observable<any[]> {
        const apiKey = 'http://localhost:8080/product/get';

        return this.http.get<ApiResponse>(apiKey).pipe(
            map(data => {
                if (data.code === "ACCEPTED") {
                    const products: any[] = [];
                    data.payload.forEach((payloadItem: any) => {
                        products.push({
                            id: payloadItem.id,
                            name: payloadItem.name,
                            description: payloadItem.description,
                            price: payloadItem.price,
                        });
                    });
                    return products;
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

    public createProduct(product: Object) {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
        return this.http.post(environment.apiKey + 'product/insert', product, {
            headers: header
        })
            .pipe(map((data: any) => {
                if (data.code === 'ACCEPTED') {
                    return data.payload;

                } else {
                    throw new Error(data.payload)
                }
            }));
    }

    public deleteProduct(id: number): Observable<void> {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
        return this.http.delete<ApiResponse>(environment.apiKey + 'product/delete/' + id, {
            headers: header
        }).pipe(
            map(data => {
                if (data.code === 'ACCEPTED') {
                    this.toastService.show('Product succesvol verwijderd!', {classname: 'bg-success text-light', delay: 2000});
                } else {
                    throw new Error(data.message)
                }
            }
        ));
    }

    public updateProduct(updatedCode: Object): Observable<void> {
        let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
        return this.http.put<ApiResponse>(environment.apiKey + 'product/update', updatedCode, {
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
