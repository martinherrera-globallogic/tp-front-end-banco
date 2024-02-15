import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Movie, MoviesAPIResult } from '../../../types/movie';
import { MoviesService } from '../../services/movies/movies.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movies!: Movie[];
  moviesSuscription: Subscription = Subscription.EMPTY;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getMostPopularSeries();

    this.moviesSuscription = this.movieService.movies$.subscribe((movies) => {
      this.movies = movies.results;
    });
  }
}
