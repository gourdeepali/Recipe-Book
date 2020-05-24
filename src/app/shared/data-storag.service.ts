import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipieSercive } from '../recepies/recipe.service';
import { Recepie } from '../recepies/recepie-list/recepie.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient,private recipeservice:RecipieSercive,
        private authservice:AuthService){}

    storeRecipes(){
        const recipes=this.recipeservice.returnRecipie();
        this.http.put('https://recipe-book-af2f5.firebaseio.com/recipe.json',recipes)
        .subscribe(
            response=>{
                console.log(response);
            }
        );
    }

    fetchdata() {
        
            return this.http.get<Recepie[]>(
              'https://recipe-book-af2f5.firebaseio.com/recipe.json',
            ).pipe(
              map(recipes => {
                return recipes.map(recipe => {
                  return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                  };
                });
              }),
              tap(recipes => {
                this.recipeservice.setRecipes(recipes);
              } )
            );
      }

}

