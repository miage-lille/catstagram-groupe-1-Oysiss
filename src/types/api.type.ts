import { Picture } from "./picture.type";

export type Success = {
  status: 'success';
  data: Picture[];
};

export type Loading = {
  status: 'loading';
};

export type Failure = {
  status: 'failure';
  error: string;
};

export type ApiResponse = Success | Loading | Failure;
