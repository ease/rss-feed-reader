import { Component, OnInit } from '@angular/core';
import { FeedsService } from './feeds.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  feeds: Array<any>;

  constructor(private feedsService: FeedsService) {}

  ngOnInit() {
    this.feedsService.getFeeds().subscribe(res => {
      this.feeds = res;
      console.log('FEEDS:::', this.feeds);
    });
  }
}
