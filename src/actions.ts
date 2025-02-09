import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (counter: number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=48746885-fd96823bbb8c65ee1de97290a&per_page=${counter}&q=cat`,
});

export const fetchCatsCommit = (payload: Picture[]): FetchCatsCommit => ({
  type: 'FETCH_CATS_COMMIT',
  payload
});

export const fetchCatsRollback = (error: string): FetchCatsRollback => ({
  type: 'FETCH_CATS_ROLLBACK',
  error
});