import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mediaQuery from 'Components/common/mediaQuery';
import IMAGE from 'CONSTANTS/image';
import store from 'Store';
import {
  FlexStartStart,
  FlexStartBetween,
  FlexCenterEnd,
  FlexCenterAround,
  FlexCenterBetween,
  FlexBottomBetween,
} from 'Components/common/Flexbox/index';

function renderItemContentList(contentList = []) {
  return contentList.map(({ isWithNextLink, url, text }) =>
    isWithNextLink ? (
      <ItemContentAnchor href={url} rel="noopener noreferrer" key={text}>
        {text}
      </ItemContentAnchor> // use next Link Component to client side render.
    ) : (
      <ItemContentAnchor href={url} rel="noopener noreferrer" key={text}>
        {text}
      </ItemContentAnchor> // use origin html anchor tag.
    ),
  );
}
function renderItemList(itemList = [], whichSection = 'upper') {
  if (whichSection === 'downer') {
    return itemList.map((item) => <ItemContent key={item}>{item}</ItemContent>);
  }
  return itemList.map(({ title, contentList }) => (
    <ItemWrapper key={title}>
      <ItemTitle>{title}</ItemTitle>
      <ItemContentWrapper>{renderItemContentList(contentList)}</ItemContentWrapper>
    </ItemWrapper>
  ));
}
const footerDataObj = {
  footerMainTitle: '影城通',
  itemList: [
    {
      title: '優惠查詢',
      contentList: [
        {
          isWithNextLink: false,
          url: '/preferential',
          text: '優惠方案',
        },
        {
          isWithNextLink: false,
          url: '#',
          text: '訂票優惠',
        },
      ],
    },
    {
      title: '電影時刻',
      contentList: [
        {
          isWithNextLink: false,
          url: '/movieInfo',
          text: '現正熱映',
        },
        {
          isWithNextLink: false,
          url: '/movieInfo',
          text: '即將上映',
        },
      ],
    },
    {
      title: '客服中心',
      contentList: [
        {
          isWithNextLink: false,
          url: '/FAQ',
          text: '常見問題',
        },
        {
          isWithNextLink: false,
          url: '#',
          text: '聯絡我們',
        },
      ],
    },
    {
      title: '認識影城通',
      contentList: [
        {
          isWithNextLink: false,
          url: 'https://www.facebook.com/636movie.FansClub/',
          text: '官方粉絲團',
        },
        {
          isWithNextLink: false,
          url: '/privacy',
          text: '隱私權條款',
        },
        {
          isWithNextLink: false,
          url: '/terms',
          text: '會員條款',
        },
        {
          isWithNextLink: false,
          url: '/safety',
          text: '網路安全通報',
        },
      ],
    },
  ],
  eztInfoObj: {
    eztIconUrl: IMAGE.ICON.ez_logo,
    companyName: '富爾特科技股份有限公司',
    address: '臺灣新北市新店區寶強路 6-3 號 5 樓',
    customerPhoneNumber: '02-89126600',
    copyRightText: `Copyright Since ${new Date().getFullYear()} 影城通 版權所有。轉載必究`,
  },
};
const Footer = () => {
  const downerSectionContentList = [
    footerDataObj.eztInfoObj.companyName,
    footerDataObj.eztInfoObj.address,
    `客服電話 ${footerDataObj.eztInfoObj.customerPhoneNumber}`,
  ];

  //const state = store.getState();
  const view = store.getState().getIn(['payment', 'main', 'view']);
  let isShow = true;
  if (view != null && (view === 'selectProduct' || view === 'checkOut')) {
    isShow = false;
  }

  return isShow ? (
    <FooterWrapper>
      <UpperSection>
        <MainTitle>{footerDataObj.footerMainTitle}</MainTitle>
        <ItemListWrapper>{renderItemList(footerDataObj.itemList, 'upper')}</ItemListWrapper>
      </UpperSection>
      <DownerSection>
        <DownerSectionTitle>
          {`訂票系統由`}
          <Logo>
            <img src={footerDataObj.eztInfoObj.eztIconUrl} />
          </Logo>
          {`維護提供`}
        </DownerSectionTitle>
        <DownerSectionContent>
          <DownerItemItemListWrapper>{renderItemList(downerSectionContentList, 'downer')}</DownerItemItemListWrapper>
          <CopyRightContentWrapper>
            <CopyRightContent>{footerDataObj.eztInfoObj.copyRightText}</CopyRightContent>
          </CopyRightContentWrapper>
        </DownerSectionContent>
      </DownerSection>
    </FooterWrapper>
  ) : (
    <div> </div>
  );
};

Footer.propTypes = {
  mainTitle: PropTypes.string,
  itemList: PropTypes.array,
  iconUrl: PropTypes.string,
  companyName: PropTypes.string,
  address: PropTypes.string,
  customerPhoneNumber: PropTypes.string,
  copyRightText: PropTypes.string,
};
Footer.defaultProps = {
  mainTitle: '',
  itemList: [],
  iconUrl: '',
  companyName: '',
  address: '',
  customerPhoneNumber: '',
  copyRightText: '',
};

export default Footer;

const FooterWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  background-color: #404455;
`;
const UpperSection = styled(FlexCenterAround)`
  position: relative;
  padding-top: 20px;
  width: 95%;
  margin: auto;
  align-items: center;
  ${mediaQuery.desktop`
    min-height: 330px
  `}
  @media (max-width: 600px) {
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 35px;
  }
  &::after {
    content: '';
    display: block;
    border: 1px solid #5b5e6d;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
  }
`;
const MainTitle = styled.p`
  font: 35px normal normal normal;
  color: #ffffff;
  font-weight: bolder;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
`;
const ItemListWrapper = styled(FlexStartBetween)`
  width: 100%;
  max-width: 460px;
  padding: 0 15px;
  flex-wrap: wrap;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
  @media (max-width: 600px) {
    margin-top: 30px;
  }
  @media (max-width: 435px) {
    max-width: 220px;
    margin-top: 0;
  }
`;
const ItemWrapper = styled.div`
  @media (max-width: 435px) {
    margin-top: 50px;
  }
`;
const ItemTitle = styled.p`
  margin: auto;
  width: fit-content;
  font: 20px normal normal normal;
  font-weight: 600;
  letter-spacing: normal;
  color: #ffffff;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
  @media (max-width: 435px) {
    font-size: 16px;
  }
`;
const ItemContentWrapper = styled(FlexStartStart)`
  flex-direction: column;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
`;
const ItemContentAnchor = styled.a`
  font: 16px normal normal normal;
  font-weight: 600;
  letter-spacing: normal;
  color: #b6b8c6;
  margin-top: 16px;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
  @media (max-width: 600px) {
    display: inline-block;
    margin: 16px auto 0;
  }
  @media (max-width: 435px) {
    font-size: 14px;
  }
`;
const DownerSection = styled.div`
  margin: auto;
  width: 95%;
  max-width: 1200px;
`;
const DownerSectionTitle = styled(ItemTitle)`
  width: 100%;
  margin: 60px 0 30px;
  font-size: 18px;
  color: #8d91a1;
  display: flex;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
  @media (max-width: 1024px) {
    width: fit-content;
    margin: 34px auto 20px;
  }
`;
const Logo = styled(ItemTitle)`
  margin: 0px 10px;
`;
const DownerSectionContent = styled(FlexBottomBetween)`
  flex-wrap: wrap;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
const DownerItemItemListWrapper = styled(FlexCenterBetween)`
  width: 100%;
  max-width: 595px;
  flex-wrap: wrap;
  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
  @media (min-width: 600px) {
    & p:nth-child(2) {
      position: relative;
    }
    & p:nth-child(2)::before {
      content: '';
      display: block;
      background-color: #5b5e6d;
      width: 2px;
      height: 14px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-20px, -50%);
    }
    & p:nth-child(2)::after {
      content: '';
      display: block;
      background-color: #5b5e6d;
      width: 2px;
      height: 14px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(20px, -50%);
    }
  }
`;
const ItemContent = styled.p`
  font: 14px normal normal normal;
  font-weight: 600;
  letter-spacing: normal;
  color: #d3d4df;
  margin-top: 5px;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
`;
const CopyRightContentWrapper = styled(FlexCenterEnd)`
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const CopyRightContent = styled(ItemContent)`
  font-size: 14px normal normal normal;
  font-weight: 600;
  letter-spacing: normal;
  color: #b6b8c6;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
  @media (max-width: 1024px) {
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
  }
`;
