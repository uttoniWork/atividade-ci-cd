import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Imc } from '../models/imc';

@Injectable({
  providedIn: 'root'
})
export class ImcService {

  url = 'http://localhost:15003/imc'; // api rest fake
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Origin': 'http://localhost:4200' })
  }


  // Obtem todos os Imcros
  // getImcs(): Observable<Imc[]> {
  //   return this.httpClient.get<Imc[]>(this.url)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError))
  // }

  // // Obtem um Imcro pelo id
  // getImcById(id: number): Observable<Imc> {
  //   return this.httpClient.get<Imc>(this.url + '/' + id)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  // salva um Imcro
  saveImc(imc: Imc): Observable<Imc> {
    return this.httpClient.post<Imc>(this.url, JSON.stringify(imc), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Imcro
  // updateImc(Imc: Imc): Observable<Imc> {
  //   return this.httpClient.put<Imc>(this.url + '/' + Imc.id, JSON.stringify(Imc), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

  // // deleta um Imcro
  // deleteImc(Imc: Imc) {
  //   return this.httpClient.delete<Imc>(this.url + '/' + Imc.id, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

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
