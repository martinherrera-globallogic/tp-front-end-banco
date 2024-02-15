import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '' , pathMatch: 'full', redirectTo : "movies" },
    { path: 'movies' , 
        loadChildren: ()=> import('./modules/movies/movies.module').then((module) => module.MoviesModule) 
    },
    { path: '**', redirectTo: 'movies'}
];
