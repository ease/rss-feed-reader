import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../common/models/Item';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Item;

  constructor() {}

  ngOnInit() {}
}
