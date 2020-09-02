import Immutable from 'immutable';
import { setRecordList, setIsApply } from 'Actions/member/memberActions';
import { handleActions } from 'redux-actions';

// 預設初始狀態
const initState = Immutable.fromJS({
  // 會員訂票清單及明細
  // [[isFetch, 未開演List], [isFetch, 已開演List]]
  recordList: [
    // 未開演 config
    [false, []],
    // 已開演 config
    [false, []],
  ],
});
const MemberReducer = handleActions(
  {
    // 設定 會員訂票清單及明細
    // type:0 -> 未開演
    // type:1 -> 已開演
    [setRecordList]: (state, { payload }) =>
      state.setIn(['recordList', payload.type, 0], true).setIn(['recordList', payload.type, 1], payload.data),

    [setIsApply]: (state, { payload }) => state.set('isApply', payload),
  },
  initState,
);

export default MemberReducer;
