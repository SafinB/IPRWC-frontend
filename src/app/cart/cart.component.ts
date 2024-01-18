import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../shared/services/cart.service";
import {Cart} from "../shared/models/Cart";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ToastService} from "../shared/toast/toast-services";
import {PromocodeService} from "../shared/services/promocode.service";
import {Promocode} from "../shared/models/Promocode.model";
import * as sweetalert2 from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  promoCodeText: string = '';
  appliedPromoCode: Promocode | null = null;
  @Input() promoID!: string;
  promoCodes: Promocode[] = [];
  currentDiscountPercentage: number = 0;

  constructor(private cartService: CartService,
              private router: Router,
              private toastService: ToastService,
              private promocodeService: PromocodeService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();

    this.cartService.getCartUpdates().subscribe((items) => {
      this.cartItems = items;
    });
    this.loadPromoCodes();
  }

  loadPromoCodes() {
    this.promocodeService.getAllCodes().subscribe(
        (promos) => {
          this.promoCodes = promos;
        },
        (error) => {
          this.toastService.show(error, {classname: 'bg-danger text-light', delay: 2000});
        }
    );
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
        confirmButtonColor: "#ffc107",
        cancelButtonColor: "#911414",
        confirmButtonText: "Ja, verwijder dit product",
      }).then((result) => {
        if (result.isConfirmed) {
            this.cartService.removeProduct(cartItem.product.id);
          Swal.fire({
            text: "Het product succesvol verwijderd",
            icon: "success",
            confirmButtonColor: "#ffc107",
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

  calculateTotalAmount(): number {
    const discountedAmount = this.currentDiscountPercentage
        ? this.currentDiscountPercentage / 100 * this.cartItems.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.amount), 0)
        : 0;

    return this.cartItems.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.amount), 0) - discountedAmount;
  }

  applyPromoCode(): void {
    if (this.promoCodeText.trim() !== '') {
      const enteredPromoCode = this.promoCodeText;

      const foundPromoCode = this.promoCodes.find(promo => promo.code === enteredPromoCode);

      if (foundPromoCode) {
        if (foundPromoCode.active) {
          const discountPercentage = foundPromoCode.discount;
          this.currentDiscountPercentage = discountPercentage;
          this.appliedPromoCode = foundPromoCode;

          this.toastService.show(`Promotiecode toegepast! Korting: ${discountPercentage}%`, { classname: 'bg-success text-light', delay: 2000 });
        } else {
          this.toastService.show(`De promotiecode ${this.promoCodeText} is niet actief`, { classname: 'bg-danger text-light', delay: 2000 });
        }
      } else {
        this.toastService.show('Ongeldige promotiecode', { classname: 'bg-danger text-light', delay: 2000 });
      }
    } else {
      this.toastService.show('Voer een promotiecode in', { classname: 'bg-warning text-light', delay: 2000 });
    }
  }

  makeOrder(): void {
    if (this.cartItems.length > 0) {
      sweetalert2.default.fire({
        title: 'Bestelling plaatsen',
        text: 'Weet je zeker dat je de bestelling wilt plaatsen?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc107',
        confirmButtonText: 'Ja, plaats bestelling',
        cancelButtonText: 'Annuleer',
        cancelButtonColor: '#911414'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text: "Je bestelling is geplaatst",
            icon: "success",
            confirmButtonColor: "#ffc107",
          }).then(() => {
            this.cartService.removeAllProducts();
            this.cancelPromo();
          });
        }});
      } else {
      sweetalert2.default.fire({
        title: 'Winkelmandje is leeg',
        text: 'Voeg producten toe aan je winkelmandje om een bestelling te plaatsen',
        icon: 'warning',
        confirmButtonText: 'Duidelijk',
        confirmButtonColor: '#ffc107'
      });
    }
  }

  cancelPromo() : void {
    this.appliedPromoCode = null;
    this.currentDiscountPercentage = 0;
    this.toastService.show('Promotiecode geannuleerd', { classname: 'bg-info text-light', delay: 2000 });
    this.promoCodeText = '';
  }
}
