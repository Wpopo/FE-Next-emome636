export const itemList = [
  { name: '訂票問題', id: 'groupA' },
  { name: '取票問題', id: 'groupB' },
  { name: '取消訂票、退票、退款問題', id: 'groupC' },
  { name: '會員問題', id: 'groupD' },
  { name: '電子發票問題', id: 'groupE' },
];

export const faqContents = {
  groupA: [
    {
      que: '如何訂票？',
      ans: (
        <div>
          <div className="part">
            <div className="section">
              開啟影城通網站→點選首頁「快速訂票」或點選「電影時刻」列表頁選擇電影→選擇影城／場次→選擇對應的人數／座位→選擇付款方式→輸入訂購人資料→完成訂票。
            </div>
          </div>
        </div>
      ),
    },
    {
      que: '訂票如何付款？',
      ans: (
        <div>
          <div className="part">
            <div className="section">
              <span className="bold">不可以。</span>
            </div>
            <div className="section">
              完成訂票後，無法更改訂票數量／座位／場次等資料，
              <span className="bold">若需更改，請先取消該筆訂票再重新訂購。</span>
            </div>
            <div className="section">
              取消訂票方式：開啟影城通網站→點選首頁「會員中心」人像圖示→會員登入→於會員中心「訂票紀錄」找到欲取消之訂單，點選『取消訂票』，系統跳出『取消成功』提示，即完成訂單取消。
            </div>
          </div>
          <div className="part">
            <div className="section">
              <span className="bold">各影城取消／退票允許時間：</span>
            </div>
            <ul>
              <li>
                <span className="bold">威秀影城：</span>
                開演前2小時前可線上取消訂票，開演前30分鐘至2小時前內，需親至影城現場櫃檯辦理退票。
              </li>
              <li>
                <span className="bold">美麗華大直、新光影城：</span>
                開演前40分鐘前，可於線上或影城現場櫃檯辦理取消訂票。
              </li>
              <li>
                <span className="bold">
                  華威、喜樂時代、喜滿客、哈拉、in89、真善美、梅花、新民生、樂聲、屏東中影影城：
                </span>
                開演前30分鐘前，可於線上或影城現場櫃檯辦理取消訂票。
              </li>
              <li>
                <span className="bold">凱擘影城：</span>
                開演前20分鐘前，可於線上或影城現場櫃檯辦理取消訂票。
              </li>
            </ul>
          </div>
          <div className="part">
            <div className="section">
              <span className="bold">各影城取消／退票允許時間：</span>
            </div>
            <ol>
              <li>
                <span className="bold">威秀影城：</span>
                開演前2小時前可線上取消訂票，開演前30分鐘至2小時前內，需親至影城現場櫃檯辦理退票。
              </li>
              <li>
                <span className="bold">美麗華大直、新光影城：</span>
                開演前40分鐘前，可於線上或影城現場櫃檯辦理取消訂票。
              </li>
              <li>
                <span className="bold">
                  華威、喜樂時代、喜滿客、哈拉、in89、真善美、梅花、新民生、樂聲、屏東中影影城：
                </span>
                開演前30分鐘前，可於線上或影城現場櫃檯辦理取消訂票。
              </li>
              <li>
                <span className="bold">凱擘影城：</span>
                開演前20分鐘前，可於線上或影城現場櫃檯辦理取消訂票。
              </li>
            </ol>
          </div>
          <div className="part">
            <div className="notice">
              請注意：若影城規定之時限內未完成退票或逾時未取票，將不退還該筆交易金額，恕不得要求退款或更改其他場次時間。
            </div>
          </div>
        </div>
      ),
    },
  ],
  groupB: [
    {
      que: 'BBB-1',
      ans: <div>BBB-1</div>,
    },
    {
      que: 'BBB-2',
      ans: <div>BBB-2</div>,
    },
  ],
  groupC: [
    {
      que: 'CCC-1',
      ans: <div>CCC-1</div>,
    },
    {
      que: 'CCC-2',
      ans: <div>CCC-2</div>,
    },
  ],
  groupD: [
    {
      que: 'DDD-1',
      ans: <div>DDD-1</div>,
    },
    {
      que: 'DDD-2',
      ans: <div>DDD-2</div>,
    },
  ],
  groupE: [
    {
      que: 'EEE-1',
      ans: <div>EEE-1</div>,
    },
    {
      que: 'EEE-2',
      ans: <div>EEE-2</div>,
    },
  ],
};
