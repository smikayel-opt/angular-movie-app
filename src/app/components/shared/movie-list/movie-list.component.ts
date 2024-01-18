import { Component, SimpleChanges } from '@angular/core';
import { MovieList } from '../../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie/movie-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../loading/loading.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, LoadingComponent, MovieCardComponent, SearchBarComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  movieData?: MovieList;
  pageNumber: number = 1;
  isLoading: boolean = true;
  searchKeyword: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies()
  }

  getMovies() {
    this.isLoading = true

    if (this.searchKeyword) {
      this.filter(this.searchKeyword, this.pageNumber)
    } else {
      this.movieService.getByPage(this.pageNumber).subscribe((movieData) => {
        this.movieData = movieData;
        this.isLoading = false
      });
    }
  }

  getNextPage() {
    if (this.movieData && this.pageNumber >= this.movieData?.total_pages) return
    this.pageNumber += 1
    this.getMovies()
  }

  getPreviusPage() {
    if (this.pageNumber == 1) return // to stop realoading of the content 
    this.pageNumber = Math.max(1, this.pageNumber - 1);
    this.getMovies()
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  filter(searchKeyword: string, page?: number) {
    this.isLoading = true
    this.searchKeyword = searchKeyword

    if (!page) {
      this.pageNumber = 1
    }
    if (!searchKeyword) {
      this.pageNumber = 1
      this.getMovies()
      return
    }
    this.movieService.searchByName(searchKeyword, page).subscribe((movieData) => {
      this.movieData = movieData;
      this.isLoading = false
    });
  }
}
