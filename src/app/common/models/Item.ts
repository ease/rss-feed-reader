export class Item {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: {
    link: string;
    thumbnail: string;
  };
  categories: Array<any>;
  source: string;

  constructor(item: Item, feed) {
    this.title = item.title;
    this.pubDate = item.pubDate;
    this.link = item.link;
    this.guid = item.guid;
    this.author = item.author;
    this.thumbnail = item.thumbnail;
    this.description = item.description;
    this.content = item.content;
    this.enclosure = {
      link: item.enclosure.link,
      thumbnail: item.enclosure.thumbnail
    };
    this.source = feed.title;
  }
}
