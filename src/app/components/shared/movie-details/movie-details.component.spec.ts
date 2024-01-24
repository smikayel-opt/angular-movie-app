import Spy = jasmine.Spy;

import { MovieDetailsComponent } from './movie-details.component';
import { MovieService } from '../../../services/movie/movie-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { mockMovieData } from '../../../services/movie/movie-service.service.spec';
import { mockMovieService } from '../../../services/movie/movie-service.service.mock';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let movieService: jasmine.SpyObj<MovieService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    activatedRoute = {
      paramMap: of({
        get: (param: string) => '1' // Simulate the route param 'id'
      })
    } as ActivatedRoute;

    component = new MovieDetailsComponent(
      activatedRoute,
      mockMovieService(),
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovie when ngOnInit is called', () => {
    spyOn(component, 'getMovie');
    component.ngOnInit();
    expect(component.getMovie).toHaveBeenCalled();
  });

  it('should call movieService.getById with the correct movieId', () => {
    (component.movieService.getById as Spy).and.returnValue(of(mockMovieData));

    component.getMovie(1);

    expect(component.movieService.getById).toHaveBeenCalledWith(1);
    expect(component.movie).toEqual(mockMovieData);
  });

  it('should set the movie property when getMovie is called', () => {
    (component.movieService.getById as Spy).and.returnValue(of(mockMovieData));

    component.getMovie(1);

    expect(component.movie).toEqual(mockMovieData);
  });

});
