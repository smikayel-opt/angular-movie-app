import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie-service.service';
import { Movie, MovieList } from '../../interfaces/movie.interface';

// unfortunately you won't need all these mocks files, you can spy on any method and give it the return you want
import * as mockData from './mock-data.json';
import * as mockMovieDataByPage from './movie-data-by-page.json';
import * as mockMovieDataByMovieId from './mock-data-by-movie-id.json';


/**
 * same goes here, check Loading test file. look for how you can mock api calls and test them.
 */
describe('MovieService', () => {
  let movieService: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    movieService = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(movieService).toBeTruthy();
  });

  it('should get popular movies by page', () => {
    // in unit tests we should not hit apis directly
    const pageNumber = 1;
    const expectedUrl = `https://api.themoviedb.org/3/movie/popular?api_key=f82ecbb7a5110caecaee2bee5e4c79d6&page=${pageNumber}`;
    const mockMovieList: MovieList = mockMovieDataByPage

    movieService.getByPage(pageNumber).subscribe((result) => {
      expect(result).toEqual(mockMovieList);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMovieList);
  });

  it('should get movie by ID', () => {
    // in unit tests we should not hit apis directly
    const movieId = 123;
    const expectedUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=f82ecbb7a5110caecaee2bee5e4c79d6`;
    const mockMovie: Movie = mockMovieDataByMovieId

    movieService.getById(movieId).subscribe((result) => {
      expect(result).toEqual(mockMovie);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMovie);
  });

  it('should search movies by name', () => {
    // in unit tests we should not hit apis directly
    const query = 'Avengers';
    const expectedUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=f82ecbb7a5110caecaee2bee5e4c79d6`;
    const mockMovieList: MovieList = mockData

    movieService.searchByName(query).subscribe((result) => {
      expect(result).toEqual(mockMovieList);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMovieList);
  });
});
