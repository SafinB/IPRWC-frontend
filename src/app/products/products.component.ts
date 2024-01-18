import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/models/product.model";
import {ProductService} from "../shared/services/product.service";
import {CartService} from "../shared/services/cart.service";
import {AuthService} from "../shared/services/auth.Service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ToastService} from "../shared/toast/toast-services";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private authService: AuthService,
              private router: Router,
              private toastService: ToastService) {}

  ngOnInit() {
    this.loadCards();
  }

    loadCards()  {
      this.productService.getAll()
          .subscribe(
              products => {
                  this.products = products;
                  },
              error => {
                  this.toastService.show(error, {classname: 'bg-danger text-light', delay: 2000});
              }
            );
    }

    addToCart(product: Product) {
        if (!this.authService.userLoggedIn()) {
            Swal.fire({
                title: "Je bent niet ingelogd",
                text: "Log in om dit product toe te voegen aan je winkelmandje",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ffc107",
                cancelButtonColor: "#911414",
                confirmButtonText: "Login",
                cancelButtonText: "Annuleren"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        text: "Je wordt nu doorgestuurd naar de login pagina",
                        icon: "success",
                        confirmButtonColor: "#ffc107",
                    }).then(() => {
                        this.router.navigate(['/login']);
                    });
                }
            });
        } else {
            this.cartService.addToCart(product, 1);
            Swal.fire({
                title: "Je hebt dit product toegevoegd aan je winkelmandje",
                text: "Wil je verder winkelen of naar je winkelmandje gaan?",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#ffc107",
                cancelButtonColor: "#911414",
                confirmButtonText: "Winkelmandje",
                cancelButtonText: "Verder winkelen"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        text: "Je wordt nu doorgestuurd naar je winkelmandje",
                        icon: "success",
                        confirmButtonColor: "#ffc107",
                    }).then(() => {
                        this.router.navigate(['/cart']);
                    });
                }
            });
        }
    }

}
