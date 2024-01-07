import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/models/product.model";
import {CartService} from "../shared/services/cart.service";
import {Cart} from "../shared/models/Cart";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ToastService} from "../shared/toast/toast-services";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(private cartService: CartService,
              private router: Router,
              private toastService: ToastService) {}

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
    } else {
      Swal.fire({
        title: "Je hebt maar 1 product in je winkelmandje",
        text: "Weet je zeker dat je dit product wilt verwijderen?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ja, verwijder dit product",
      }).then((result) => {
        if (result.isConfirmed) {
            this.cartService.removeProduct(cartItem.product.id);
          Swal.fire({
            text: "Het product succesvol verwijderd",
            icon: "success"
          }).then(() => {
            this.router.navigate(['/cart']);
          });
        }
      });
    }
  }

  increaseQuantity(cartItem: Cart) {
    cartItem.amount++;
    this.cartService.updateCartItem(cartItem);
  }

  removeProductFromCart(productId: number) {
    this.cartService.removeProduct(productId);
    this.toastService.show('Product succesvol verwijderd uit je winkelmandje', {classname: 'bg-info text-light', delay: 2000});
  }

  removeAllProductsFromCart() {
    if (this.cartItems.length === 0) {
      this.toastService.show('Er zijn geen producten om te verwijderen', {classname: 'bg-danger text-light', delay: 2000});
    } else{
      this.cartService.removeAllProducts();
      this.toastService.show('Alle producten succesvol verwijderd uit je winkelmandje', {classname: 'bg-info text-light', delay: 2000});
    }
  }

  calculateTotalAmount(): number {
    return this.cartItems.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.amount), 0);
  }
}
