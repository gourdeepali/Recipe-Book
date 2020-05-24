import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('f') slForm:NgForm;
  subscribe:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private slservice:ShoppingListService) { }

  ngOnInit(): void {
    
    this.subscribe=this.slservice.startEditing.
      subscribe(
        (index:number)=>{
          this.editMode=true;
           this.editedItemIndex=index;
          this.editedItem= this.slservice.getIngredient(index);
          this.slForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          });

        }
    );
  }

  onAddItem(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slservice.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
      this.slservice.newIngredient.emit(newIngredient); 
    }
    this.editMode=false;
    form.reset();
  }

  onClaer(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slservice.deleteIngredient(this.editedItemIndex);
    this.onClaer();
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

}
