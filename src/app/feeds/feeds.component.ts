import { Component, OnInit } from '@angular/core';
import { FeedsService } from './feeds.service';
import { feedsConst } from './feeds.const';

export interface IFeedsResponse {
  status: Number;
  feed: Object;
  items: Array<any>;
}

export class FeedsResponse implements IFeedsResponse {
  status: Number;
  feed: Object;
  items: Array<any>;

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
  feed: any;
  posts: any;

  constructor(private feedsService: FeedsService) {}

  ngOnInit() {
    const url = feedsConst.feeds[0].url;
    this.feedsService.getFeeds(url).subscribe(res => {
      this.feed = res.feed;
      this.posts = res.items;
      console.log('FEEDS:::', this.feed);
      console.log('POSTS:::', this.posts);
    });
    // this.feedsService.getFeeds(url).subscribe(res => {
    //   this.feeds = new FeedsResponse(res);
    //   console.log('FEEDS:::', this.feeds);
    // });
  }
}
