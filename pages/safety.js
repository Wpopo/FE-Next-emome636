import React from 'react';
import HeadMeta from '../components/headMeta';
import Footer from 'Components/common/Footer';
import styled from 'styled-components';

const safety = ({ classes }) => {
  return (
    <div>
      <HeadMeta />
      <RootStyle>
        <DivStyle>
          <br />
          <TittleStyle>網路安全通報</TittleStyle>
          <br />
          <TextStyle>目前網路詐騙的案件，層出不窮。</TextStyle>
          <br />
          <br />
          <SubStyle>提醒會員</SubStyle>
          <br />
          <TextStyle>
            影城通的任何人員或合作銀行，不會經由電話或其他任何方式，指示會員操作ATM提款機、臨櫃提款，或有任何匯款行為；影城通的任何人員或合作銀行，不會套問會員的個人資訊（例如：金融卡帳號密碼或信用卡卡號等資訊）。
          </TextStyle>
          <br />
          <br />
          <SubStyle>請會員放心</SubStyle>
          <br />
          <TextStyle>
            影城通保障每一位會員的個人資訊安全。如果您接到任何疑似詐騙的電話或訊息，請立即掛斷電話或中止互動，並請與影城通客服人員反應。
            影城通將蒐集資料並與相關單位合作，共同打擊網路詐騙犯罪。
          </TextStyle>
          <TextStyleW>影城通客服信箱：service@fullerton.com.tw</TextStyleW>
          <TextStyleW>影城通客服專線：(02)8912-6600（週一～週六 09:00～21:00，週日及國定假日 09:00～18:00）</TextStyleW>
          <br />
          <br />
          <SubStyle>詐騙集團的手法日益翻新，建議您</SubStyle>
          <br />
          <Ul>
            <Li>定期更新電腦及帳戶密碼、安裝防毒軟體與防火牆</Li>{' '}
          </Ul>
          <Ul>
            <Li>不要下載不認識的程式，避免被植入木馬程式，讓詐騙集團竊取您的資料</Li>
          </Ul>
          <Ul>
            <Li>小心開啟E-mail，防止駭客透過社交行為，攻擊取得帳密或植入木馬</Li>{' '}
          </Ul>
          <br />
          <br />
          <SubStyle>蒐集詐騙集團近期的詐騙話術，請您注意</SubStyle>
          <br />
          <Ul>
            <Li>誤刷分期，將重複扣款</Li>
          </Ul>
          <Ul>
            <Li>出現重複訂單，將連續扣款</Li>
          </Ul>
          <Ul>
            <Li>刷卡失敗，需改成轉帳</Li>
          </Ul>
          <Ul>
            <Li>自稱為帳務人員、會計人員…等，要求轉帳匯款</Li>
          </Ul>
          <Ul>
            <Li>
              最後都會引導您，按指示操作ATM提款機或是臨櫃匯款，以上都是詐騙話術，請會員無須回應，立即掛上電話，並與影城通客服反應。
            </Li>
          </Ul>
          <br />
          <br />
          <SubStyle>近期網路詐騙案例，請您注意</SubStyle>
          <br />
          <TextStyle>
            歹徒偽裝網路平台業者的客服人員，打電話給您（電話號碼，故意竄改成平台業者的電話號碼），並以各種方式套問：會員銀行帳戶金額，信
            用卡或提款卡後面的客服電話，歹徒之後再「偽裝成該銀行客服來電」，誤導會員至ATM提款機操作各種功能（例如解除分期，解除重複訂
            單，解除重複扣款…等）。
          </TextStyle>

          <TextStyleW>
            但事實上ATM提款機，只能領錢或將錢轉出，沒有其他的功能（例如解除設定），這些都是詐騙手法！請會員無須回應，立即掛上電話，並與
            影城通客服反應。
          </TextStyleW>
          <br />
          <br />
        </DivStyle>
      </RootStyle>
    </div>
  );
};

export default safety;

const TittleStyle = styled.div`
  font-size: 32px;
  text-align: justify;
  color: #ffffff;
  @media (max-width: 768px) {
    margin: 0px 10px;
  }
  @media (max-width: 320px) {
    margin: 0px 10px;
  }
`;
const RootStyle = styled.div`
  max-width: 910px;
  margin: auto;
`;
const DivStyle = styled.div`
  background-color: #535664;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // width: 100%;
  margin: 0px 10px;
`;
const SubStyle = styled.div`
  font-size: 24px;
  text-align: justify;
  color: #d1ff5b;
  @media (max-width: 768px) {
    margin: 0px 10px;
  }
  @media (max-width: 320px) {
    margin: 0px 10px;
  }
`;
const TextStyle = styled.div`
  font-size: 16px;
  color: #b2b4bf;
  line-height: 1.5;
  text-align: justify;
  @media (max-width: 768px) {
    max-width: 720px;
    margin: 0px 10px;
  }
  @media (max-width: 320px) {
    max-width: 288px;
    margin: 0px 10px;
  }
`;
const TextStyleW = styled.div`
  font-size: 16px;
  color: #ffffff;
  line-height: 1.5;
  text-align: justify;
  @media (max-width: 768px) {
    max-width: 720px;
    margin: 0px 10px;
  }
  @media (max-width: 320px) {
    max-width: 288px;
    margin: 0px 10px;
  }
`;

const Ul = styled.ul`
  list-style-type: disc;
`;

const Li = styled.li`
  font-size: 16px;
  color: #b2b4bf;
  line-height: 1.5;
  text-align: justify;
  @media (max-width: 768px) {
    max-width: 720px;
    //margin: 0px 10px;
  }
  @media (max-width: 320px) {
    max-width: 288px;
    //margin: 0px 10px;
  }
`;
