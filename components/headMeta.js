import React from 'react';
import Head from 'next/head';
import Helper from 'Lib/helper';

class HeadMeta extends React.Component {
  render() {
    let htmlencode;
    if (this.props.articleInfo) {
      const articleContent = this.props.articleInfo.result.content_detail;

      htmlencode = articleContent
        .replace(/[\"&%<>;:=.?/-]/g, a => {
          return {
            '"': '',
            '&': '',
            '<': '',
            '>': '',
            ';': '',
            ':': '',
            '=': '',
            '.': '',
            '/': '',
            '-': '',
            '%': '',
            '?': '',
          }[a];
        })
        .replace(/\w+/g, '')
        .replace(/\s+/g, '');
    }

    let tags = [];
    let tagstTitle = [];
    let title;
    let tagstImage;
    let movieid;
    let gtagScript;
    const defaultImg = 'https://www.ezding.com.tw/static/common/ezding_share_media_logo.png';

    if (this.props.moviepage && this.props.movieInfo) {
      // 電影介紹頁
      title = this.props.movieInfo.movie_title.zh_tw;
      tags = [this.props.movieInfo.movie_description];
      movieid = this.props.movieInfo.movie_id;
      tagstImage = this.props.movieInfo.movie_poster[0].poster_url;
    } else if (this.props.homepage) {
      // homepage
      title = 'ez訂-全台最大電影訂票平台';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding'];
      tagstImage = defaultImg;
    } else if (this.props.booking) {
      // location booking訂票頁
      title = `ez訂-${this.props.booking}線上訂票平台`;
      tags = ['ez訂-全台最大電影訂票平台', 'ezding'];
      tagstImage = defaultImg;
    } else if (this.props.location) {
      // booking訂票頁
      title = `ez訂-${this.props.location}線上訂票平台`;
      tags = ['ez訂-全台最大電影訂票平台', 'ezding'];
      tagstImage = defaultImg;
    } else if (this.props.cinemaEntry) {
      // cinemaEntry_booking訂票頁
      title = `ez訂-${this.props.cinemainfo.cinema_name.zh_tw}線上訂票平台`;
      tags = ['ez訂-全台最大電影訂票平台', 'ezding', this.props.cinemainfo.cinema_name.zh_tw];
      tagstImage = defaultImg;
    } else if (this.props.preferential) {
      // preferential頁
      title = 'ez訂-線上訂票平台';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding', '影城刷卡優惠'];
      tagstImage = defaultImg;
    } else if (this.props.article) {
      // article頁
      title = 'ez訂-線上訂票平台';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding', '影評文章'];
      tagstImage = defaultImg;
    } else if (this.props.articlePage) {
      // articlePage頁
      title = this.props.articleInfo.result.content_title;
      tags = htmlencode.substring(0, 60);
      tagstTitle = [this.props.articleInfo.result.content_title];
      tagstImage = this.props.articleInfo.result.first_image;
    } else if (this.props.FAQ) {
      // FAQ頁
      title = 'ez訂-線上訂票平台';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding', '問答'];
      tagstImage = defaultImg;
    } else if (this.props.seatMap) {
      // booking_seatMap
      title = 'ez訂-線上訂票平台';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding'];
      tagstImage = defaultImg;
    } else if (this.props.movieInfoIndex) {
      // movieInfoIndex
      title = 'ez訂-線上訂票平台';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding'];
      tagstImage = defaultImg;
    } else if (this.props.memberCenter) {
      // memberCenter
      title = 'ez訂-會員中心';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding'];
      tagstImage = defaultImg;
    } else if (this.props.endingPage) {
      // endingPage
      title = 'ez訂-線上訂票平台';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding', '付款'];
      gtagScript = true;
      tagstImage = defaultImg;
    } else if (this.props.guide) {
      // guide
      title = 'ez訂-使用攻略';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding', '訂票'];
      tagstImage = defaultImg;
    } else if (this.props.paymentweb) {
      // paymentweb
      title = 'ez訂-paymentweb';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding', 'paymentweb'];
      tagstImage = defaultImg;
    } else {
      title = 'ez訂-線上訂票平台';
      tags = ['ez訂-全台最大電影訂票平台', 'ezding'];
      tagstImage = defaultImg;
    }

    return (
      <div>
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '996086243777493');
            `,
            }}
          />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: ` !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '2611384078902029');
            `,
            }}
          />

          {this.props.articlePage ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: `
                      {
                          "@context" : "http://schema.org",
                          "@type" : "Article",
                          "name" : "${this.props.articleInfo.result.content_title}",
                          "author" : {
                              "@type" : "Person",
                              "name" : "${this.props.articleInfo.result.author.author_name}"
                          },
                          "datePublished" : "${Helper.datetime.formatUTC(this.props.articleInfo.result.created_time)}",
                          "image" : "${this.props.articleInfo.result.first_image}",
                          "articleBody" : "${htmlencode}",
                          "url" : "https://www.ezding.com.tw/articlePage?content_id=${
                            this.props.articleInfo.result.content_id
                          }",
                          "headline" : "${this.props.articleInfo.result.content_title}",
                          "publisher" : {
                              "@type" : "Organization",
                              "name" : "${this.props.articleInfo.result.author.author_name}",
                              "logo" : {
                                   "@type" : "ImageObject",
                                   "url" : "https://www.ezding.com.tw/static/common/ezding_share_media_logo.png"
                              }
                          }
                      }
                  `,
              }}
            />
          ) : null}

          <meta property="og:title" content={tagstTitle} />
          <meta property="og:image" content={tagstImage} />
          <title>{title}</title>
          <meta
            name="viewport"
            contnent="initial-scale=1.0, width=device-width, height=device-height, viewport-fit=cover"
          />
          <meta name="description" content={tags} />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/1.2.2/react-datepicker.css"
          />

          <style JSX>
            {`
      			html,body{
              outline:none;
      				margin: 0;
      				padding: 0;
              background-color: #2b2b2b;
              font-family: system, -apple-system, BlinkMacSystemFont,"PingFang SC",Microsoft JhengHei,Helvetica,Arial,sans-serif;
              font-weight:normal;
      			}
            a{
              text-decoration:none;
            }
      		`}
          </style>
        </Head>
      </div>
    );
  }
}

export default HeadMeta;
