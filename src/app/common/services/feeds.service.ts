import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { feedsConst } from '../constants/feeds.const';
import { Feed } from '../models/Feed';
import { FeedResponse } from '../responses/FeedResponse';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  feeds: Feed[] = [];
  articles: Article[] = [];

  feedsResults = new BehaviorSubject(null);
  articleResults = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  getAllFeeds$() {
    return this.feedsResults;
  }

  getAllArticles$() {
    return this.articleResults;
  }

  addFeed(url: string): Observable<any> {
    const apiKey = feedsConst.apiKey;
    const URL =
      feedsConst.apiUrl + `${url}` + `&api_key=${apiKey}` + '&order_by=pubDate';
    return this.http.get<any>(URL).pipe(
      map((res: Feed) => {
        let isAdded =
          this.feeds.length > 0 &&
          this.feeds.find(oldFeed => oldFeed.feed.title === res.feed.title);
        if (!isAdded) {
          this.feeds.push(res);
          res = new FeedResponse(res);
          res.items.map((item: Article) => {
            this.articles.push(item);
          });
          this.articles = this.sortArticles(this.articles);
          this.feedsResults.next(this.feeds);
          this.articleResults.next(this.articles);
        } else {
          return feedsConst.clientErrors.feedExists;
        }

        // localStorage.setItem('feeds', JSON.stringify(this.feeds));
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Add feed error:', err.error.message);
        return throwError(err);
      })
    );
  }

  deleteFeed(feed: Feed): void {
    this.feeds = this.feeds.filter(f => f !== feed);
    if (this.feeds.length === 0) {
      this.articles = [];
    } else {
      this.feeds.map(feed => {
        feed.items.map(item => {
          this.articles = this.articles.filter(
            article => article.guid !== item.guid
          );
        });
      });
    }

    this.feedsResults.next(this.feeds);
    this.articleResults.next(this.articles);

    // localStorage.setItem('feeds', JSON.stringify(this.feeds));
  }

  sortArticles(articles: Article[]) {
    return articles.sort(
      (article1, article2) =>
        new Date(article2.pubDate).getTime() -
        new Date(article1.pubDate).getTime()
    );
  }
}
