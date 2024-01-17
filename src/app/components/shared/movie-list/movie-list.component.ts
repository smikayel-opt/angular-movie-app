import { Component, SimpleChanges } from '@angular/core';
import { MovieList } from '../../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie/movie-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../loading/loading.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, LoadingComponent, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  movieData?: MovieList;
  pageNumber: number = 1;
  isLoading:boolean = true;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies()
  }

  getMovies() {
    this.isLoading = true
    this.movieService.getByPage(this.pageNumber).subscribe((movieData) => {
      this.movieData = movieData;
      this.isLoading = false
    });
  }

  getNextPage() {
    this.pageNumber += 1 
    this.getMovies()
  }

  getPreviusPage() {
    if (this.pageNumber == 1) return // to stop realoading of the content 
    this.pageNumber = Math.max(1, this.pageNumber - 1);
    this.getMovies()
  }

}
