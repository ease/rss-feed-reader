export const feedsConst = {
  feeds: [
    {
      name: 'adweek',
      url: 'https://www.adweek.com/feed/'
    },
    {
      name: 'bbctech',
      url: 'http://feeds.bbci.co.uk/news/technology/rss.xml'
    },
    {
      name: 'techcrunch',
      url: 'https://techcrunch.com/feed/'
    },
    {
      name: 'theguardiantech',
      url: 'https://www.theguardian.com/technology/internet/rss'
    }
    // {
    //   name: 'marketingweek',
    //   url: 'https://www.marketingweek.com/latest/feed/'
    // },
    // {
    //   name: 'telegraphandargus',
    //   url: 'https://www.thetelegraphandargus.co.uk/news/rss/'
    // }
  ],
  apiUrl: 'https://api.rss2json.com/v1/api.json?rss_url=',
  apiKey: '4icebxnoipdjztcrzinipyvhiy4yppc739oa1kef',
  errorCodes: {
    client: {
      feedExists: {
        message: 'Feed already exists',
        code: 1000
      }
    },
    server: {
      internalServer: 500
    }
  }
};
