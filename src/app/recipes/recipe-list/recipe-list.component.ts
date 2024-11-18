import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model'
import {RecipeService} from '../recipe.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
subcription : Subscription
recipes: Recipe[];

constructor(private recipeService: RecipeService,
            private router:Router,
            private route:ActivatedRoute){

}
ngOnInit(){
  this.subcription = this.recipeService.recipesChanged.subscribe(
    (recipes:Recipe[])=>{
      this.recipes = recipes;
    }
  );
  this.recipes = this.recipeService.getRecipes();
}
onSelectRecipe() {
  this.router.navigate(['new'],{relativeTo:this.route});
  }
ngOnDestroy(): void {
  this.subcription.unsubscribe();
}
}
