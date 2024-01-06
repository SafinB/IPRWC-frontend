import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../shared/models/product.model";
import {ProductService} from "../shared/services/product.service";
import {CartService} from "../shared/services/cart.service";
import {ToastService} from "../shared/toast/toast-services";
import {AuthService} from "../shared/services/auth.Service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private toastService: ToastService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.loadCards();
  }

    loadCards()  {
      this.productService.getAll()
          .subscribe(
              products => {
                  this.products = products;
                  console.log(this.products);
                  },
              error => {
                  console.error('Error fetching teams:', error);
              }
            );
    }

    addToCart(product: Product) {
        if (this.authService.userLoggedIn() === false) {
            Swal.fire({
                title: "Je bent niet ingelogd",
                text: "Log in om dit product toe te voegen aan je winkelmandje",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        text: "Je wordt nu doorgestuurd naar de login pagina",
                        icon: "success"
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
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Winkelmandje",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        text: "Je wordt nu doorgestuurd naar je winkelmandje",
                        icon: "success"
                    }).then(() => {
                        this.router.navigate(['/cart']);
                    });
                }
            });
        }
    }

}
