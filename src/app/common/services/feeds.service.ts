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
import { FeedResponse } from '../responses/FeedResponse';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  feeds: FeedData[] = [];
  posts: any = [];
  filtered: any = [];

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
        this.feeds.push(res);
        res = new FeedResponse(res);
        res.items.map(item => {
          this.posts.push(item);
        });
        this.feedsResults.next(this.feeds);
        this.postsResults.next(this.posts);
      })
    );
  }

  deleteFeed(feed: FeedData): any {
    this.feeds = this.feeds.filter(f => f !== feed);
    if (this.feeds.length === 0) {
      this.posts = [];
    } else {
      this.feeds.map(feed => {
        feed.items.map(item => {
          this.posts = this.posts.filter(post => post.guid !== item.guid);
        });
      });
    }

    this.feedsResults.next(this.feeds);
    this.postsResults.next(this.posts);
  }
}
