import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieList } from '../../interfaces/movie.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL = 'https://api.themoviedb.org/3'
  private API_KEY = 'f82ecbb7a5110caecaee2bee5e4c79d6'

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param pageNumber 
   */
  getByPage(pageNumber: number): Observable<MovieList> {
    const query = `/movie/popular?api_key=${this.API_KEY}`
    return this.http.get<MovieList>(this.API_URL + query + `&page=${pageNumber}`)
  }

  /**
   * 
   * @param id 
   */
  getById(id: number) {
    return this.http.get<Movie>(this.API_URL + '/movie/' + id + `?api_key=${this.API_KEY}`)
  }

  /**
   * 
   * @param query 
   * @param page 
   */
  searchByName(query: string, page?: number) {
    const params = page ? `/search/movie?query=${query}&page=${page}` : `/search/movie?query=${query}`
    return this.http.get<MovieList>(this.API_URL + params + `&api_key=${this.API_KEY}`)
  }
}
