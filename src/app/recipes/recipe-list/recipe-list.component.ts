import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model'
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelectedAux = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Chicken Tenders','This is a test','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/air-fryer-chicken-tenders-recipe2-1640195080.jpg?crop=1.00xw:0.755xh;0,0.211xh&resize=1200:*'),
    new Recipe('Puchero', 'This is another test', 'https://sibeti.com/wp-content/uploads/2021/12/receta-fa%CC%81cil-y-como-hacer-puchero-de-pollo-1.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe){
    this.recipeSelectedAux.emit(recipe);
  }
}
