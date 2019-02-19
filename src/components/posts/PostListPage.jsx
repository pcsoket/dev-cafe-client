import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const getCategoryId = (query) => {
  const categoryId = query.slice(query.indexOf('=') + 1);
  return categoryId;
};

const PostListPage = (props) => {
  const { location } = props;
  const { search: query } = location;
  const categoryId = getCategoryId(query);

  return (
    <div className="PostListPage">
      <button type="button">
        <Link to={`/write/${categoryId}`}>글쓰기</Link>
      </button>
      <PostList categoryId={categoryId}/>
    </div>
  );
};

PostListPage.propTypes = {
  location: ReactRouterPropTypes.history.isRequired,
};

export default PostListPage;
