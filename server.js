const next = require('next');
const express = require('express');
const session = require('express-session');
const config = require('./config');
const helmet = require('helmet');
const csp = require('helmet-csp');
const compression = require('compression');

const nextJS = config.nextJS;
const beta = config.beta;
const prod = config.prod;

const request = require('request');

const dev = process.env.NODE_ENV !== 'production';
const production = process.env.NODE_ENV === 'production';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = dev == true ? next({ dev }) : next({ production });
const handle = app.getRequestHandler();

const FTC_KEY = '246abe9331eb41e0930f8558774ca444';

// sitemap.xml
const sm = require('sitemap');

const host = 'https://www.ezding.com.tw';
const sitemapUrlHotMovie = 'https://www.ezding.com.tw/new_ezding/ranking_list/order_top?page=1&page_size=50';
const sitemapUrlComingMovie = 'https://www.ezding.com.tw/new_ezding/ranking_list/coming?page=1&page_size=50';
const sitemapUrlArticle = 'https://www.ezding.com.tw/new_ezding/contents?content_category=movie_express&valid=1';

app.prepare().then(() => {
  const server = express();

  server.all(/(.*)/, (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === 'http') {
      if (req.originalUrl == '/check_alive.html') {
      } else {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
      }
    } else {
      return next(); // pass control to the next handler
    }
  });

  function header(currentHost) {
    if (currentHost == 'alpha-next.636.com.tw' || currentHost == 'localhost:3000' || currentHost == beta.host) {
      return {
        'Cache-control': 'max-age=120',
        'Content-Type': 'application/json; charset=utf-8',
      };
    }
    return {
      'Cache-control': 'max-age=120',
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Encoding': 'gzip',
    };
  }

  function appendAPIHeaders(req, res) {
    let domain = prod.ezdingAPIAddress;

    switch (req.headers.host) {
      case 'alpha-next.636.com.tw':
      case 'localhost:3000':
        domain = nextJS.ezdingAPIAddress;
        break;
      case beta.host:
        domain = beta.ezdingAPIAddress;
        break;
      case 'p1.ezding.com.tw':
      case 'p2.ezding.com.tw':
      case 'p3.ezding.com.tw':
      case 'p4.ezding.com.tw':
      case 'next.ezding.com.tw':
      case 'next2.ezding.com.tw':
      case 'www.ezding.com.tw':
      case 'test.ezding.com.tw':
        domain = prod.ezdingAPIAddress;
        break;
    }

    let url = domain + req.url;
    console.log(new Date(), 'appendAPIHeaders:', url);
    req.headers['X-Ftcsys-Key'] = FTC_KEY;

    // 區分需要做cache的path
    let headerObj = {};

    if (req.url.indexOf('new_ezding/orders/find_movie/') > 0) {
      headerObj = header(req.headers.host);
      res.writeHeader(200, headerObj);
    } else if (req.url.indexOf('newPaymentWeb/') > 0) {
      // for PaymentWeb (no cache)
      // 拿掉假路徑
      url = url.replace('newPaymentWeb/', '');
    } else if (
      req.url.indexOf('new_ezding/orders/') > 0 ||
      req.url.indexOf('new_ezding/members/') > 0 ||
      req.url.indexOf('new_ezding/api/members/') > 0 ||
      req.url.indexOf('new_ezding/ez_thirdparty/') > 0
    ) {
      // no cache
    } else {
      headerObj = header(req.headers.host);
      res.writeHeader(200, headerObj);
    }

    req.pipe(request(url)).pipe(res); // 指定response回傳的位置 回原本的路線上
  }

  function appendMemberAPIHeaders(req, res) {
    let domain = prod.memberAPIAddress;

    switch (req.headers.host) {
      case 'alpha-next.636.com.tw':
      case 'localhost:3000':
        domain = nextJS.memberAPIAddress;
        break;
      case beta.host:
        domain = beta.memberAPIAddress;
        break;
      case 'p1.ezding.com.tw':
      case 'p2.ezding.com.tw':
      case 'p3.ezding.com.tw':
      case 'p4.ezding.com.tw':
      case 'next.ezding.com.tw':
      case 'next2.ezding.com.tw':
      case 'www.ezding.com.tw':
      case 'test.ezding.com.tw':
        domain = prod.memberAPIAddress;
        break;
    }

    const url = domain + req.url;
    console.log(new Date(), 'appendMemberAPIHeaders:', url);
    req.headers['X-Ftcsys-Key'] = FTC_KEY;
    req.pipe(request(url)).pipe(res); // 指定response回傳的位置 回原本的路線上
  }
  function passGarageplay(req, res) {
    let url = req.url.replace('/GarageplayAPI', 'https://garageplay.tw');
    console.log(new Date(), 'passGarageplay:', url);
    req.pipe(request(url)).pipe(res); // 指定response回傳的位置 回原本的路線上
  }

  server.use(
    helmet({
      dnsPrefetchControl: { allow: true },
      frameguard: { action: 'allow-from', domain: '*' },
    }),
  );
  server.use(compression());

  function getScript() {
    const prodScripts = ["'self'", 'unpkg.com', 'http://localhost:3000', 'www.googletagmanager.com'];
    const devScripts = ['*', "'unsafe-eval'"];
    if (dev) {
      return devScripts;
    }
    return prodScripts;
  }

  function getDirectives() {
    return {
      defaultSrc: [
        "'self'",
        'http://l10l010l3322ll.photos.atmovies.com.tw:8080',
        'img.ezding.com.tw',
        'https://garageplay.tw',
        'flicksbank.console360.net',
        'https://www.youtube.com',
        'http://www.youtube.com',
      ],
      scriptSrc: getScript(),
      objectSrc: ["'none'"],
      styleSrc: ["'self'", 'unpkg.com', "'unsafe-inline'"],
      frameSrc: ['https://garageplay.tw', 'http://www.youtube.com'],
      frameAncestors: ["'garageplay.tw'"],
      mediaSrc: ["'https://garageplay.tw'"],
    };
  }

  server.use(
    csp({
      // Specify directives as normal.
      // directives: {
      //   // scriptSrc: [
      //   //   //dev only
      //   //   //'*',
      //   //   //"'unsafe-eval'",
      //   //   // "'unsafe-inline'",
      //   //   // 'code.jquery.com',
      //   //   // 'cdnjs.cloudflare.com',
      //   //   // 'ajax.googleapis.com',
      //   //   // 'ad.tagtoo.co',
      //   //   // 'www.googletagmanager.com',
      //   //   // 'cdn.tagtoo.com.tw',
      //   //   // 'www.google-analytics.com',
      //   //   // 'www.googleadservices.com',
      //   //   // 'googleads.g.doubleclick.net',
      //   //   // 's.yimg.com',
      //   //   // 'sp.analytics.yahoo.com'
      //   // ],
      //   objectSrc: ["'none'"],
      // },
      directives: getDirectives(),

      // This module will detect common mistakes in your directives and throw errors
      // if it finds any. To disable this, enable "loose mode".
      loose: false,

      // Set to true if you only want browsers to report errors, not block them.
      // You may also set this to a function(req, res) in order to decide dynamically
      // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
      reportOnly: false,

      // Set to true if you want to blindly set all headers: Content-Security-Policy,
      // X-WebKit-CSP, and X-Content-Security-Policy.
      setAllHeaders: false,

      // Set to true if you want to disable CSP on Android where it can be buggy.
      disableAndroid: false,

      // Set to false if you want to completely disable any user-agent sniffing.
      // This may make the headers less compatible but it will be much faster.
      // This defaults to `true`.
      browserSniff: true,
    }),
  );

  server.all(/\/new_ezding\//, appendAPIHeaders);
  server.all(/\/MemberUI\//, appendMemberAPIHeaders);
  server.all(/\/GarageplayAPI\//, passGarageplay);

  // 遇到mb.do或mmb.do 轉址
  server.all(/\b(mb.do|mmb.do)\b/, (req, res) => {
    return res.redirect('https://www.ezding.com.tw');
  });

  // 如果短網址進來，給一個靜態頁面倒轉，faq
  server.get('/page/faq/faq.html', (req, res) => {
    res.sendFile('./static/app/app.html', { root: __dirname });

    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    const redirecturl = `${http + req.headers.host}/faq` + '?comeFromApp=true&device=app';
    return res.redirect(redirecturl);
  });

  // 如果短網址進來，給一個靜態頁面倒轉，preferential
  server.get('/page/preferential/', (req, res) => {
    res.sendFile('./static/app/app.html', { root: __dirname });

    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    const redirecturl = `${http + req.headers.host}/preferential` + '?comeFromApp=true&device=app';
    return res.redirect(redirecturl);
  });

  // article沒有page是給Android，遇到userid=轉址
  server.all('/article/article.html', (req, res) => {
    if (req.query.userId != null) {
      const id = req.query.id;
      let http;
      if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
        http = 'http://';
      } else {
        http = 'https://';
      }
      const redirecturl = `${http + req.headers.host}/articlePage?content_id=${id}&comeFromApp=true&device=app`;
      return res.redirect(redirecturl);
    }
  });

  // article遇到userid=轉址
  // 舊ezding，page/article/article.html轉址
  server.all('/page/article/article.html', (req, res) => {
    const id = req.query.id;
    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    if (req.query.id) {
      if (req.query.userId != null) {
        const redirecturl = `${http + req.headers.host}/articlePage?content_id=${id}&comeFromApp=true&device=app`;
        return res.redirect(redirecturl);
      }
      const redirecturl = `${http + req.headers.host}/articlePage?content_id=${id}`;
      return res.redirect(redirecturl);
    }
    const redirecturl = `${http + req.headers.host}/article`;
    return res.redirect(redirecturl);
  });

  // 舊ezding，page/intro/movie_detail.html轉址
  server.all('/page/intro/movie_detail.html', (req, res) => {
    const id = req.query.id;
    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    const lineRedirecturl = `${http + req.headers.host}/movieInfo?movieid=${id}`;
    // console.log('bookingError',lineRedirecturl);
    return res.redirect(lineRedirecturl);
  });

  // 遇到bookingError時轉址
  server.all('/page/common/bookingError.html', (req, res) => {
    let http;
    if (req.headers.host == 'localhost:3000' || req.headers.host == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }
    const lineRedirecturl = `${http + req.headers.host}/bookingError`;
    // console.log('bookingError',lineRedirecturl);
    return res.redirect(lineRedirecturl);
  });

  // 遇到channel=line時redirect網址
  server.get('/page/booking/index.html', (req, res) => {
    // line進來取值
    // console.log(req.query.movieId);
    const campaignCode = req.query.campaign_code;
    const movieId = req.query.movieId;
    const cinemaId = req.query.cinemaId;
    const date = req.query.date;
    const time = req.query.time;
    const tickets = req.query.people;
    const sessionId = req.query.session;
    const channel = req.query.channel;
    const domain = req.headers.host;
    console.log(new Date(), 'channel=line_redirect:domain', domain);

    // 轉換成next資料
    const url = `movieId=${movieId}&cinemaId=${cinemaId}&date=${date}&time=${time}&tickets=${tickets}&session_id=${sessionId}&channel=${channel}&campaignCode=${campaignCode}`;

    let http;
    if (domain == 'localhost:3000' || domain == nextJS.host) {
      http = 'http://';
    } else {
      http = 'https://';
    }

    const lineRedirecturl = `${http + domain}/seatMap?${url}`;
    console.log(new Date(), 'channel=line_redirect:', lineRedirecturl);
    return res.redirect(lineRedirecturl);
  });

  // logo for line pay 平台
  server.get('/img/logo300x300.jpg', (req, res) => {
    res.sendFile('./static/linepay/logo300x300.jpg', { root: __dirname });
  });

  // check_alive.html
  server.get('/check_alive.html', (req, res) => {
    res.sendFile('./static/check_alive.html', { root: __dirname });
  });

  // apple pay 授權
  server.get('/.well-known/apple-developer-merchantid-domain-association.txt', (req, res) => {
    res.sendFile('./static/.well-known/apple-developer-merchantid-domain-association.txt', { root: __dirname });
  });

  // iframe:開眼
  server.get('/pages/iframe/iframe_layout4atmovie.html', (req, res) => {
    // console.log(req.query.id);
    res.sendFile('./static/iframe/iframe_new_atmovie.html', { root: __dirname });
  });

  // iframe:cardu
  server.get('/pages/iframe/iframe4cardu.html', (req, res) => {
    res.sendFile('./static/iframe/iframe4cardu.html', { root: __dirname });
  });

  // iframe:ETtoday
  server.get('/pages/iframe/iframe4ETtoday.html', (req, res) => {
    res.sendFile('./static/iframe/iframe4ETtoday.html', { root: __dirname });
  });

  // iframe:holyshare
  server.get('/pages/iframe/iframe4holyshare.html', (req, res) => {
    res.sendFile('./static/iframe/iframe4holyshare.html', { root: __dirname });
  });

  // iframe:yahoo
  server.get('/pages/iframe/iframe4yahoo.html', (req, res) => {
    res.sendFile('./static/iframe/iframe4yahoo.html', { root: __dirname });
  });

  // google console search:sitemapindex_____sitemap.xml
  server.get('/sitemap.xml', (req, res) => {
    res.sendFile('./static/sitemap.xml', { root: __dirname });
  });

  // google console search:sitemap movieInfo_____sitemap1.xml
  server.get('/sitemap1.xml', (req, res) => {
    getHotMovieList();
    function getHotMovieList() {
      request(sitemapUrlHotMovie, (err, response, body) => {
        const hotMovieList = JSON.parse(response.body).result.list;
        const smOption = {
          hostname: host,
          cacheTime: 600000,
          urls: [host],
        };
        hotMovieList.forEach((item) => {
          smOption.urls.push({
            url: `/movieInfo?movieid=${item.movie_id}`,
            changefreq: 'always',
            priority: 0.9,
          });
        });
        getComingMovieList(smOption, res);
      });
    }
    function getComingMovieList(smOption, res) {
      request(sitemapUrlComingMovie, (err, response, body) => {
        const comingMovieList = JSON.parse(response.body).result.list;

        comingMovieList.forEach((item) => {
          smOption.urls.push({
            url: `/movieInfo?movieid=${item.movie_id}`,
            changefreq: 'always',
            priority: 0.9,
          });
        });

        const xml = sm.createSitemap(smOption).toString();
        res.header('Content-Type', 'application/xml');
        res.send(xml);
      });
    }
  });
  // google console search:sitemap articlePage_____sitemap2.xml
  server.get('/sitemap2.xml', (req, res) => {
    request(sitemapUrlArticle, (err, response, body) => {
      const articleList = JSON.parse(response.body).result.list;
      const smOption = {
        hostname: host,
        cacheTime: 600000,
        urls: [host],
      };
      articleList.forEach((item) => {
        smOption.urls.push({
          url: `/articlePage?content_id=${item.content_id}`,
          changefreq: 'daily',
        });
      });
      const xml = sm.createSitemap(smOption).toString();
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });

  // bing search:sitemap
  server.get('/BingSiteAuth.xml', (req, res) => {
    res.sendFile('./static/BingSiteAuth.xml', { root: __dirname });
  });

  // FB search
  server.get('/q6k62bmkafeow7802xd4spzopztzaf.html', (req, res) => {
    res.sendFile('./static/q6k62bmkafeow7802xd4spzopztzaf.html', { root: __dirname });
  });

  server.get('/', (req, res) => {
    if (res.statusCode === 500) {
      res.statusCode = '';
    }
    return handle(req, res);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
  });
});

// route - 顯示目前的位置
// pathname - 要前往連結的位置
// query - 傳參數用,預設值{}
// asPath - 瀏覽器實際顯示的路徑但非實際連結位置
// push(url, as=url) - 執行呼叫
