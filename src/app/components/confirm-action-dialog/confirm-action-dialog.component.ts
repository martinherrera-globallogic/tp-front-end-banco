import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  Action,
  EditCreateDialogData,
} from '../../../types/edit-create-dialog-data';
import { Movie } from '../../../types/movie';
import { MoviesService } from '../../services/movies/movies.service';

@Component({
  selector: 'app-confirm-action-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-action-dialog.component.html',
  styleUrl: './confirm-action-dialog.component.scss',
})
export class ConfirmActionDialogComponent {
  actionType: Action;
  movie: Movie | undefined | null;
  isDelete: boolean = false;
  title: string = 'Are you sure you want to reset all movies?';

  constructor(
    @Inject(MAT_DIALOG_DATA) movieData: EditCreateDialogData,
    private dialogRef: MatDialogRef<ConfirmActionDialogComponent>,
    private movieService: MoviesService
  ) {
    this.actionType = movieData.action;
    this.movie = movieData.movie;
    if (this.actionType === Action.DELETE) {
      this.isDelete = true;
      this.title = `Are you sure you want to delete the movie "${movieData.movie?.originalTitleText.text}"? `;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  cofirmActionDialog() {
    if (this.isDelete) {
      this.movieService.deleteMovie(this.movie!.id);
    } else {
      this.movieService.resetMovies();
    }
    this.closeDialog();
  }

  cancelActionDialog() {
    this.closeDialog();
  }
}
