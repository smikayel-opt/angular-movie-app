import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../../services/movie/movie-service.service';
import { of } from 'rxjs';
import { mockMoviesList } from '../../../services/movie/movie-service.service.spec';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    movieService = jasmine.createSpyObj('MovieService', ['getByPage', 'searchByName']);
    component = new MovieListComponent(movieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on ngOnInit', () => {
    movieService.getByPage.and.returnValue(of(mockMoviesList));
    component.ngOnInit();
    expect(component.isLoading).toBeFalsy();
    expect(component.movieData).toEqual(mockMoviesList);
    expect(movieService.getByPage).toHaveBeenCalledWith(1);
  });

  it('should fetch movies on demand', () => {
    component.pageNumber = 2;
    movieService.getByPage.and.returnValue(of(mockMoviesList));
    component.getMovies();
    expect(component.movieData).toEqual(mockMoviesList);
    expect(movieService.getByPage).toHaveBeenCalledWith(2);
  });

  it('should fetch the next page of movies', () => {
    component.movieData = mockMoviesList;
    movieService.getByPage.and.returnValue(of(mockMoviesList));
    component.getNextPage();
    expect(component.movieData).toEqual(mockMoviesList);
    expect(movieService.getByPage).toHaveBeenCalledWith(2);
  });

  it('should fetch the previous page of movies', () => {
    component.pageNumber = 2;
    component.movieData = mockMoviesList;
    movieService.getByPage.and.returnValue(of(mockMoviesList));
    component.getPreviousPage();
    expect(component.movieData).toEqual(mockMoviesList);
    expect(movieService.getByPage).toHaveBeenCalledWith(1);
  });

  it('should filter movies by keyword', () => {
    movieService.searchByName.and.returnValue(of(mockMoviesList));
    component.filter('keyword', 2);
    expect(component.movieData).toEqual(mockMoviesList);
    expect(movieService.searchByName).toHaveBeenCalledWith('keyword', 2);
  });

});
