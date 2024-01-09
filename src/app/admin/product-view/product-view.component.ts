import { Component } from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {

    public products: Product[] = [];

    constructor(private productService: ProductService,
                ) { }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(): void {
        this.products = [];
        this.productService.getAll().subscribe((response) => {
            response.forEach((product: Product) => {
                this.products = response;
            })
        })
    }

    deleteProduct(id: number): void {
        this.productService.deleteProduct(id).subscribe(() => {
            this.getProducts();
        })
    }
}
