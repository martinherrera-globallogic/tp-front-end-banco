import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Action,
  EditCreateDialogData,
  FormData,
} from '../../../types/edit-create-dialog-data';
import { Movie } from '../../../types/movie';
import { CapitalizePipePipe } from '../../pipes/capitalize-pipe.pipe';
import { MoviesService } from '../../services/movies/movies.service';
import { convertDateStringToObject } from '../../utils/format-helper';

@Component({
  selector: 'app-movie-edit-create-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    CapitalizePipePipe,
  ],
  templateUrl: './movie-edit-create-dialog.component.html',
  styleUrl: './movie-edit-create-dialog.component.scss',
})
export class MovieEditCreateDialogComponent implements OnInit {
  actionType: Action;
  movie: Movie | undefined | null;
  editOrCreateMovieForm!: FormGroup;

  validationError = {
    title: [
      {
        type: 'required',
        message: 'Title is required.',
      },
      {
        type: 'minlength',
        message: 'Title must be at least two characters',
      },
    ],
    rankPosition: [
      {
        type: 'required',
        message: 'Rank position is required.',
      },
      {
        type: 'minlength',
        message: 'Rank position must be at least one character',
      },
      {
        type: 'pattern',
        message: 'Rank position must be only numbers',
      },
    ],
    imageUrl: [
      {
        type: 'required',
        message: 'Image URL is required.',
      },
    ],
    releaseDate: [
      {
        type: 'required',
        message: 'Release date is required.',
      },
    ],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) movieData: EditCreateDialogData,
    private dialogRef: MatDialogRef<MovieEditCreateDialogComponent>,
    private formBuilder: FormBuilder,
    private moviesService: MoviesService
  ) {
    this.actionType = movieData.action;
    this.movie = movieData.movie;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    if (this.actionType === Action.CREATE) {
      this.editOrCreateMovieForm = this.formBuilder.group({
        title: new FormControl(
          '',
          Validators.compose([Validators.minLength(2), Validators.required])
        ),
        rankPosition: new FormControl(
          '',
          Validators.compose([
            Validators.minLength(1),
            Validators.required,
            Validators.pattern('[0-9]+'),
          ])
        ),
        imageUrl: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        releaseDate: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
      });
    } else if (this.actionType === Action.EDIT) {
      let formattedDate = new Date(
        `${this.movie!.releaseDate.year}-${this.movie!.releaseDate.month}-${
          this.movie!.releaseDate.day
        }`
      )
        .toISOString()
        .split('T')[0];
      this.editOrCreateMovieForm = this.formBuilder.group({
        title: new FormControl(
          this.movie?.originalTitleText.text,
          Validators.compose([Validators.minLength(2), Validators.required])
        ),
        rankPosition: new FormControl(
          this.movie?.position,
          Validators.compose([
            Validators.minLength(1),
            Validators.required,
            Validators.pattern('[0-9]+'),
          ])
        ),
        imageUrl: new FormControl(
          this.movie?.primaryImage.url,
          Validators.compose([Validators.required])
        ),
        releaseDate: new FormControl(
          formattedDate,
          Validators.compose([Validators.required])
        ),
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirmActionDialog(formValue: FormData) {
    let updatedMovie = <Movie>{
      id: '',
      originalTitleText: {
        text: formValue.title,
      },
      position: formValue.rankPosition,
      primaryImage: {
        url: formValue.imageUrl,
      },
      releaseDate: convertDateStringToObject(formValue.releaseDate),
    };

    if (this.actionType === Action.CREATE) {
      this.moviesService.createMovie(updatedMovie);
    } else if (this.actionType === Action.EDIT) {
      updatedMovie.id = this.movie!.id;
      this.moviesService.updateMovieById(updatedMovie);
    }
    this.closeDialog();
  }

  cancelActionDialog() {
    this.closeDialog();
  }
}
