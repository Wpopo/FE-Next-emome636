import Immutable from 'immutable';
import { setGaragePlayMovieInfo } from 'Actions/movie/movieActions';
import { handleActions } from 'redux-actions';

// 預設初始狀態
const initState = Immutable.fromJS({
  garagePlayMovieInfo: {},
});
const MovieReducer = handleActions(
  {
    [setGaragePlayMovieInfo]: (state, { payload }) => state.set('garagePlayMovieInfo', payload),
  },
  initState,
);

export default MovieReducer;
