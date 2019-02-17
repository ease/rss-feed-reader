import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry, tap } from 'rxjs/operators';
import { feedsConst } from '../../feeds/feeds.const';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  constructor(private http: HttpClient) {}

  getFeeds(url): Observable<any> {
    const URL = feedsConst.apiUrl+`${url}`;
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
