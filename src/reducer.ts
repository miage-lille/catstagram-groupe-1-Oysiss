import { Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import { none, Option, some } from 'fp-ts/lib/Option';
import { cmdFetch } from './commands';
import { fetchCatsRequest } from './actions';
import { ApiResponse } from './types/api.type';

const MINIMUM_NUMBER_OF_PICTURES = 3;

export type State = {
  counter: number;
  pictures: ApiResponse;
  pictureSelected: Option<Picture>;
};

export const defaultState: State = {
  counter: MINIMUM_NUMBER_OF_PICTURES,
  pictures: { status: 'success', data: [] },
  pictureSelected: none,
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      if (state.counter >= 50) return state;
      const addCounter = state.counter + 1;
      return loop(
        { ...state, counter: addCounter },
        cmdFetch(fetchCatsRequest(addCounter))
      );
    case 'DECREMENT':
      if (state.counter <= MINIMUM_NUMBER_OF_PICTURES) return state;
      const decCounter = state.counter - 1;
      return loop(
        { ...state, counter: decCounter },
        cmdFetch(fetchCatsRequest(decCounter))
      );
    case 'SELECT_PICTURE':
      console.log('SELECT_PICTURE payload:', action.picture);
      return { ...state, pictureSelected: some(action.picture) };
    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: none };
    case 'FETCH_CATS_REQUEST':
      return loop(state, cmdFetch(action))
    case 'FETCH_CATS_COMMIT':
      return { ...state, pictures: { status: 'success', data: action.payload as Picture[] } };
    case 'FETCH_CATS_ROLLBACK':
      console.error(action.error);
      return { ...state, pictures: { status: 'failure', error: action.error } };
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const selectedPictureSelector = (state: State) => {
  return state.pictureSelected;
};

export default compose(liftState, reducer);
