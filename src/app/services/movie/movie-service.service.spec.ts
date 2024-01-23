

import { HttpClient } from '@angular/common/http';
import { MovieService } from './movie-service.service';
import { of as observableOf, throwError } from 'rxjs';
import Spy = jasmine.Spy;

import { Movie, MovieList } from '../../interfaces/movie.interface';


export const mockMoviesList: MovieList = {
  page: 1,
  results: [{ "adult": false, "backdrop_path": "/rDsT0UnHiA3HGJvb0TacQbdsdfv.jpg", "genre_ids": [28], "id": 109088, "original_language": "zh", "original_title": "方世玉與胡惠乾", "overview": "any overview", "popularity": 5.025, "poster_path": "/yXl2BPZHsmhuUgl8hUic430UsNd.jpg", "release_date": "1976-06-18", "title": "The Shaolin Avengers", "video": false, "vote_average": 6.0, "vote_count": 12 }] as Movie[],
  total_pages: 2,
  total_results: 5,
};

export const mockMovieData: Movie = { "adult": false, "backdrop_path": "/rDsT0UnHiA3HGJvb0TacQbdsdfv.jpg", "genre_ids": [28], "id": 109088, "original_language": "zh", "original_title": "方世玉與胡惠乾", "overview": "any overview", "popularity": 5.025, "poster_path": "/yXl2BPZHsmhuUgl8hUic430UsNd.jpg", "release_date": "1976-06-18", "title": "The Shaolin Avengers", "video": false, "vote_average": 6.0, "vote_count": 12 }


describe('MovieService', () => {
  let service: MovieService;
  let mockHttp: HttpClient;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['get']);
    service = new MovieService(mockHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getByPage', () => {
    it('should get movies by page', () => {
      (mockHttp.get as Spy).and.returnValue(observableOf(mockMoviesList));

      service.getByPage(1).subscribe((moviesList: MovieList) => {
        expect(moviesList.results[0].title).toEqual('The Shaolin Avengers');
        expect(moviesList.results[0].overview).toEqual('any overview');
      });
    });

    it('should handle errors when getting movies by page', () => {
      const errorMessage = 'Error fetching movies by page';
      (mockHttp.get as Spy).and.returnValue(throwError(errorMessage));

      service.getByPage(1).subscribe(
        () => fail('Should have thrown an error'),
        (error) => expect(error).toEqual(errorMessage)
      );
    });
  });

  describe('getById', () => {
    it('should get movie by ID', () => {
      (mockHttp.get as Spy).and.returnValue(observableOf(mockMovieData));

      service.getById(109088).subscribe((movie: Movie) => {
        expect(movie.title).toEqual('The Shaolin Avengers');
        expect(movie.overview).toEqual('any overview');
      });
    });

    it('should handle errors when getting movie by ID', () => {
      const errorMessage = 'Error fetching movie by ID';
      (mockHttp.get as Spy).and.returnValue(throwError(errorMessage));

      service.getById(109088).subscribe(
        () => fail('Should have thrown an error'),
        (error) => expect(error).toEqual(errorMessage)
      );
    });
  });

  describe('searchByName', () => {
    it('should search movies by name', () => {
      (mockHttp.get as Spy).and.returnValue(observableOf(mockMoviesList));

      service.searchByName('The Shaolin Avengers').subscribe((moviesList: MovieList) => {
        expect(moviesList.results[0].title).toEqual('The Shaolin Avengers');
      });
    });

    it('should handle errors when searching movies by name', () => {
      const errorMessage = 'Error searching for movies by name';
      (mockHttp.get as Spy).and.returnValue(throwError(errorMessage));

      service.searchByName('The Shaolin Avengers').subscribe(
        () => fail('Should have thrown an error'),
        (error) => expect(error).toEqual(errorMessage)
      );
    });

    it('should handle optional page parameter when searching movies by name', () => {
      (mockHttp.get as Spy).and.returnValue(observableOf(mockMoviesList));

      service.searchByName('The Shaolin Avengers', 1).subscribe((moviesList: MovieList) => {
        expect(moviesList.results[0].title).toEqual('The Shaolin Avengers');
      });
    });
  });

});

