import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Recipe } from './recipe.model';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  //private recipes : Recipe[];
  private recipes: Recipe[] = [
    new Recipe(
      'Spaghetti Bolognese',
      'Nudel mit Hack',
      'https://media.istockphoto.com/id/1366012275/de/foto/gesunde-vegane-bolognese-spaghetti.jpg?s=2048x2048&w=is&k=20&c=w-a5NFIQV7fLXgXpmr-DB8e6f8qpXN12dOQop0LOoKA=',
      [
        new Ingredient('Tomaten', 5),
        new Ingredient('Nudeln', 200),
        new Ingredient('Gesichtes Rinder Hack', 100),
      ]
    ),
    new Recipe(
      'kartoffelsuppe',
      'Kartoffel mit soße',
      'https://media.istockphoto.com/id/1454076621/de/foto/sahnesuppe-serviert-mit-ger%C3%B6stetem-brot-food-fotografie-nahaufnahme.jpg?s=2048x2048&w=is&k=20&c=uRSHo3g5y4Tyv923MyZSRyVgvFZndV3sVYd6r0i5QC4=',
      [new Ingredient('kartoffeln', 5), new Ingredient('lauch', 200)]
    ),
    new Recipe(
      'Schnitzel mit Spätzle',
      'Klassiker der Deutschen Wirtshäuser',
      'https://media.istockphoto.com/id/1309699780/de/foto/ein-teller-mitschnitzel.jpg?s=2048x2048&w=is&k=20&c=CcGKBcGsk7HainLpcp9GQQ8dO5ZCRktrivpPWkt1iGE=',
      [
        new Ingredient('schnitzel', 2),
        new Ingredient('spätzle', 100),
        new Ingredient('Rahmsoße', 1),
      ]
    ),
  ];
  

  constructor(private slService: ShoppingService) {}

  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientArray(ingredients);
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  addRecipe(recipe : Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(recipe:Recipe, index : number){
      this.recipes[index] = recipe;
      this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index :number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
