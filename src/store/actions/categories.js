import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  REMOVE_CATEGORY,
  UPDATE_LAST_VISITED_CATEGORY,
} from '../types/categories';

import { CALL_API } from '../sagas/apiSaga';
import Schemas from '../utils/schema';

export const fetchCategories = (refreshCache = false) => ({
  type: CALL_API,
  types: [GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE],
  endpoint: '/categories',
  method: 'get',
  refreshCache,
  schema: Schemas.CATEGORY_ARRAY,
});

export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
});

export const loadCategoriesSuccess = () => ({
  type: LOAD_CATEGORIES_SUCCESS,
});

export const getCategory = id => ({
  type: CALL_API,
  types: [GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE],
  endpoint: `/categories/${id}`,
  method: 'get',
  categoryId: id,
  schema: Schemas.CATEGORY,
});

export const removeCategory = id => ({
  type: REMOVE_CATEGORY,
  payload: id,
});

export const updateLastVisitedCategory = categoryId => ({
  type: UPDATE_LAST_VISITED_CATEGORY,
  categoryId,
});
