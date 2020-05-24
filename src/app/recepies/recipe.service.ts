import { Recepie } from './recepie-list/recepie.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';



@Injectable()
export class RecipieSercive{
    recipeChanged=new Subject<Recepie[]>();
    // recepies:Recepie[]=[
    //     new Recepie('Poha',
    //     'Dish of MP',
    //     'https://cdn1.foodviva.com/static-content/food-images/breakfast-recipes/poha-recipe/poha-recipe.jpg',
    //     [
    //         new Ingredient('poha', 1),
    //         new Ingredient('spices', 10),
    //         new Ingredient('cheer chilli', 5)         
    //     ]),
    //     new Recepie('Burger',
    //     'What else u need to say !!',
    //     'http://cdn29.us1.fansshare.com/pictures/friedfood/jalapeno-bturkery-bburger-burgers-96329245.jpg',
    //     [
    //         new Ingredient('buns',1),
    //         new Ingredient('soces',2)
    //     ])       
    //   ];

    recepies:Recepie[]=[];


    constructor(private slservice:ShoppingListService){}

      returnRecipie(){
          return this.recepies.slice();
          //slice hepls us to send a coplete duplucate of resepies array so that any changes made in the 
          //array does not change the original array..
      }

      setRecipes(recipes:Recepie[]){
        this.recepies=recipes;
        this.recipeChanged.next(this.recepies.slice());
      }

      getRecipe(index:number){
          return this.recepies[index];

      }
      
      addToShoppingList(ingredients:Ingredient[]){
          this.slservice.addIngredientsToList(ingredients);
      }

      addRecipe(recipe:Recepie){
          this.recepies.push(recipe);
          this.recipeChanged.next(this.recepies.slice());
      }

      updateRecipe(index:number,newRecipe:Recepie){
          this.recepies[index]=newRecipe;
          this.recipeChanged.next(this.recepies.slice());
      }

      deleteRecipe(index:number){
          this.recepies.splice(index,1);
          this.recipeChanged.next(this.recepies.slice());
      }

}