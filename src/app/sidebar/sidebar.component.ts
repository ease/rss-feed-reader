import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../common/services/feeds.service';
import { Feed } from '../common/models/Feed';
import { HttpErrorResponse } from '@angular/common/http';
import { feedsConst } from '../common/constants/feeds.const';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  activeFeeds: Feed[] = [];
  submitted = false;
  active = false;

  showWarning = false;
  warningMessage: string;
  searchText: any;

  constructor(private feedsService: FeedsService) {}

  ngOnInit() {
    if (localStorage.getItem('feeds')) {
      this.activeFeeds = JSON.parse(localStorage.getItem('feeds'));
      this.activeFeeds.map((feed: Feed) => {
        this.add(undefined, feed.feed.url);
      });
    }
    this.feedsService.getAllFeeds$().subscribe((feeds: Feed[]) => {
      if (feeds) {
        this.activeFeeds = feeds;
      }
    });
  }

  add(feedName: string, feedUrl: string) {
    feedUrl = feedUrl.trim();
    if (!feedUrl) {
      return;
    }
    this.feedsService.addFeed(feedUrl).subscribe(
      res => {
        if (res && res.code === 1000) {
          this.showWarning = true;
          this.warningMessage = res.message && res.message;
          setTimeout(() => {
            this.showWarning = false;
          }, 5000);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === feedsConst.errorCodes.server.internalServer) {
          this.showWarning = true;
          this.warningMessage = error.error.message;
          setTimeout(() => {
            this.showWarning = false;
          }, 5000);
        }
      }
    );
  }

  delete(feed: Feed) {
    this.activeFeeds = this.activeFeeds.filter(f => f !== feed);
    this.feedsService.deleteFeed(feed);
  }
}
