import React from 'react';
import HeadMeta from '../components/headMeta';
import Footer from 'Components/common/Footer';
import styled from 'styled-components';

const terms = ({ classes }) => {
  return (
    <div>
      <HeadMeta />
      <RootStyle>
        <DivStyle>
          <br />
          <TittleStyle>會員條款</TittleStyle>
          <br />
          <TextStyle>
            影城通依據本會員服務使用條款（以下稱本條款）所提供的服務，本條款訂定之目的，即在於盡可能保護會員的權益，同時確認本服務及商品供應商與會員之間的契約關係。
          </TextStyle>
          <br />
          <TextStyle>
            當您完成會員加入後，表示您已經閱讀、瞭解且同意接受本條款所有的內容與約定，並完全接受本服務現有與未來衍生之服務項目。
          </TextStyle>
          <br />
          <TextStyle>
            本服務有權於任何時間基於需要而修改或變更本條款內容，修改後的條款內容將公佈在本服務『會員條款』上，本服務將不會個別通知會員，建議您隨時注意相關修改與變更。您於任何修改或變更之後繼續使用本服務，將視為您已經閱讀、瞭解且同意已完成之相關修改與變更。如果您不同意本條款的內容，您應立即停止使用本服務。
          </TextStyle>
          <br />
          <br />
          <SubStyle>會員服務範圍</SubStyle>
          <br />
          <TextStyle>
            本公司所提供的服務範圍以及未來所有可能衍生，屬於本服務並包括使用本服務所提供金流、物流與資訊流平台之所有網站、實體等服務。其服務內容包括但不限於商品買賣、內容瀏覽與利用電子郵件或其他方式進行商品行銷資訊之提供。本服務得依實際情形，增加、修改或是終止相關服務。本服務將提供的會員服務內容包括但不限於訂票或任何其他將來新增之會員服務功能。
          </TextStyle>
          <br />
          <br />
          <SubStyle>會員帳號、密碼與安全</SubStyle>
          <br />
          <TextStyle>
            Cookie 是儲存在您電腦上您的一小段相關資訊。我們使用兩種 Cookie，一種是工作階段 ID (或暫時性)
            Cookie，當您關閉瀏覽器時即會終止，另一種則是儲存在您硬碟上的永久性 Cookie。我們之所以使用 Cookie
            有幾個原因。例如，Cookie 讓您不用在每次登入時都要鍵入登入名稱，只需提供密碼即可進入系統。Cookie
            也讓我們能夠追蹤與鎖定使用者的興趣，以期改善我們網站的使用體驗。大多數的 Web 瀏覽器都會自動接受
            Cookie，但您也可以依照個人意願編輯您的瀏覽器選項，從而在以後阻斷它們。如果您選擇拒絕
            Cookie，您仍然可以造訪我們網站；然而在進入我們網站上某些區域時會受到限制。我們的第三方廣告公司也可能會將
            Cookie
            檔案置入您的硬碟中。這些公司可能要進行彙總的統計，計算您造訪本網站與其他網站的次數，以針對您可能感興趣的電影方面商品與服務提供廣告。影城通網站
            (636.com.tw) 無法使用或控制這些可能由第三方廣告商所置入的 Cookie。使用永久性 Cookie
            的廣告網路可能會提供您停止成為廣告目標的方法。第三方廣告公司也可能運用技術來評估廣告的有效性。為此，它們會在我們網站上放置網站信標
            (單點圖)
            以收集匿名資訊。它們可能使用您造訪本網站與其他網站的匿名資訊，藉此針對您可能感興趣的商品與服務提供廣告。透過這種處理方式所收集的資訊是匿名的，不會在線上動作與可識別的個人間產生關聯。
          </TextStyle>
          <br />
          <br />
          <SubStyle>會員的隱私權保障</SubStyle>
          <br />
          <TextStyle>
            本服務對於您所登錄或留存之個人資料，在未獲得您的同意以前，絕不對非本服務相關業務合作夥伴以外之人揭露您的姓名、手機門號、電子郵件地址及其他依法受保護之個人資料進行蒐集目的外之個人資料利用。
          </TextStyle>
          <br />
          <TextStyle>
            同時為提供會員個人化服務或加值服務之目的，您同意本服務得記錄、保存、並利用您在本服務所留存或產生之資料及記錄，同時在不揭露各該資料之情形下，得公開或使用統計資料。
          </TextStyle>
          <br />
          <TextStyle>
            在下列的情況下，本服務有可能會提供您的個人資料給相關機關，或主張其權利受侵害並提示司法機關正式文件之第三人：
          </TextStyle>
          <br />
          <TextStyle>一、基於法律之規定、或受司法機關與其他有權機關基於法定程序之要求；</TextStyle>
          <TextStyle> 二、為增進公共利益；</TextStyle>
          <TextStyle>三、為維護其他會員或第三人權益之重大危害；</TextStyle>
          <TextStyle>四、為免除您生命、身體、自由或財產上之危險；</TextStyle>
          <br />
          <TextStyle>
            關於您所登錄或留存之個人資料及其他特定資料（例如交易資料），悉依本服務「隱私權政策」受到保護與規範。
          </TextStyle>
          <br />
          <br />
          <SubStyle>資訊分享</SubStyle>
          <br />
          <TextStyle>
            取票序號是會員至影城取票唯一依據。完成線上選位及訂票確認後，訂票才算成功，訂票成功後，系統以簡訊及e-mail發送訂票序號給予會員，會員也可在本服務會員中心〔訂購紀錄〕專區，登入會員後，查詢取票序號。會員須於指定時間前，憑取票票序號至影城完成取票。
          </TextStyle>
          <br />
          <br />
          <SubStyle>智慧財產權</SubStyle>
          <br />
          <TextStyle>
            本服務所使用之軟體或程式、網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網站畫面的安排、網頁設計，除本公司有特別約定外，皆由本公司或其他權利人依法擁有其智慧財產權，包括但不限於商標權、專利權、著作權、營業秘密與專有技術等。
          </TextStyle>
          <br />
          <TextStyle>
            任何人不得擅自使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。任何人欲引用或轉載前述軟體、程式或網站內容，必須依法取得本公司或其他權利人的事前書面同意。如有違反，您應對本公司負損害賠償責任（包括但不限於訴訟費用及律師費用等）。
          </TextStyle>
          <br />
          <br />
          <SubStyle>責任限制</SubStyle>
          <br />
          <TextStyle>
            會員使用本服務時，在使用過程中所有的資料紀錄，以本服務資料庫所記錄之資料為準。如有發生任何糾紛，雙方將以最大誠意提出各自所儲存之電子資料記錄提交於法院或公正第三人作認定。
          </TextStyle>
          <br />
          <br />
          <SubStyle>服務暫停或中止</SubStyle>
          <br />
          <TextStyle>
            本公司以目前一般認為合理之方式及技術，維護本服務之正常運作；但在下列情況之下，本公司將有權暫停或中斷本服務之全部或一部，且對使用者任何直接或間接之損害，均不負任何賠償或補償之責任：
          </TextStyle>
          <br />
          <TextStyle>一、對本服務相關軟硬體設備進行搬遷、更換、升級、保養或維修時；</TextStyle>
          <TextStyle>二、使用者有任何違反政府法令或本使用條款情形；</TextStyle>
          <TextStyle>三、天災或其他不可抗力之因素所導致之服務停止或中斷；</TextStyle>
          <TextStyle>四、其他不可歸責於本公司之事由所致之服務停止或中斷；</TextStyle>
          <TextStyle>五、因合作影城因素所導致之服務停止或中斷（如合作影城終止合作）；</TextStyle>
          <TextStyle>
            六、非本公司所得控制之事由而致本服務資訊顯示不正確、或遭偽造、竄改、刪除或擷取、或致系統中斷或不能正常運作時。
          </TextStyle>
          <br />
          <TextStyle>
            本公司針對可預知之軟硬體維護工作，有可能導致系統中斷或是暫停者，將會於該狀況發生前，以適當之方式告知會員。
          </TextStyle>
          <br />
          <br />
          <SubStyle>會員身份終止與本公司通知之義務</SubStyle>
          <br />
          <TextStyle>
            除非您有前述提供錯誤或不實資料進行會員登錄、未經本人許可而盜刷其信用卡、逾時未取票超過一定比率、否認取票與影城查證結果不符超過三次或其他經查證屬實之不法情事，本公司得終止您的訂票權利及會員帳號。
          </TextStyle>
          <br />
          <TextStyle>
            在您決定取消本公司會員資格，並以電子郵件或透過本公司所提供之線上服務等方式通知本公司取消您的會員資格後，將自停止本公司會員身份之日起（以本公司電子郵件發出日期為準），喪失所有本服務所提供之優惠及權益。當您通知本公司停止會員身份時，本公司會透過會員資料登錄之電話號碼或電子郵件向您聯絡確認後，再進行註銷會員資格。
          </TextStyle>
          <br />
          <br />
          <SubStyle>本條款之效力、準據法與管轄法院</SubStyle>
          <br />
          <TextStyle>
            本條款中，任何條款之全部或一部份無效時，不影響其他約定之效力。您與本公司之權利義務關係，應依網路交易指導原則及中華民國法律定之；若發生任何爭議，以台灣台北地方法院為第一審管轄法院。本公司的任何聲明、條款如有未盡完善之處，將以最大誠意，依誠實信用、平等互惠原則，共商解決之道。
          </TextStyle>
          <br />
        </DivStyle>
      </RootStyle>
    </div>
  );
};

export default terms;

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
    max-width: 768px;
    margin: 0px 10px;
  }
  @media (max-width: 320px) {
    max-width: 320px;
    margin: 0px 10px;
  }
`;
