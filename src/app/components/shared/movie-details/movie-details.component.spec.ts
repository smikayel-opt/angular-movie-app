import Spy = jasmine.Spy;

import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { mockMovieData } from '../../../services/movie/movie-service.service.spec';
import { mockMovieService } from '../../../services/movie/movie-service.service.mock';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
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

  it('should create an instance of MovieDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getMovie when ngOnInit is called', () => {
      spyOn(component, 'getMovie');
      component.ngOnInit();
      expect(component.getMovie).toHaveBeenCalled();
    });
  });

  describe('getMovie', () => {
    it('should call movieService.getById with the correct movieId', () => {
      (component.movieService.getById as Spy).and.returnValue(of(mockMovieData));

      component.getMovie(1);

      expect(component.movieService.getById).toHaveBeenCalledWith(1);
      expect(component.movie).toEqual(mockMovieData);
    });
  });
});
