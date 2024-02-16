import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, tap } from 'rxjs';
import { Movie, MoviesAPIResult } from '../../../types/movie';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiURL = environment.baseURL;
  private moviesSubject = new BehaviorSubject<MoviesAPIResult>(
    <MoviesAPIResult>{}
  );
  movies$ = this.moviesSubject.asObservable();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  getMostPopularSeries(): void {
    const localStorageMovie = localStorage.getItem(environment.localStorageKey);

    if (localStorageMovie) {
      const movies = JSON.parse(localStorageMovie) as MoviesAPIResult;
      this.moviesSubject.next(movies);
    } else {
      const url = `${this.apiURL}/titles?list=most_pop_series`;
      this.httpClient
        .get<MoviesAPIResult>(url)
        .pipe(
          tap((data) => {
            localStorage.setItem(
              environment.localStorageKey,
              JSON.stringify(data)
            );
            this.moviesSubject.next(data);
          })
        )
        .subscribe({
          error: (error) => {
            console.error('Error fetching movies', error);
          },
          complete: () => {
            this.openSnackbar('Movies fetched successfully!', 'OK');
          },
        });
    }
  }

  deleteMovie(movieId: string): void {
    const localStorageMovie = localStorage.getItem(environment.localStorageKey);
    if (localStorageMovie) {
      const movies = JSON.parse(localStorageMovie) as MoviesAPIResult;
      const updatedMovies = {
        results: movies.results.filter((movie) => movie.id !== movieId),
      };
      localStorage.setItem(
        environment.localStorageKey,
        JSON.stringify(updatedMovies)
      );

      this.moviesSubject.next(updatedMovies);
      this.openSnackbar('Movie successfully deleted!', 'OK');
    }
  }

  resetMovies(): void {
    localStorage.removeItem(environment.localStorageKey);
    this.getMostPopularSeries();
  }

  updateMovieById(updatedMovie: Movie) {
    const localStorageMovie = localStorage.getItem(environment.localStorageKey);
    if (localStorageMovie) {
      const movies = JSON.parse(localStorageMovie) as MoviesAPIResult;
      const updatedMovies = {
        results: movies.results.map((movie) =>
          movie.id === updatedMovie.id ? { ...movie, ...updatedMovie } : movie
        ),
      };
      localStorage.setItem(
        environment.localStorageKey,
        JSON.stringify(updatedMovies)
      );

      this.moviesSubject.next(updatedMovies);
      this.openSnackbar('Movie successfully updated!', 'OK');
    }
  }

  createMovie(newMovie: Movie) {
    const localStorageMovie = localStorage.getItem(environment.localStorageKey);
    if (localStorageMovie) {
      const movies = JSON.parse(localStorageMovie) as MoviesAPIResult;
      const newId = Math.random().toString();
      newMovie.id = newId;
      const updatedMovies = {
        results: [...movies.results, newMovie],
      };
      localStorage.setItem(
        environment.localStorageKey,
        JSON.stringify(updatedMovies)
      );

      this.moviesSubject.next(updatedMovies);
      this.openSnackbar('Movie successfully created!', 'OK');
    }
  }

  openSnackbar(messagge: string, buttonMessage: string) {
    this.snackBar.open(messagge, buttonMessage, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
