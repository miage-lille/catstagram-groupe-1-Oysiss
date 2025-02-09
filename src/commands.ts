import { Cmd } from 'redux-loop';
import { FetchCatsRequest, } from './types/actions.type';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { Picture } from './types/picture.type';

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => {
      return fetch(action.path, {
        method: action.method,
      })
        .then(checkStatus)
        .then(response => response.json())
        .then(parsePictures);
    },
    {
      successActionCreator: fetchCatsCommit, // (equals to (payload) => fetchCatsCommit(payload))
      failActionCreator: fetchCatsRollback, // (equals to (error) => fetchCatsRollback(error))
    },
  );

const checkStatus = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};

const parsePictures = (data: any): Promise<Picture[]> => {
  return new Promise((resolve, reject) => {
    try {
      const pictures: Picture[] = data.hits.map((hit: any) => ({
        previewFormat: hit.previewURL,
        webFormat: hit.webformatURL,
        largeFormat: hit.largeImageURL,
        author: hit.user
      }));
      resolve(pictures);
    } catch (error) {
      reject(error);
    }
  });
};