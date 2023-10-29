import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return `You voted for "${action.payload}"`;
    },
    clearNotification() {
      return '';
    },
  },
});

export const createTempNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, delay * 1000);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
