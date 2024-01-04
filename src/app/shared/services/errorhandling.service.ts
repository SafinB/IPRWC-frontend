import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  handleHttpError(httpErrorOccurred: string, error: HttpErrorResponse): void {
    console.error('HTTP error occurred:', error);
  }

  throwError(error: any) {
    return throwError(error);
  }
}
