import { Injectable } from '@angular/core';
import { Product } from "../models/product.model";
import { Cart } from "../models/Cart";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cart: Cart[] = [];
    private cartSubject = new Subject<Cart[]>();

    constructor() {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
            this.cartSubject.next([...this.cart]);
        }
    }

    getCartItems() {
        return this.cart;
    }

    addToCart(product: Product, amount: number) {
        const existingItem = this.cart.find((item) => item.product === product);

        if (existingItem) {
            existingItem.amount += amount;
        } else {
            this.cart.push({ product, amount });
        }

        this.updateSessionStorage();
    }

    removeProduct(productId: number) {
        const index = this.cart.findIndex((item) => item.product.id === productId);

        if (index !== -1) {
            this.cart.splice(index, 1);
            this.cartSubject.next([...this.cart]);

            this.updateSessionStorage();
        }
    }

    updateCartItem(updatedCartItem: Cart) {
        const index = this.cart.findIndex((item) => item.product.id === updatedCartItem.product.id);

        if (index !== -1) {
            this.cart[index] = updatedCartItem;
            this.cartSubject.next([...this.cart]);

            this.updateSessionStorage();
        }
    }

    removeAllProducts() {
        this.cart = [];
        this.cartSubject.next([...this.cart]);

        this.updateSessionStorage();
    }

    getCartUpdates() {
        return this.cartSubject.asObservable();
    }

    private updateSessionStorage() {
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }
}
