import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { feedsConst } from '../../feeds/feeds.const';
import { FeedData } from '../models/FeedData';
import { FeedResponse } from '../responses/FeedResponse';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  feeds: FeedData[] = [];
  posts: Item[] = [];

  feedsResults = new BehaviorSubject(null);
  postsResults = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  getAllFeeds$() {
    return this.feedsResults;
  }

  getAllPosts$() {
    return this.postsResults;
  }

  addFeed(url: string): Observable<any> {
    const URL = feedsConst.apiUrl + `${url}`;
    return this.http.get<any>(URL).pipe(
      map((res: FeedData) => {
        let isAdded =
          this.feeds.length > 0 &&
          this.feeds.every(oldFeed => oldFeed.feed.title === res.feed.title);
        debugger;
        if (!isAdded) {
          this.feeds.push(res);
          res = new FeedResponse(res);
          res.items.map((item: Item) => {
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

  deleteFeed(feed: FeedData): void {
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
