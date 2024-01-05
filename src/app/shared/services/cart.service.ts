import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    addToCart(product: Product) {

    }

    removeFromCart(productID: string): void {

    }

    changeQuantity(productID: string, quantity: number): void {

    }
}
