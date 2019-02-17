import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, retry, tap } from 'rxjs/operators';
import { feedsConst } from '../../feeds/feeds.const';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  results = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}

  getFeeds(url): Observable<any> {
    const URL = feedsConst.apiUrl + `${url}`;
    return this.http.get<any>(URL).pipe(
      map((res: any) => {
        this.results.next(res);
        return res;
      })
    );
  }

  getResults$() {
    return this.results.asObservable();
  }
}
