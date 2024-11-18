import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import{ Ingredient} from '../../shared/ingredient.model';
import{ ShoppingService} from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: '../shopping-edit/shopping-edit.component.html',
  styleUrl: '../shopping-edit/shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  @ViewChild('f') slForm : NgForm;
  subcription:Subscription;
  editedItemIndex : number;
  editedItem: Ingredient;

constructor(private slService: ShoppingService){}

ngOnInit(){
  this.subcription = this.slService.startedEditing
  .subscribe(
  (index:number) => {
    this.editedItemIndex = index;
    this.editMode = true;
    this.editedItem = this.slService.getIngredient(index);
    this.slForm.setValue({
      name: this.editedItem.name,
      amount: this.editedItem.amount,
    })
  }
  );
}

onAddIngredient(form : NgForm){
  const value = form.value;
  const addedIngredient = new Ingredient(value.name,value.amount);
 if(this.editMode){
  this.slService.updateIngredient(this.editedItemIndex, addedIngredient);
 }else{
  this.slService.addIngredient(addedIngredient);
}
this.editMode = false;
form.reset();  
}
onDelete(){
  this.slService.deleteIngredient(this.editedItemIndex);
  this.onClear
}
onClear(){
  this.slForm.reset();
  this.editMode = false;
}

ngOnDestroy(): void {
    this.subcription.unsubscribe
  }
}
