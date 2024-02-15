import { Movie } from './movie';

export interface EditCreateDialogData {
  action: Action;
  movie?: Movie;
}

export enum Action {
  EDIT = 'edit',
  CREATE = 'create',
}

export interface FormData {
  imageUrl: string;
  rankPosition: number;
  releaseDate: string;
  title: string;
}
