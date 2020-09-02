const CONSTANTS = {
  // 爆米花 相關文字 設定
  popcorn: {
    // 商品頁
    product: { initText: '請選擇符合的商品數量', add: '加入成功！', noMatch: '選擇商品與訂購座位數不符喔！' },
    // 優惠頁
    preferential: {
      add: '加入成功！',
      notCheck: '請確認是否已完成優惠檢核',
      initText: '沒有優惠可直接進入下一步囉！',
      bankExcess: '銀行優惠僅能選擇一種喔！',
      bankMaxExcess: '此優惠可訂購張數已達上限！',
      excess: '選擇的優惠已達上限，請重新確認',
      noPreferential: '商品選全票才能搭優惠喔！',
    },
  },

  // 愛心碼查詢 網址連結
  LoveCode: 'https://www.einvoice.nat.gov.tw/APCONSUMER/BTC603W/',

  // 第三方付款
  temporary: {
    // 導頁Url
    paymentUrl: () => {
      let api = 'new_payment/v3/transaction/auth_external';
      switch (window.location.host) {
        // Alpha Domain
        case 'localhost:3000':
        case 'alpha-next.636.com.tw':
          api = `http://alpha-new-payment-local.fullerton.com.tw/${api}`;
          break;
        // Beta Domain
        case 'beta3.ezding.com.tw':
          api = `https://beta-new-payment.fullerton.com.tw/${api}`;
          break;
        // 正式 Domain
        case 'www.ezding.com.tw':
        case 'p1.ezding.com.tw':
          api = `https://new-payment.fullerton.com.tw/${api}`;
          break;
        default:
          api = `https://new-payment.fullerton.com.tw/${api}`;
          break;
      }
      return api;
    },
  },

  // Apple Pay相關設定
  applePay: {
    // 申請的Apple Pay Merchant Identifier
    merchantIdentifier: 'merchant.ezding.com.tw.cathaybk',

    // 付款設定
    paymentRequest: (price) => {
      return {
        countryCode: 'TW',
        currencyCode: 'TWD',
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        total: { label: 'ez訂', amount: price },
        merchantCapabilities: ['supports3DS'],
      };
    },
  },

  // 規則頁 會員條款
  POLICY: {
    MEMBER_POLICY: (
      <div>
        <p>歡迎您加入成為ez訂網站會員：</p>
        <p>
          ez訂（以下稱本服務）係由富爾特股份有限公司（以下稱本公司）依據本會員服務使用條款（以下稱本條款）所提供的服務，本條款訂定之目的，即在於盡可能保護會員的權益，同時確認本網站及商品供應商與會員之間的契約關係。
          <br />
          當您完成會員加入後，表示您已經閱讀、瞭解且同意接受本條款所有的內容與約定，並完全接受本服務現有與未來衍生之服務項目。
          <br />
          本網站有權於任何時間基於需要而修改或變更本條款內容，修改後的條款內容將公佈在本服務『會員中心』的網站上，本網站將不會個別通知會員，建議您隨時注意相關修改與變更。您於任何修改或變更之後繼續使用本服務，將視為您已經閱讀、瞭解且同意已完成之相關修改與變更。如果您不同意本條款的內容，您應立即停止使用本服務。
          <br />
        </p>

        <p>網站個資蒐集告知</p>
        <p>
          本會員、網站的服務是由『富爾特科技股份有限公司』（下稱本公司）所建置提供。當您進行下列服務時，即表示您願意以電子文件之方式接受告知並行使法律所賦予同意之權利。
          <br />
          ez訂網站會員為富爾特科技股份有限公司經營管理，為了確保您的個人資料、隱私及消費者權益之保護，謹依個人資料保護法第8條規定告知以下事項：
          <br />
        </p>
        <p>
          一、 蒐集目的及方式 <br />
          (一) 為您提供服務：
          如進行會員資料管理、提供各項產品訊息、物品寄送，提供優惠權益或查詢、計算、核對、提供、紀錄及決定消費者是否得享有權益服務、提供贈獎、進行內部的統計調查與分析、行銷產品、發相關活動電子報...等。{' '}
          <br />
          (二) 組織運作必要：
          如如辦理存/付/匯款、帳務/稅務管理、稽核/審計作業、金融交易及授權或其他合於營業登記項目或章程所定業務之需要等。
          <br />
        </p>
        <p>
          二、 蒐集之個人資料類別 本網站於網站內蒐集的個人資料包括： <br />
          1.C001辨識個人者：如姓名、職稱、住址、工作地址、住家電話號碼、電子郵件信箱、教育程度等。 <br />
          2.C002辨識財務者： 如信用卡或轉帳帳戶資訊。 <br />
          3.C003政府資料中之辨識者： 如身分證字號或護照號碼(外國人)。 <br />
          4.C011個人描述：如年齡、性別、出生年月日、出生地、國籍等。 <br />
          5.C021家庭情形： 如婚姻狀況、有無子女等。 <br />
          6.C036生活格調： 如使用消費品之種類及服務之細節、個人或家庭之消費模式等。 <br />
        </p>
        <p>
          三、 利用期間、地區、對象及方式 <br />
          (一)
          期間：本公司將於蒐集目的之存續期間內合理利用您的個人資料。惟因依法律規定、執行業務所必須或經您書面同意者不在此限。{' '}
          <br />
          (二) 地區：中華民國境內。 <br />
          (三) 利用對象及方式：您的個人資料蒐集除用於本網站之會員管理、客戶管理之檢索查詢等功能外，將有以下利用： <br />
          1.物品寄送：於交寄相關商品時，將您的個人資料利用於交付給相關物流、郵寄廠商用於物品寄送之目的。 <br />
          2.金融交易及授權：您所提供之財務相關資訊，將於金融交易過程(如信用卡授權、請款、退款、轉帳)時提交給金融機構以完成金融交易。{' '}
          <br />
          3.行銷：本網站將利用您的姓名、性別、出生年月日、地址、電子郵件、行動電話門號進行本網站或合作廠商商品之宣傳行銷。{' '}
          <br />
        </p>
        <p>
          四、您對個人資料之權利 <br />
          您交付本網站個人資料者，依個人資料保護法得行使以下權利，您可來電洽詢本網站客服進行申請： <br />
          (一) 查詢、請求閱覽或請求製給複製本，惟本公司依法得酌收必要成本費用，收費標準請參閱本網站之公告。 <br />
          (二) 請求補充或更正，惟本公司得要求您為適當釋明。 <br />
          (三) 請求停止蒐集、處理或利用及請求刪除。 <br />
          本網站將依據您提出可資確認之身分證明文件的申請，於三十天內回覆。若您委託他人代為申請者，請另外提出可資確認之身分證明，以備查核。若本網站未能於三十天內處理您的申請，將會將原因以書面方式告知您。您亦可在本網站之「會員中心」網頁登入您的帳號及密碼，線上即時查閱您的個人資料檔案。若您委託他人代為登入者，您將負完全的責任。如果您自行洩漏自己的個人資料、會員密碼或付款資料給予第三人使用，您應自行就第三人的行為負責。{' '}
          <br />
        </p>
        <p>
          五、若您不提供正確之個人資料予本公司，本公司將無法為您提供特定目的之相關服務。 <br />
          會員服務範圍 本公司所提供的服務範圍，包括 www.ezding.com 與
          www.ezding.com.tw網域下所有網站，以及未來所有可能衍生，屬於本網站並包括使用本網站所提供金流、物流與資訊流平台之所有網站、實體等服務。其服務內容包括但不限於商品買賣、內容瀏覽與利用電子郵件或其他方式進行商品行銷資訊之提供。本網站得依實際情形，增加、修改或是終止相關服務。
          <br />
          本網站將提供的會員服務內容包括但不限於：訂票、集購、會員電子報或任何其他將來新增之會員服務功能。若您欲修改任何會員資料或功能服務時，請至『會員中心』修改。您可透過『會員中心』查詢調閱或修改您的個人資料、查詢訂票紀錄、或查詢歸戶之票券紀錄。
        </p>
        <p>
          <p>會員帳號、密碼與安全</p>
          一、ez訂會員帳號即手機門號，必須詳實填寫，手機門號及密碼，不能重複登錄。除非經他人合法授權使用其個人資料以外，您如果提供任何錯誤或是不實的資料進行登錄，本網站有權暫停或是終止您的帳號，並拒絕您使用本服務。{' '}
          <br />
          二、您如選擇以信用卡方式購物時，必須填寫確實之信用卡資料；若發現有不實登錄或任何未經持卡人許可而盜刷其信用卡的情形時，本網站得以暫停或終止其會員資格，若違反中華民國相關法律，亦將依法追究。本網站不會留存會員在網站上登錄之信用卡號等相關資料，以保護會員之隱私及權益。{' '}
          <br />
        </p>
        <p>
          <p>會員的隱私權保障</p>
          本網站對於您所登錄或留存之個人資料，在未獲得您的同意以前，絕不對非本網站相關業務合作夥伴以外之人揭露您的姓名、手機門號、電子郵件地址及其他依法受保護之個人資料進行蒐集目的外之個人資料利用。
          <br />
          同時為提供行銷、市場分析、統計或研究、或為提供會員個人化服務或加值服務之目的，您同意本網站得記錄、保存、並利用您在本網站所留存或產生之資料及記錄，同時在不揭露各該資料之情形下，得公開或使用統計資料。
          <br />
          在下列的情況下，本網站有可能會提供您的個人資料給相關機關，或主張其權利受侵害並提示司法機關正式文件之第三人：
          <br />
          一、基於法律之規定、或受司法機關與其他有權機關基於法定程序之要求； <br />
          二、為增進公共利益；
          <br />
          三、為維護其他會員或第三人權益之重大危害； 四、為免除您生命、身體、自由或財產上之危險；
          <br />
          關於您所登錄或留存之個人資料及其他特定資料（例如交易資料），悉依本網站「隱私權政策」受到保護與規範。
          <br />
        </p>
        <p>
          <p>安全付款機制</p>
          一、信用卡線上刷卡：本網站採用與銀行相同等級的「SSL 128
          Bit安全加密機制保障」，透過網路使用線上刷卡，您的個人及信用卡資料絕不外洩。信用卡授權成功，訂票才能完成；訂購完成，本網站才會向信用卡收單機構進行請款；訂票取消，系統將主動取消授權、向銀行送出退款信息。
          <br />
          二、晶片金融卡線上刷卡：本網站提供晶片金融卡線上刷卡，使用晶片金融卡付款須使用讀卡機，確保交易安全性。扣款成功後，訂票才能完成；取消訂票，系統將主動辦理退款。
          <br />
        </p>
        <p>
          <p>配送說明</p>
          訂票序號是會員至影城取票唯一依據。完成線上選位及線上付款後，訂票才算成功，訂票成功後，系統以簡訊及e-mail發送訂票序號給予會員，會員也可在本網站［訂購紀錄］專區，登入會員後，查詢訂票序號。會員須於指定時間前，憑訂票序號至影城完成取票。每張票需支付訂票手續費20元，支付方式比照影城官網訂票規定；於線上或現場收款。
          <br />
        </p>
        <p>
          <p>網頁及Cookie之使用</p>
          1.本網站的網頁可能提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但本網站並不保護您於該連結網站中的隱私權。
          <br />
          2.當您於本網站站內或其附屬網站中瀏覽或查詢時，伺服器將自動紀錄您使用連線之
          IP位置、時間及瀏覽相關記錄。這些資料僅供作流量統計分析及網路服務優化，以便於改善服務品質，這些資料僅作為總量上的分析，不會和特定個人相連繫。
          <br />
          3.為提供您更完善的個人化服務，本網站可能會使用Cookie以紀錄及分析使用者行為，此系統能夠辨識使用者，例如依您偏好的特定種類資料執行不同動作。
          <br />
        </p>
        <p>
          <p>智慧財產權</p>
          本服務所使用之軟體或程式、網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網站畫面的安排、網頁設計，除本公司有特別約定外，皆由本公司或其他權利人依法擁有其智慧財產權，包括但不限於商標權、專利權、著作權、營業秘密與專有技術等。
          <br />
          任何人不得擅自使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。任何人欲引用或轉載前述軟體、程式或網站內容，必須依法取得本公司或其他權利人的事前書面同意。如有違反，您應對本公司負損害賠償責任（包括但不限於訴訟費用及律師費用等）。
          <br />
        </p>
        <p>
          <p>責任限制</p>
          會員使用本服務時，在使用過程中所有的資料紀錄，以本服務資料庫所記錄之資料為準。如有發生任何糾紛，雙方將以最大誠意提出各自所儲存之電子資料記錄提交於法院或公正第三人作認定。
          <br />
        </p>
        <p>
          <p>服務暫停或中止</p>
          本公司以目前一般認為合理之方式及技術，維護本服務之正常運作；
          <br />
          但在下列情況之下，本公司將有權暫停或中斷本服務之全部或一部，且對使用者任何直接或間接之損害，均不負任何賠償或補償之責任：
          <br />
          一、對本服務相關軟硬體設備進行搬遷、更換、升級、保養或維修時；
          <br /> 二、使用者有任何違反政府法令或本使用條款情形；
          <br />
          三、天災或其他不可抗力之因素所導致之服務停止或中斷；
          <br /> 四、其他不可歸責於本公司之事由所致之服務停止或中斷；
          <br />
          五、非本公司所得控制之事由而致本服務資訊顯示不正確、或遭偽造、竄改、刪除或擷取、或致系統中斷或不能正常運作時。
          <br />
          本公司針對可預知之軟硬體維護工作，有可能導致系統中斷或是暫停者，將會於該狀況發生前，以適當之方式告知會員。
        </p>
        <p>
          <p>會員身份終止與本公司通知之義務</p>
          除非您有前述提供錯誤或不實資料進行會員登錄、未經本人許可而盜刷其信用卡、逾時未取票超過一定比率、否認取票與影城查證結果不符超過三次或其他經查證屬實之不法情事，本公司得終止您的訂票權利及會員帳號。
          <br />
          在您決定取消本公司會員資格，並以電子郵件或透過本公司所提供之線上服務等方式通知本公司取消您的會員資格後，將自停止本公司會員身份之日起（以本公司電子郵件發出日期為準），喪失所有本服務所提供之優惠及權益。當您通知本公司停止會員身份時，本公司會透過會員資料登錄之電話號碼或電子郵件向您聯絡確認後，再進行註銷會員資格。
          <br />
        </p>
        <p>
          <p>隱私權保護政策修訂</p>
          本公司隱私權保護政策將因應需求隨時進行修正，以落實保障使用者隱私權之立意。修正後的條款將刊登於本網站上。
          <br />
          本條款之效力、準據法與管轄法院 本條款中，任何條款之全部或一部份無效時，不影響其他約定之效力。
          <br />
          您與本公司之權利義務關係，應依網路交易指導原則及中華民國法律定之；若發生任何爭議，以台灣台北地方法院為第一審管轄法院。本公司的任何聲明、條款如有未盡完善之處，將以最大誠意，依誠實信用、平等互惠原則，共商解決之道。
        </p>
      </div>
    ),
  },
};

export default CONSTANTS;