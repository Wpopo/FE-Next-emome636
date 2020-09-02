import React from 'react';
import HeadMeta from '../components/headMeta';
import Footer from 'Components/common/Footer';
import styled from 'styled-components';

const personal = ({ classes }) => {
  return (
    <div>
      <HeadMeta />
      <RootStyle>
        <DivStyle>
          <br />
          <TittleStyle>個人資料蒐集告知條款</TittleStyle>
          <br />
          <TextStyle>
            本服務是由『富爾特科技股份有限公司
            代中華電信股份有限公司』所建置提供。當您進行本服務時，即表示您願意以電子文件之方式接受告知並行使法律所賦予同意之權利。為確保您的權益，請詳閱以下個人資料蒐集告知事項：
          </TextStyle>
          <br />
          <br />
          <TextStyle>
            一、非公務機關名稱：中華電信(股)公司(含各分公司、電信研究院及電信學院，以下簡稱本公司)。
          </TextStyle>
          <TextStyle> 二、個人資料蒐集之目的：消費者、客戶管理與服務；經營電信業務與電信加值網路業務。</TextStyle>
          <TextStyle> 三、蒐集之個人資料類別：辨識個人使用。</TextStyle>
          <TextStyle> 四、個人資料利用之期間、地區、對象及方式 </TextStyle>
          <TextStyle>(一)期間：本公司營運期間內。 </TextStyle>
          <TextStyle>(二)地區：本公司營運之地區。 </TextStyle>
          <TextStyle>(三)對象：本公司、受本公司委託之關係企業及合作廠商。 </TextStyle>
          <TextStyle>(四)方式：提供電信服務、加值服務。</TextStyle>
          <br />
          <br />
          <TextStyle>
            五、本公司就本服務/業務填具之聯絡人資料，僅作服務/業務聯繫之用；法人代表人(負責人)、法定代理人及受託人之資料，僅作申辦服務/業務及聯絡使用。
          </TextStyle>
          <br />
          <br />
          <TextStyle>
            六、貴客戶得依個人資料保護法及相關法律規定，就其個人資料請求查詢、閱覽、製給複製本、補充更正、請求停止蒐集、處理、利用及刪除等權利。其行使方式依法令及本公司相關規定，撥打本公司免付費客服電話(市話直撥123、行動直撥0800-080-090)、網路客服中心(https://123.cht.com.tw/ecas/B09)或洽本公司各服務中心辦理。本公司得依個資法第10條、11條規定，執行業務所必須即法定保存期間等考量，決定是否接受申請。
          </TextStyle>
          <br />
          <br />
          <TextStyle>
            七、貴客戶得自由選擇填具個人資料(但依法令規定者不在此限)，若提供資料不足或有誤時，將影響服務申辦或其完整性。
          </TextStyle>
          <br />
          <br />
          <TextStyle>
            八、為優化服務，歷來及本次貴客戶申辦各項業務(含中華電信會員、使用公眾Wi-Fi等)，本公司將蒐集並彙整貴客戶上開個人資料及各項網頁(域)瀏覽與通信紀錄、位置與帳單資訊、收視紀錄等資料，以無法識別個人的方式產出分析報告提供本公司及關係企業或合作廠商。
          </TextStyle>
          <br />
          <br />
          <br />
        </DivStyle>
      </RootStyle>
    </div>
  );
};

export default personal;

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
  width: 100%;
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

const P = styled.p`
  font-size: 16px;
  color: #ffffff;
  line-height: 1.5;
  text-align: justify;
  text-indent: 20px;
`;
