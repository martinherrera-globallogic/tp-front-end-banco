import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Movie } from '../../../types/movie';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DateFormatPipePipe } from '../../pipes/date-format-pipe.pipe';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieEditCreateDialogComponent } from '../movie-edit-create-dialog/movie-edit-create-dialog.component';
import { MoviesService } from '../../services/movies/movies.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginator,
    DateFormatPipePipe,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnChanges {
  @Input() movieList: Movie[];
  tableDisplayedColumns: string[] = [
    'id',
    'title',
    'position',
    'image',
    'release date',
    'actions',
  ];
  tableSource: MatTableDataSource<Movie, MatPaginator>;

  constructor(
    private matDialog: MatDialog,
    private movieService: MoviesService
  ) {
    this.movieList = <Movie[]>[];
    this.tableSource = new MatTableDataSource();
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    const movieListChange = simpleChange['movieList'];
    if (
      movieListChange &&
      movieListChange.currentValue &&
      movieListChange.currentValue.length > 0
    ) {
      this.tableSource.data = movieListChange.currentValue;
    }
  }

  openCreateOrEditDialog(action: string, movie?: Movie) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      action: action,
      movie: movie ?? null,
    };

    this.matDialog.open(MovieEditCreateDialogComponent, dialogConfig);
  }

  openDeleteDialog(movie: Movie) {
    this.movieService.deleteMovie(movie.id);
  }

  resetMovies() {
    this.movieService.resetMovies();
  }
}
