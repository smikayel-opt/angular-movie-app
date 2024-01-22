import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../../services/movie/movie-service.service';


describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    component = new MovieListComponent(movieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
