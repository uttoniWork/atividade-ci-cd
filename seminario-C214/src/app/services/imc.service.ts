import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Imc } from '../models/imc';

@Injectable({
  providedIn: 'root'
})
export class ImcService {

  url = 'http://10.2.0.99:15015/imc'; 
  
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // salva um Imcro
  saveImc(imc: Imc): Observable<Imc> {

    let reqJson: any = {};
    reqJson["height"] = imc.altura;
    reqJson["weight"] = imc.peso;
    reqJson["imc"] = imc.imc;

    return this.httpClient.post<Imc>(this.url, reqJson)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
