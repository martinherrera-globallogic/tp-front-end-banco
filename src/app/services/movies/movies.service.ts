import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, tap } from 'rxjs';
import { Movie, MoviesAPIResult } from '../../../types/movie';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiURL = environment.baseURL;
  private moviesSubject = new BehaviorSubject<MoviesAPIResult>(
    <MoviesAPIResult>{}
  );
  movies$ = this.moviesSubject.asObservable();
  private initialMovieData!: MoviesAPIResult;

  constructor(
    private httpClient: HttpClient,
    private snackBarService: SnackbarService
  ) {}

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
            localStorage.setItem(
              environment.localStorageKeyInitialData,
              JSON.stringify(data)
            );
            this.initialMovieData = data;
            this.moviesSubject.next(data);
          })
        )
        .subscribe({
          error: (error) => {
            this.snackBarService.openSnackbar(
              'Something went wrong while fetching movies, please try again',
              'OK'
            );
            console.error('Error fetching movies', error);
          },
          complete: () => {
            this.snackBarService.openSnackbar(
              'Movies fetched successfully!',
              'OK'
            );
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
      this.snackBarService.openSnackbar('Movie successfully deleted!', 'OK');
    }
  }

  resetMovies(): void {
    const initialData = localStorage.getItem(
      environment.localStorageKeyInitialData
    );
    if (initialData) {
      localStorage.setItem(environment.localStorageKey, initialData);
      this.moviesSubject.next(JSON.parse(initialData));

      this.snackBarService.openSnackbar(
        'Movies successfully restores to initial data!',
        'OK'
      );
    } else {
      this.getMostPopularSeries();
    }
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
      this.snackBarService.openSnackbar('Movie successfully updated!', 'OK');
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
      this.snackBarService.openSnackbar('Movie successfully created!', 'OK');
    }
  }
}
