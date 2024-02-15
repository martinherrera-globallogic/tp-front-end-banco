import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Movie, MoviesAPIResult } from '../../../types/movie';
import { idIsNotRepited } from '../../utils/format-helper';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiURL = environment.baseURL;
  private moviesSubject = new BehaviorSubject<MoviesAPIResult>(
    <MoviesAPIResult>{}
  );
  movies$ = this.moviesSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

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
        .subscribe();
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
    }
  }
}
