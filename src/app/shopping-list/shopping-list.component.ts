import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[];
  private idChange:Subscription;

 
  constructor(private slservice:ShoppingListService) { }
  
  ngOnInit() {
    this.slservice.newIngredient.subscribe(
      (newIngredient:Ingredient)=>{
        this.slservice.addIngredient(newIngredient);
      }
    );
    this.ingredients=this.slservice.getIngredients();
    this.idChange=this.slservice.ingredientChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
  }

  

  onEditItem(index:number){
    this.slservice.startEditing.next(index);    
  }

  ngOnDestroy(): void {
    this.idChange.unsubscribe();
  }

  
  
}
