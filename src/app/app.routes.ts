import { Routes } from '@angular/router';
import { MovieListComponent } from './components/shared/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/shared/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: ':id', component: MovieDetailsComponent },
];
