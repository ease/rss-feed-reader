import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  constructor(private http: HttpClient) {}

  getFeeds(): Observable<any> {
    const URL = 'https://jsonplaceholder.typicode.com/posts';
    // const headers: HttpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });

    return this.http.get<any>(URL).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
