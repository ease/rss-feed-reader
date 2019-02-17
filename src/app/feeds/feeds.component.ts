import { Component, OnInit } from '@angular/core';
import { feedsConst } from './feeds.const';
import { FeedsService } from '../common/services/feeds.service';

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
  feed: any;
  posts: any;

  constructor(private feedsService: FeedsService) {}

  ngOnInit() {
    const url = feedsConst.feeds[0].url;
    this.feedsService.getResults$().subscribe((res: any) => {
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
