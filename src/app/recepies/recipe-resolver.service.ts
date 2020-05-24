import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { DataStorageService } from '../shared/data-storag.service';
import { Recepie } from './recepie-list/recepie.model';
import { RecipieSercive } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recepie[]>{

    constructor(private dataService:DataStorageService,
        private recipeservice:RecipieSercive){}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        const recipes=this.recipeservice.returnRecipie();
        if(recipes.length===0){
            return this.dataService.fetchdata();

        }
        else{
            return recipes;
        }
       
    }

}