import { Component } from '@angular/core';
import { Movie } from '../../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie/movie-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  movie?: Movie;

  constructor (
    public route: ActivatedRoute,
    public movieService: MovieService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const movieId = Number(params.get('id'));
      this.getMovie(movieId)
    });
  }

  /**
   * 
   * @param id 
   */
  getMovie(id: number): void {
    this.movieService.getById(id).subscribe((movie) => {
      this.movie = movie;
    });
  }

}
