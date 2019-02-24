import { Article } from '../models/Article';

export interface IFeedResponse {
  status: number | string;
  feed: any;
  items: Array<any>;
}

export class FeedResponse implements IFeedResponse {
  status: number | string;
  feed: any;
  items: any;

  constructor(props: IFeedResponse) {
    this.status = props.status;
    this.feed = props.feed;
    this.items = props.items.map(item => {
      return new Article(item, props.feed);
    });
  }
}
