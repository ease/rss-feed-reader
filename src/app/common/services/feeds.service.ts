import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, retry, tap } from 'rxjs/operators';
import { feedsConst } from '../../feeds/feeds.const';
import { FeedData } from '../models/FeedData';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  feeds: FeedData[] = [];

  feedsResults = new BehaviorSubject(null);
  postsResults = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  getAllFeeds$() {
    return this.feedsResults.asObservable();
  }

  getAllPosts$() {
    return this.postsResults.asObservable();
  }

  addFeed(url): Observable<any> {
    const URL = feedsConst.apiUrl + `${url}`;
    return this.http.get<any>(URL).pipe(
      map((res: any) => {
        debugger;
        this.feeds.push(res);
        this.feedsResults.next(this.feeds);
        return res;
      })
    );
  }

  deleteFeed(feed: FeedData): any {
    this.feeds = this.feeds.filter(f => f !== feed);
    this.feedsResults.next(this.feeds);
  }
}
