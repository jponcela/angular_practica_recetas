import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];


    //private recipes: Recipe[] = [
    //    new Recipe(
    //        'Chicken Tenders',
    //        'This is a test',
    //        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/air-fryer-chicken-tenders-recipe2-1640195080.jpg?crop=1.00xw:0.755xh;0,0.211xh&resize=1200:*',
    //        [
    //            new Ingredient('Pata de pollo',5),
    //            new Ingredient('Huevo',2),
    //            new Ingredient('Pan rallado',10),

    //        ]),
    //    new Recipe(
    //        'Puchero', 
    //        'This is another test', 
    //        'https://sibeti.com/wp-content/uploads/2021/12/receta-fa%CC%81cil-y-como-hacer-puchero-de-pollo-1.jpg',
    //        [
    //            new Ingredient('Osobuco',4),
    //            new Ingredient('Papa',2),
    //            new Ingredient('Zanahoria',3),
    //        ])
    //  ];

    constructor(private shoppingListService: ShoppingListService){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeSelected.next(this.recipes.slice());
      }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.onIngredientsAdded(ingredients);
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeSelected.next(this.recipes.slice());
    }
    
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeSelected.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeSelected.next(this.recipes.slice());
    }
}