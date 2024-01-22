import { Component, SimpleChanges, OnInit, OnChanges } from '@angular/core';

import { Movie, MovieList } from '../../../interfaces/movie.interface';
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
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  movieData?: MovieList;
  pageNumber: number = 1;
  searchPageNumber: number = 1;
  isLoading: boolean = true;
  searchKeyword: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies()
  }

  /**
   * 
   */
  getMovies(): void {
    this.isLoading = true
    this.movieService.getByPage(this.pageNumber).subscribe((movieData: MovieList) => { // type for movieData
      this.movieData = movieData;
      this.isLoading = false
    });
  }

  /**
   * 
   */
  getNextPage(): void {
    if (this.movieData && this.pageNumber >= this.movieData?.total_pages) return
    this.pageNumber += 1
    if (this.searchKeyword) {
      this.filter(this.searchKeyword, this.pageNumber)
      return
    }
    this.getMovies()
  }

  /**
   * 
   */
  getPreviousPage(): void {
    if (this.pageNumber == 1) return // to stop realoading of the content 
    this.pageNumber = this.pageNumber - 1
    if (this.searchKeyword) {
      this.filter(this.searchKeyword, this.pageNumber)
      return
    }
    this.getMovies()
  }

  /**
   * 
   * @param searchKeyword 
   * @param page 
   */
  filter(searchKeyword: string, page?: number): void {
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
    this.movieService.searchByName(searchKeyword, page).subscribe((movieData: MovieList) => {
      this.movieData = movieData;
      this.isLoading = false
    });
  }
}
