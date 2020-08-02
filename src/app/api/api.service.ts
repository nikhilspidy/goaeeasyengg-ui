import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpParams,HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  productEndpoint = 'http://127.0.0.1/api/product.php';
  categoryEndpoint = 'http://127.0.0.1/api/category.php';
  
  constructor(private http: HttpClient) { 
 
  }

  getProductsUsingCid(cid:string): Observable<any> {
    let params = new HttpParams().set("cid",cid)
    return this.http.get(this.productEndpoint,{params: params}).pipe(
      map(data=>data),
      catchError(this.handleError)
    );
  }

  addProduct(pname:string,cid:string,pdescription:string,photo:File): Observable<any> {
    const formData = new FormData();
    formData.append('pname',pname);
    formData.append('cid',cid);
    formData.append('pdescription',pdescription);
    formData.append('photo',photo);

    //let params = new HttpParams().set("cid",cid)
    return this.http.post(this.productEndpoint,formData).pipe(
      map(data=>data),
      catchError(this.handleError)
    );
  }


  addCategory(cname:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    var request:any = {"cname":cname}
    //let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(request);
    console.log("!!!!!!!")
    console.log(body)
    //let params = new HttpParams().set("cid",cid)
    return this.http.post(this.categoryEndpoint,body).pipe(
      map(data=>data),
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<any> {
    return this.http.get(this.categoryEndpoint).pipe(
      map(data=>data),
      catchError(this.handleError)
    );
  }


  

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
