export const selectPosts = state => state.entities.posts;

export const selectPostById = (state, id) => selectPosts(state)[id];

// eslint-disable-next-line max-len
export const selectPostsMetaByCategory = (state, categoryId) => state.pagination.postsByCategory[categoryId];

export const selectEditingPostById = (state, postId) => state.editing.posts[postId];
