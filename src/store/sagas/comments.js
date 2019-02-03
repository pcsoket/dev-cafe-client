import {
  put, takeLatest, takeEvery, select, spawn,
} from 'redux-saga/effects';

import * as Types from '../types/comments';
import * as Actions from '../actions/comments';
import * as Selectors from '../selectors/comments';


function* loadCommentsSaga(action) {
  const state = yield select();
  const { postId } = action;
  const cache = state.pagination.commentsByPost[postId];
  if (cache) {
    yield put(Actions.loadCommentsSuccess());
  } else {
    yield put(Actions.fetchComments(postId));
  }
}

function* watchLoadComments() {
  yield takeLatest(Types.LOAD_COMMENTS, loadCommentsSaga);
}

function* checkCacheAndUpdate(action) {
  const state = yield select();
  const { commentId } = action;
  const cache = Selectors.selectCommentById(state, commentId);

  if (cache) {
    yield put(Actions.fetchUpdatedComment(commentId));
  }
}

function* watchCheckCacheAndUpdate() {
  yield takeEvery(Types.CHECK_CACHE_AND_UPDATE_COMMENT, checkCacheAndUpdate);
}

export default function* watchComments() {
  yield spawn(watchLoadComments);
  yield spawn(watchCheckCacheAndUpdate);
}
