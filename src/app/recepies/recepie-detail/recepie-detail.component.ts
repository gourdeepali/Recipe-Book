import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Recepie } from '../recepie-list/recepie.model';
import { RecipieSercive } from '../recipe.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-recepie-detail',
  templateUrl: './recepie-detail.component.html',
  styleUrls: ['./recepie-detail.component.css']
})

export class RecepieDetailComponent implements OnInit {
 recipe:Recepie;
 id:number;

  constructor(private recipieService:RecipieSercive,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recipe=this.recipieService.getRecipe(this.id);
      }
    );
  }

  addIngredients(){
    this.recipieService.addToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipieService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
