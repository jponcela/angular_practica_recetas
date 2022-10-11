import { Ingredient } from "../shared/ingredient.model";
import { Tag } from "./tag.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public tags: Tag[];

    constructor(name:string, desc:string, imagePath:string, ingredients: Ingredient[],tags:Tag[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingredients = ingredients;
        this.tags=tags;
    }
}