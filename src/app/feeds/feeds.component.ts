import { Component, OnInit } from '@angular/core';
import { feedsConst } from './feeds.const';
import { FeedsService } from '../common/services/feeds.service';
import { FeedData } from '../common/models/FeedData';

export interface IFeedsResponse {
  status: Number;
  feed: Object;
  items: Array<any>;
}

export class FeedsResponse implements IFeedsResponse {
  status: Number;
  feed: Object;
  items: any;

  constructor(props: IFeedsResponse) {
    this.status = props.status;
    this.feed = props.feed;
    this.items = props.items.map(item => {
      item.feed = this.feed;
      return item;
    });
  }
}
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  // feed: any = [];
  posts: Array<any> = [];

  constructor(private feedsService: FeedsService) {}

  ngOnInit() {
    const url = feedsConst.feeds[0].url;
    this.feedsService.getAllFeeds$().subscribe((res: FeedData[]) => {
      if (res) {
        res.map((item, i) => {
          // this.feed.push(res[i].feed);
          res[i].items.map(post => {
            this.posts.push(post);
          });
        });
      }
      if (res && res[0] && res[0].feed && res[0].items) {
        // this.feed = res[0].feed;
        this.posts = res[0].items;
        // console.log('FEEDS:::', this.feed);
      }
      console.log('POSTS:::', this.posts);
    });
    // this.feedsService.getFeeds(url).subscribe(res => {
    //   this.feeds = new FeedsResponse(res);
    //   console.log('FEEDS:::', this.feeds);
    // });
  }
}
