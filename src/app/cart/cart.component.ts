import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/models/product.model";
import {CartService} from "../shared/services/cart.service";
import {Cart} from "../shared/models/Cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();

    this.cartService.getCartUpdates().subscribe((items) => {
      this.cartItems = items;
    });
  }

  decreaseQuantity(cartItem: Cart) {
    if (cartItem.amount > 1) {
      cartItem.amount--;
      this.cartService.updateCartItem(cartItem);
    }
  }

  increaseQuantity(cartItem: Cart) {
    cartItem.amount++;
    this.cartService.updateCartItem(cartItem);
  }

  removeProductFromCart(productId: number) {
    this.cartService.removeProduct(productId);
  }

  calculateTotalAmount(): number {
    return this.cartItems.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.amount), 0);
  }
}
