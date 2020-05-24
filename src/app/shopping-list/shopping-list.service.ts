import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService{
    ingredientChanged=new Subject<Ingredient[]>();
    startEditing=new Subject<number>();

    ingredients:Ingredient[]=[
        new Ingredient('Potato',10),
        new Ingredient('Tomato',20)
    ];

    newIngredient=new EventEmitter<Ingredient>();

    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredientsToList(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }

  
    
    
    
}