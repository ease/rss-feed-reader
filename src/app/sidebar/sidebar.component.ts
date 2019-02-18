import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../common/services/feeds.service';
import { FeedData } from '../common/models/FeedData';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  activeFeeds: FeedData[] = [];
  submitted = false;

  constructor(private feedsService: FeedsService) {}

  ngOnInit() {}

  add(feedName: string, feedUrl: string) {
    feedUrl = feedUrl.trim();
    if (!feedUrl) {
      return;
    }
    this.feedsService.addFeed(feedUrl).subscribe((feed: FeedData) => {
      // this.activeFeeds.push(feed);
      this.activeFeeds.push(feed);
    });
  }

  delete(feed: FeedData) {
    this.activeFeeds = this.activeFeeds.filter(f => f !== feed);
    this.feedsService.deleteFeed(feed);
  }
}
