import { HttpClient } from '@angular/common/http';
import { MovieService } from './movie-service.service';
import { of as observableOf } from 'rxjs';
import Spy = jasmine.Spy;

import { Movie, MovieList } from '../../interfaces/movie.interface';


fdescribe('MovieService', () => {
  let service: MovieService;

  // creating a mock for http service.
  const mockHttp = {
    get: jasmine.createSpy('spy'), // spying on the needed methods.
  } as unknown as HttpClient;

  beforeEach(() => {
    service = new MovieService(
      mockHttp,
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // we create a describe for each method
  describe('getByPage', () => {
    it('should call get method from http and get the movies data from its API', () => {
      const mockMoviesList: MovieList = {
        page: 1,
        results: [{ title: 'any movie title', overview: 'any overview' }] as Movie[],
        total_pages: 2,
        total_results: 5,
      };

      (service.http.get as Spy).and.returnValue(observableOf(mockMoviesList)); // we give any value we want rather than calling the API itself.

      service.getByPage(1).subscribe((moviesList: MovieList) => {
        expect(moviesList.results[0].title).toEqual('any movie title');
        expect(moviesList.results[0].overview).toEqual('any overview');
      });
    });
  });
});
