import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../../../store/store';

// Action types
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_USERS = 'SET_USERS';

// Action creators
export const setError = (error: boolean) => ({
  type: SET_ERROR,
  payload: error,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setUsers = (users: {}) => ({
  type: SET_USERS,
  payload: users,
});

export const fetchUsers = (): ThunkAction<void, RootState, null, AnyAction> => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        'https://split-bill-e6dd6-default-rtdb.firebaseio.com/split.json'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
      if (data && Object.keys(data).length > 0) {
        dispatch(setUsers(data));
      }
    } catch (e) {
      console.error(e);
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
