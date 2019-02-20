import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
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
    return this.feedsResults;
  }

  getAllPosts$() {
    return this.postsResults;
  }

  addFeed(url): Observable<any> {
    const URL = feedsConst.apiUrl + `${url}`;
    return this.http.get<any>(URL).pipe(
      map((res: any) => {
        let isAdded =
          this.feeds.length > 0 &&
          this.feeds.every(oldFeed => oldFeed.feed.title === res.feed.title);
        debugger;
        if (!isAdded) {
          this.feeds.push(res);
          res = new FeedResponse(res);
          res.items.map(item => {
            this.posts.push(item);
          });
          this.feedsResults.next(this.feeds);
          this.postsResults.next(this.posts);
        } else {
          console.log('Feed already exists');
        }

        // localStorage.setItem('feeds', JSON.stringify(this.feeds));
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Add feed error:', err.error.message);
        return throwError(err);
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

    // localStorage.setItem('feeds', JSON.stringify(this.feeds));
  }
}
