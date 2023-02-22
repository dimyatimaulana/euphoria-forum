/* eslint-disable no-undef */
/* test scenario

 asyncAddThread function
 1. should dispatch action correctly when data fetching success
 2. should dispatch action and call alert when data fetching failed

*/

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncAddThread, addThreadActionCreator } from './action';

const fakeThread = {
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
};

const fakeErrorResponse = new Error('something went wrong');

describe('asyncAddThread function', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeThread);

    const dispatch = jest.fn();

    // action
    await asyncAddThread(fakeThread.title, fakeThread.body, fakeThread.category)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when data fetching failed', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();

    window.alert = jest.fn();

    // action
    await asyncAddThread(fakeThread.title, fakeThread.body, fakeThread.category)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
