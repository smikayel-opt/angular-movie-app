import { MovieService } from './movie-service.service';

/**
 * returns mock Movies Service
 */
export function mockMovieService(): MovieService {
  return {
    API_URL: 'https://api.themoviedb.org/3',
    API_KEY: 'f82ecbb7a5110caecaee2bee5e4c79d6',

    http: jasmine.createSpyObj('HttpClient', ['get']),

    getByPage: jasmine.createSpy('getByPage'),
    getById: jasmine.createSpy('getById'),
    searchByName: jasmine.createSpy('searchByName'),
  };
}
