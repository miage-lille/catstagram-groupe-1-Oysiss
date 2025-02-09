import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import data from './fake-datas.json';

export type State = {
  counter: number
  pictures: Picture[]
};

const INIT_PICTURE_NUMBER = 3;

export const defaultState = {
  counter: INIT_PICTURE_NUMBER,
  pictures: [data[0], data[1], data[2]]
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      if (state.counter >= data.length) return state;
      const addCounter = state.counter + 1;
      console.log(state.pictures);
      return { ...state, counter: addCounter, pictures: [...state.pictures,data[addCounter-1]] };
    case 'DECREMENT':
      if (state.counter <= 3) return state;
      const decCounter = state.counter - 1;
      return { ...state, counter: decCounter, pictures: data.slice(0, decCounter) as Picture[] };
    case 'SELECT_PICTURE':
      throw 'Not Implemented';
    case 'CLOSE_MODAL':
      throw 'Not Implemented';
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  throw 'Not Implemented';
};

export default compose(liftState, reducer);
