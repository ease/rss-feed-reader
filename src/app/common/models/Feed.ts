import { Article } from './Article';

export class Feed {
  status: number | string;
  feed: any;
  items: Article[];
}
