import { Component, OnInit } from '@angular/core';
import { Recepie } from './recepie.model';
import { RecipieSercive } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrls: ['./recepie-list.component.css']
})
export class RecepieListComponent implements OnInit {

 
  recepies:Recepie[];
 
  constructor(private recipeservice:RecipieSercive,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipeservice.recipeChanged.subscribe(
      (recipes:Recepie[])=>{
        this.recepies=recipes;
        console.log(this.recepies);
      }
    );
    this.recepies=this.recipeservice.returnRecipie();
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});

  }
  
}
