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
        if (this.authService.userNotLoggedIn()){
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
                        text: "Je word nu doorgestuurd naar de login pagina",
                        icon: "success"
                    }).then(() => {
                        this.router.navigate(['/login']);
                    });
                }
            });        } else {
            this.cartService.addToCart(product);
            this.toastService.show('Product added to cart', {classname: 'bg-success text-light', delay: 5000});
        }
    }
}
