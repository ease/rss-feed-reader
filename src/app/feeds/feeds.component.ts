import { Component, OnInit } from '@angular/core';
import { feedsConst } from './feeds.const';
import { FeedsService } from '../common/services/feeds.service';
import { FeedData } from '../common/models/FeedData';
import { Item } from '../common/models/Item';
import { FeedResponse } from '../common/responses/FeedResponse';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  posts: Item[] = [];
  feeds: FeedData[] = [];

  constructor(private feedsService: FeedsService) {}

  ngOnInit() {
    this.feedsService.getAllFeeds$().subscribe((feeds: FeedData[]) => {
      if (feeds) {
        feeds.map(feed => {
          debugger;
          feed = new FeedResponse(feed);
          if (!this.feeds.includes(feed)) {
            this.feeds.push(feed);
          }
          console.log('this.feeds:::', this.feeds);

          feed.items.map(item => {
            this.posts.push(item);
          });
          console.log('this.posts:::', this.posts);
        });
      }
    });
  }
}
