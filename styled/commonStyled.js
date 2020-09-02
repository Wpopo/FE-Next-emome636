import styled, { css, keyframes } from 'styled-components';
import IMAGE from 'CONSTANTS/image';
import Palette from 'Styled/palette';

const sizes = {
  xs: 0,
  sm: 540,
  md: 768,
  lg: 1024,
  xl: 1440,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

// clear float
export const Clearfix = styled.div`
  clear: both;
`;

// loading
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const EZDingWrapper = styled.div`
  padding: 80px 0 0 0; // 扣掉 Header 位址
  background-color: ${Palette.FIFTH[70]};
  height: 100%;
  min-height: 100vh;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;

  // 排版
  .fullPage {
    max-width: 700px;
    margin: auto;

    ${media.lg`
      max-width: 100%;
      padding: 0 24px;
    `}

    ${media.sm`
      padding: 0 16px;
    `}
  }

  .break {
    flex-basis: 100%;
    height: 0;
    padding-bottom: 8px;
  }

  // 共用CSS Component
  // 主標題 + 前方標誌 (EX: 電影時刻的現正熱映)
  .EZ_movie_title {
    color: #ffffff;
    display: flex;
    align-items: center;

    :before {
      content: '';
      background-color: ${Palette.SECOND[80]};
      width: 7px;
      height: 14px;
      line-height: 20px;
      display: inline-block;
      transform: skew(-20deg);
      margin-right: 16px;
    }
  }

  // 時間 + 時間標誌 (EX: 電影時刻的上映時間)
  .EZ_movie_date {
    display: flex;
    align-items: center;
    :before {
      content: '';
      display: inline-block;
      background-image: url(${IMAGE.ICON.Movie_Date});
      width: 14px;
      height: 14px;
      background-repeat: no-repeat;
      background-size: cover;
      margin-right: 4px;
    }
  }

  // 斜四邊形樣式
  // 純四邊形樣式: .EZ_ObliqueCube
  // 按鈕: .EZ_ObliqueCube.btn
  // 按鈕focus: .EZ_ObliqueCube.btn.selected
  // 四邊形排名樣式 .EZ_ObliqueCube.rank
  .EZ_ObliqueCube {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    transform: skew(-20deg);
    text-align: center;
    background-color: ${Palette.SECOND[80]};

    // button 樣式
    &.btn {
      background-color: unset;
      border: 1px solid ${Palette.FIFTH[40]};
      color: ${Palette.FIFTH[10]};
      cursor: pointer;
      &.selected {
        border: 1px solid ${Palette.FIRST[30]};
        background-color: ${Palette.THIRD[90]};
        color: ${Palette.FIRST[30]};
        span {
          color: ${Palette.FIRST[30]};
        }
      }
    }

    // 排名樣式
    &.rank {
      background-color: ${Palette.FIRST[30]};
      color: ${Palette.FIRST[90]};
      font-size: 20px;
      font-weight: bold;
      line-height: 22px;
      width: 32px;
      height: 48px;
      div {
        width: 14px;
        height: 10px;
        background-size: contain;
        background-repeat: no-repeat;
        &.up {
          background-image: url(${IMAGE.ICON.rank_up});
        }
        &.flat {
          background-image: url(${IMAGE.ICON.rank_flat});
        }
        &.down {
          background-image: url(${IMAGE.ICON.rank_down});
        }
      }
    }

    span {
      color: #ffffff;
      display: block;
      transform: skew(20deg);
      font-size: 12px;
    }
  }

  // Scroll Bar樣式
  .Ez_Scroll_Bar {
    ::-webkit-scrollbar {
      width: 28px;
      height: 28px;
      background-color: rgba(255, 255, 255, 0);
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb {
      border: 16px solid rgba(255, 255, 255, 0);
      background-clip: padding-box;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${Palette.FIFTH[90]};

      :hover {
        border: 16px solid rgba(255, 255, 255, 0);
      }
    }

    ::-webkit-scrollbar-corner {
      background-color: rgba(255, 255, 255, 0);
    }
  }

  // 禁止text-selected
  .no_copy {
    -webkit-user-select: none; // Chrome all, Safari all
    -moz-user-select: none; // Firefox all
    -ms-user-select: none; // IE 10+
    user-select: none; // Likely future
  }

  // 文字溢出處理 (單行 + ...)
  .text_ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .btn-loading::after {
    content: ' ';
    width: 16px;
    height: 16px;
    border: 2px solid;
    border-top-color: rgba(0, 0, 0, 0) !important;
    border-left-color: rgba(0, 0, 0, 0) !important;
    border-radius: 50%;
    animation: ${rotate360} 0.7s infinite linear;
  }

  // swiper
  .swiper-button-prev,
  .swiper-button-next {
    &:after {
      content: '';
      background-repeat: no-repeat;
      background-size: contain;
      width: 10px;
      height: 37px;
    }
  }
  .swiper-button-prev {
    :after {
      background-image: url(${IMAGE.ICON.Arrow_Left});
    }
  }
  .swiper-button-next {
    :after {
      background-image: url(${IMAGE.ICON.Arrow_Right});
    }
  }
`;
