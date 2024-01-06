import {Product} from "./product.model";

export class Cart {

    public product: Product;
    public amount: number;

    constructor(product: Product, amount: number) {
        this.product = product;
        this.amount = amount;
    }
}
