export class Article {
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

  constructor(article: Article, feed) {
    this.title = article.title;
    this.pubDate = article.pubDate;
    this.link = article.link;
    this.guid = article.guid;
    this.author = article.author;
    this.thumbnail = article.thumbnail;
    this.description = article.description;
    this.content = article.content;
    this.enclosure = {
      link: article.enclosure.link,
      thumbnail: article.enclosure.thumbnail
    };
    this.source = feed.title;
  }
}
