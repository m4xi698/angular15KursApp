import { Injectable} from '@angular/core';
import{Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
ingredientsChanged = new Subject<Ingredient[]>();
startedEditing = new Subject<number>();
private ingredients : Ingredient[] = [
new Ingredient('Nudel', 20),
new Ingredient('Tomate', 4),
];


  getIngredients(){
    return this.ingredients.slice();
  }
  getIngredient(index : number){
    return this.ingredients[index];
  }
  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredientArray(ingredients : Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index:number , newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}