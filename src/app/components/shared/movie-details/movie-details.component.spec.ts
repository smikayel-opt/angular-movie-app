import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MovieDetailsComponent } from './movie-details.component';
import { MovieService } from '../../../services/movie/movie-service.service';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let movieService: jasmine.SpyObj<MovieService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    component = new MovieDetailsComponent(activatedRoute, movieService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovie on ngOnInit', () => {
    spyOn(component, 'getMovie');
    component.ngOnInit();
    expect(component.getMovie).toHaveBeenCalled();
  });

  it('should call movieService.getById with the correct movieId', () => {
    const mockMovie = { "adult": false, "backdrop_path": "/oQ429AcD85ttxvOxAaYpETnAsW0.jpg", "genre_ids": [28, 10752], "id": 918692, "original_language": "ru", "original_title": "Гранит", "overview": "Mozambique requests from Russia is being helped in the fight against militants of the \"Islamic State\" and a special group led by a commander with the call sign Granit is coming to the country.", "popularity": 589.618, "poster_path": "/zLJn4U2qlWIzlFP5SsyFJUDQjfs.jpg", "release_date": "2021-12-29", "title": "Granit", "video": false, "vote_average": 5.8, "vote_count": 5 }
    movieService.getById.and.returnValue(of(mockMovie));

    component.getMovie(1);

    expect(movieService.getById).toHaveBeenCalledWith(1);
    expect(component.movie).toEqual(mockMovie);
  });

});
