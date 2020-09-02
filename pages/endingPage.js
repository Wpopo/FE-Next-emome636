import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mediaQuery from 'Components/common/mediaQuery';
import Helper from 'Lib/helper';
import Router, { useRouter } from 'next/router';
import API from 'CONSTANTS/API/memberAPI';
import { FlexCenterBetween, FlexCenterAround } from 'Components/common/Flexbox/index';

function splitDateText(dateText = '') {
  return {
    year: new Date(dateText).getFullYear(),
    month: new Date(dateText).getMonth() + 1,
    date: new Date(dateText).getDate(),
  };
}
function groupThreeContentToOneList(contentList = []) {
  return contentList.reduce(
    (result, current) => {
      const lastIndexOfResult = result.length - 1;
      if (result[lastIndexOfResult].length < 3) {
        result[lastIndexOfResult].push(current);
      } else {
        result.push([current]);
      }
      return result;
    },
    [[]],
  );
}
function renderSeatList(contentList = []) {
  return groupThreeContentToOneList(contentList).map((contentRowList, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <ItemContentList key={index}>
      {contentRowList.map((content) => (
        <ItemContent key={content} fontSize="16px" paddingRight="15px">
          {content}
        </ItemContent>
      ))}
    </ItemContentList>
  ));
}
function renderDownerSectionItem(itemList = [], itemMinWidth = 'fit-content') {
  return itemList.map(({ wording, content }) => {
    if (wording === '日期') {
      return (
        <Item key={content} minWidth={itemMinWidth}>
          <ItemWording>{wording}</ItemWording>
          <ItemContentList>
            <ItemContent fontSize="20px">
              {`${splitDateText(content).month}.${splitDateText(content).date}`}
            </ItemContent>
            <ItemContentForYearText>{splitDateText(content).year}</ItemContentForYearText>
          </ItemContentList>
        </Item>
      );
    }
    if (wording === '座位' && Array.isArray(content)) {
      return (
        <Item key={content} minWidth={itemMinWidth}>
          <ItemWording>{wording}</ItemWording>
          <ItemContentListWrapper>{renderSeatList(content)}</ItemContentListWrapper>
        </Item>
      );
    }
    return (
      <Item key={content} minWidth={itemMinWidth}>
        <ItemWording>{wording}</ItemWording>
        <ItemContent fontSize={wording === '時間' ? '20px' : '18px'}>{content}</ItemContent>
      </Item>
    );
  });
}

const Ticket = () => {
  //const orderID = '1526308a065849a7914bc84bad4b9aa3';
  //const orderID = sessionStorage.getItem('orderID');

  const router = useRouter();
  const { orderID } = router.query;
  const [movieInfoObj, setMovieInfoObj] = useState(null);
  const [ticketInfoObj, setTicketInfoObj] = useState(null);
  const [downerSectionItemList, setDownerSectionItemList] = useState(null);

  useEffect(() => {
    fetchInfo();
  }, []);

  const processInfo = (info) => {
    const r1 = {
      movieName: info.movie_title.zh_tw,
      movieImageUrl: info.poster_url,
    };

    const r2 = {
      ticketNumber: info.booking_num,
      cinemaName: info.cinema_name.zh_tw,
      theaterName: info.hall_name,
      movieType: info.movie_version,
      playDate: info.show_date,
      playTime: info.show_time,
      seatList: info.seats.split(','),
    };

    const showTime = Helper.datetime.MsToformatObj(r2.playTime);
    const r3 = [
      { wording: '影城', content: r2.cinemaName },
      { wording: '廳別', content: r2.theaterName },
      { wording: '版本', content: r2.movieType },
      { wording: '日期', content: r2.playDate },
      { wording: '時間', content: showTime.time },
      { wording: '座位', content: r2.seatList },
    ];
    setMovieInfoObj(r1);
    setTicketInfoObj(r2);
    setDownerSectionItemList(r3);
  };

  const fetchInfo = () => {
    Helper.axios.fetch(
      API.MEMBER.GET_ORDER(orderID),
      (cb) => {
        //console.log(cb);
        processInfo(cb);
      },
      {
        errorFn: () => {
          Router.push({ pathname: '/repairPage' });
        },
      },
    );
  };

  return orderID !== null && movieInfoObj != null && downerSectionItemList != null && ticketInfoObj != null ? (
    <TicketWrapper>
      <BackGround>
        <MovieImg src={movieInfoObj.movieImageUrl} alt="movieImg" />
        <UpperSection>
          <Name>{movieInfoObj.movieName}</Name>
          <Wording>訂票序號</Wording>
          <TicketNumber>{ticketInfoObj.ticketNumber}</TicketNumber>
        </UpperSection>
        <DownerSection>
          <ItemWrapper>{renderDownerSectionItem(downerSectionItemList.slice(0, 2), '115px')}</ItemWrapper>
          <ItemWrapper>
            {renderDownerSectionItem(downerSectionItemList.slice(2, 3), '115px')}
            <InnerItemWrapper>
              {renderDownerSectionItem(downerSectionItemList.slice(3, 5), 'fit-content')}
            </InnerItemWrapper>
          </ItemWrapper>
          <ItemWrapper>{renderDownerSectionItem(downerSectionItemList.slice(5, 6), 'fit-content')}</ItemWrapper>
        </DownerSection>
      </BackGround>
    </TicketWrapper>
  ) : null;
};

Ticket.propTypes = {
  movieName: PropTypes.string,
  movieImageUrl: PropTypes.string,
  ticketNumber: PropTypes.string,
  cinemaName: PropTypes.string,
  theaterName: PropTypes.string,
  movieType: PropTypes.string,
  playDate: PropTypes.string,
  playTime: PropTypes.string,
  seatList: PropTypes.array,
};
Ticket.defaultProps = {
  movieName: '',
  movieImageUrl: '',
  ticketNumber: '',
  cinemaName: '',
  theaterName: '',
  movieType: '',
  playDate: '',
  playTime: '',
  seatList: [],
};

export default Ticket;

const TicketWrapper = styled.div`
  max-width: 640px;
  width: 100%;
  margin: 50px auto 40px;
  ${mediaQuery.tablet`
    padding: 0 15px;
  `}
`;
const BackGround = styled.div`
  background-color: #2c2e36;
  width: 100%;
  border-radius: 3px;
`;
const MovieImg = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 3px 3px 0 0;
  ${mediaQuery.phone`
    min-width: 270px;
  `}
`;
const UpperSection = styled.div`
  padding: 10px;
  position: relative;
  &::before {
    content: '';
    display: block;
    height: 26px;
    width: 13px;
    background-color: #5b5e6d;
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
    position: absolute;
    top: 100%;
    left: 0;
    transform: translateY(-50%);
  }
  &::after {
    content: '';
    display: block;
    height: 26px;
    width: 13px;
    background: #5b5e6d;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    position: absolute;
    top: 100%;
    right: 0;
    transform: translateY(-50%);
  }
`;
const DownerSection = styled.div`
  padding: 30px;
  position: relative;
  &::before {
    content: '';
    display: block;
    height: 0;
    width: calc(100% - 40px);
    box-sizing: border-box;
    border-top: 7px solid gray;
    border-top-style: dotted;
    position: absolute;
    top: -2px;
    left: 20px;
  }
`;
const Name = styled.h3`
  text-align: center;
  font: 18px normal normal normal;
  letter-spacing: normal;
  color: #ffffff;
  margin: 4px 0 0;
`;
const Wording = styled.p`
  text-align: center;
  margin-top: 4px;
  font: 12px normal normal normal;
  letter-spacing: normal;
  color: #b2b4bf;
`;
const TicketNumber = styled.p`
  text-align: center;
  margin: 4px 0;
  font: 18px normal normal normal;
  font-weight: bold;
  letter-spacing: normal;
  color: #d1ff5b;
`;
const ItemWrapper = styled(FlexCenterBetween)`
  max-width: 350px;
  min-width: 175px;
  margin: auto;
  ${mediaQuery.tablet`
    flex-wrap: wrap;
  `}
  @media (max-width: 425px) {
    padding-left: 10%;
  }
  @media (max-width: 375px) {
    padding-left: 5%;
  }
  @media (max-width: 360px) {
    padding-left: 0;
  }
`;
const InnerItemWrapper = styled(ItemWrapper)`
  margin: 0;
  @media (max-width: 425px) {
    padding-left: 0;
  }
  @media (max-width: 375px) {
    padding-left: 0;
  }
`;
const ItemContentListWrapper = styled(FlexCenterAround)`
  flex-direction: column;
  align-items: flex-start;
`;
const ItemContentList = styled(FlexCenterBetween)`
  align-items: baseline;
`;
const Item = styled.div`
  min-width: ${({ minWidth }) => minWidth};
  margin-top: 16px;
`;
const ItemWording = styled.p`
  font: 12px normal normal normal;
  letter-spacing: normal;
  color: #989cab;
`;
const ItemContent = styled.p`
  font: normal normal normal;
  font-size: ${({ fontSize }) => fontSize || '18px'};
  letter-spacing: normal;
  color: #ffffff;
  margin-top: 4.5px;
  padding-right: ${({ paddingRight }) => paddingRight || '6px'};
  @media (max-width: 345px) {
    padding-right: 7px;
  }
`;
const ItemContentForYearText = styled(ItemContent)`
  font: 12px normal normal normal;
  color: #b2b4bf;
`;
