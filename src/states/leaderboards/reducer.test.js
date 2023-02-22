/* eslint-disable no-undef */
/* test scenario

  leaderboardsReducer funtion
   1. should return the initial state when given by unkwown action
   2. should return leaderboards when given by RECEIVE_LEADERBOARDS action
*/

import leaderboardsReducer from './reducer';

describe('leaderboardsreducer function', () => {
  it('should return the initial state when given by unkwown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKWOWN' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
