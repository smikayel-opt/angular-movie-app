import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../../services/movie/movie-service.service';
import { of } from 'rxjs';
import { mockMoviesList } from '../../../services/movie/movie-service.service.spec';
import { MovieList } from '../../../interfaces/movie.interface';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    movieService = jasmine.createSpyObj('MovieService', ['getByPage', 'searchByName']);
    component = new MovieListComponent(movieService);
  });

  it('should create an instance of MovieListComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch movies on ngOnInit', () => {
      movieService.getByPage.and.returnValue(of(mockMoviesList));
      component.ngOnInit();
      expect(component.isLoading).toBeFalsy();
      expect(component.movieData).toEqual(mockMoviesList);
      expect(movieService.getByPage).toHaveBeenCalledWith(1);
    });
  });

  describe('getMovies', () => {
    it('should fetch movies on demand', () => {
      component.pageNumber = 2;
      movieService.getByPage.and.returnValue(of(mockMoviesList));
      component.getMovies();
      expect(component.movieData).toEqual(mockMoviesList);
      expect(movieService.getByPage).toHaveBeenCalledWith(2);
    });
  });

  describe('getNextPage', () => {
    it('should fetch the next page of movies', () => {
      component.movieData = mockMoviesList;
      movieService.getByPage.and.returnValue(of(mockMoviesList));
      component.getNextPage();
      expect(component.movieData).toEqual(mockMoviesList);
      expect(movieService.getByPage).toHaveBeenCalledWith(2);
    });

    it('should not fetch the next page if the last page is reached', () => {
      component.pageNumber = 2;
      component.movieData = { total_pages: 2 } as MovieList; // simulate last page
      component.getNextPage();
      expect(component.movieData).not.toEqual(mockMoviesList);
      expect(movieService.getByPage).not.toHaveBeenCalled();
    });
  });

  describe('getPreviousPage', () => {
    it('should fetch the previous page of movies', () => {
      component.pageNumber = 2;
      component.movieData = mockMoviesList;
      movieService.getByPage.and.returnValue(of(mockMoviesList));
      component.getPreviousPage();
      expect(component.movieData).toEqual(mockMoviesList);
      expect(movieService.getByPage).toHaveBeenCalledWith(1);
    });

    it('should not fetch the previous page if on the first page', () => {
      component.pageNumber = 1;
      component.getPreviousPage();
      expect(movieService.getByPage).not.toHaveBeenCalled();
    });
  });

  describe('filter', () => {
    it('should filter movies by keyword and reset page number', () => {
      movieService.searchByName.and.returnValue(of(mockMoviesList));
      component.filter('keyword', 2);
      expect(component.movieData).toEqual(mockMoviesList);
    });

    it('should reset searchKeyword and fetch movies when filter is called with an empty keyword', () => {
      component.searchKeyword = 'previousKeyword';
      movieService.getByPage.and.returnValue(of(mockMoviesList));
      component.filter('');
      expect(component.searchKeyword).toBe('');
      expect(movieService.getByPage).toHaveBeenCalledWith(1);
    });

    it('should fetch movies when filter is called with a non-empty keyword', () => {
      component.searchKeyword = 'existingKeyword';
      movieService.searchByName.and.returnValue(of(mockMoviesList));
      component.filter('newKeyword', 1);
      expect(component.movieData).toEqual(mockMoviesList);
      expect(component.pageNumber).toBe(1); // Ensure the page number is not reset
      expect(movieService.searchByName).toHaveBeenCalledWith('newKeyword', 1);
    });
  });

  describe('pagination', () => {
    it('should increment page number on getNextPage', () => {
      component.pageNumber = 1;
      movieService.getByPage.and.returnValue(of(mockMoviesList));
      component.getNextPage();
      expect(component.pageNumber).toBe(2);
      expect(movieService.getByPage).toHaveBeenCalledWith(2);
    });

    it('should decrement page number on getPreviousPage', () => {
      component.pageNumber = 2;
      movieService.getByPage.and.returnValue(of(mockMoviesList));
      component.getPreviousPage();
      expect(component.pageNumber).toBe(1);
      expect(movieService.getByPage).toHaveBeenCalledWith(1);
    });
  });
});
