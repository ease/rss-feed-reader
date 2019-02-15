import { Component, OnInit } from '@angular/core';
import { FeedsService } from './feeds.service';
import { feedsConst } from './feeds.const';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  feeds: Array<any>;

  constructor(private feedsService: FeedsService) {}

  ngOnInit() {
    const url = feedsConst.feeds[0].url;
    this.feedsService.getFeeds(url).subscribe(res => {
      this.feeds = res.items;
      console.log('FEEDS:::', this.feeds);
    });
  }
}
