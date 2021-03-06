import React from 'react';
import dateFormat from 'dateformat';

import withComment, { commentPropInfo } from '../../containers/WithComment';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import { connectComponent } from '../../utils';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import ChildCommentList from './ChildCommentList';
import WriteComment from './WriteComment';
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';
import { Comment } from './Comment';
import ContentsViewer from '../contents/Viewer';

import User from '../users/User';

import './CommentListItem.scss';

const renderUser = user => user.profileName;

const renderComment = comment => (
  <article className="comment">
    작성자 : <User userId={comment.author} renderUser={renderUser}/><br/>
    <ContentsViewer contents={comment.contents}/>
    작성 시간 : {dateFormat(comment.date, 'yy/mm/dd h:MM TT')}<br/>
  </article>
);

class CommentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      addReply: false,
    };
  }

  onAddReply = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ ...prevState, addReply: !prevState.addReply }));
  }

  onEdit = () => {
    this.setState(prevState => ({ ...prevState, isEditing: !prevState.isEditing }));
  }

  render() {
    const { addReply, isEditing } = this.state;
    const { comment, myInfo } = this.props;

    const isMyComment = (comment.author === myInfo._id);
    const { isFetchingNewChildComment } = comment;

    return (
      <li key={comment._id} className="CommentListItem">
        {isEditing
          ? <EditComment commentId={comment._id} offEditMode={this.onEdit}/>
          : <Comment comment={comment} renderComment={renderComment}/>
        }
        <div className="comment-button-group">
          { isMyComment
          && <>
            <button type="button" onClick={this.onEdit}>
              {isEditing ? '취소' : '수정'}
            </button>
            <DeleteComment commentId={comment._id}/>
          </> }
          {comment.isChild || <button type="button" onClick={this.onAddReply}>
          답글
          </button>
          }
        </div>
        <ChildCommentList childCommentIds={comment.childComments}/>
        {isFetchingNewChildComment && <LoadingSpinner center/> }
        {!addReply || <div className="addReply">
          <WriteComment
            postId={comment.post}
            parent={comment._id}
            autofocus
          />
        </div>
        }
      </li>
    );
  }
}

CommentListItem.propTypes = {
  myInfo: myInfoPropType.type,
  comment: commentPropInfo.type.isRequired,
};

CommentListItem.defaultProps = {
  myInfo: myInfoPropType.default,
};

export default connectComponent(CommentListItem,
  [
    withMyInfo,
    withComment,
  ]);
