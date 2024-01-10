import {Component, EventEmitter, Output} from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {

    public products: Product[] = [];

    constructor(private productService: ProductService,
                private router: Router) { }

    ngOnInit(): void {
        this.getProducts();
    }

    onProductUpdateClick(id: string): void {
        this.productService.setProductID(id);
        this.router.navigate(['/admin/product-update', id]);
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
