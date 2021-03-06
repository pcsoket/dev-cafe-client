import React from 'react';
import { Link } from 'react-router-dom';

import withPostContainer, { postPropInfo } from '../../containers/PostContainer';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import withLastVisitedCategoryId, { lastVisitedCategoryIdPropType } from '../../containers/WithLastVisitedCategoryId';
import { connectComponent } from '../../utils';

import Category from '../categories/Category';
import User from '../users/User';
import DeletePost from './DeletePost';
import ContentsViewer from '../contents/Viewer';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import './PostView.scss';

const renderCategory = category => (
  <span>카테고리 : {category.name}<br/></span>
);
const renderUser = user => (
  <span>작성자 : {user.profileName}</span>
);

const PostView = (props) => {
  const { post, myInfo, lastVisitedCategoryId } = props;

  if (!post) {
    return (<p>글이 없어!</p>);
  }

  const isMyPost = (post.author === myInfo._id);

  return (
    <div className="PostView">
      <article className="post">
        <header>
          <h1 className="title">{post.title}</h1>
          <Category categoryId={post.category} renderCategory={renderCategory}/>
          <User userId={post.author} renderUser={renderUser}/>
        </header>
        <section className="post-content">
          {post.contents
            ? <ContentsViewer contents={post.contents}/>
            : <LoadingSpinner/>
          }
        </section>
      </article>
      <div className="post-button-group">
        {isMyPost
        && <>
          <DeletePost postId={post._id} categoryId={lastVisitedCategoryId}/>
            <Link to={`/edit/${post._id}`}>
              <button type="button">
                수정
              </button>
            </Link>
        </>}
        <Link to={`/posts?category=${lastVisitedCategoryId}`}>
          <button type="button">
            목록
          </button>
        </Link>
      </div>


    </div>
  );
};

PostView.propTypes = {
  myInfo: myInfoPropType.type,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.type,
  post: postPropInfo.type,
};

PostView.defaultProps = {
  myInfo: myInfoPropType.default,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.default,
  post: postPropInfo.default,
};

export default connectComponent(PostView,
  [
    withMyInfo,
    withLastVisitedCategoryId,
    withPostContainer,
  ]);
