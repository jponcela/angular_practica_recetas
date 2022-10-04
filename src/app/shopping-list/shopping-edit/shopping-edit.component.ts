import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  sub: Subscription;
  editMode = false;
  editItemIndex : number;
  editedIngredient: Ingredient;
  @ViewChild('f') slForm: NgForm;
  //@ViewChild('nameInput') nameInputRef: ElementRef;
  //@ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.shoppingListService.editing.subscribe(
      (index:number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedIngredient.name,
          amount:this.editedIngredient.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAdd(form: NgForm){
    const value= form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    //const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex,newIngredient)
    }else{
      this.shoppingListService.onIngredientAdded(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

}
