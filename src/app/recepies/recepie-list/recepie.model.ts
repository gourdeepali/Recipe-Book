import { Ingredient } from 'src/app/shared/ingredient.model';



export class Recepie{
   public name:string;
   public description:string;
   public imgPath:string;
   public ingredients:Ingredient[];

   constructor(name:string, description:string,imgPath:string,ingredient:Ingredient[]){
       this.name=name;
       this.description=description;
       this.imgPath=imgPath;
       this.ingredients=ingredient;
   }

}