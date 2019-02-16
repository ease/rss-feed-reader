import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Object;
  @Input() feed: Object;

  constructor() {}

  ngOnInit() {
    // console.log('POST:::', this.post)
    // console.log('FEED:::', this.feed)
  }
}
