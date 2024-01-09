import {Component, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../../shared/services/product.service";
import { Router} from "@angular/router";
import { ToastService } from "../../../shared/toast/toast-services";
import {Product} from "../../../shared/models/product.model";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent {

  @Input() productId!: number;
  product$!: Product;

  updateProductForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });

  constructor(
      public productService: ProductService,
      private toastService: ToastService,
      private router: Router) {}

  ngOnInit(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.updateProductForm.patchValue({
          name: product.name,
          price: product.price,
          description: product.description
        });
      });
    }
  }

  updateProduct(): void {
    if (this.updateProductForm !== null && this.updateProductForm !== undefined) {
      const id: string = this.productService.productID;

      const name: string = this.updateProductForm.value["name"] ?? '';
      const price: number = this.updateProductForm.value["price"] ?? '';
      const description: string = this.updateProductForm.value["description"] ?? '';

      this.productService.updateProductData(name, price, description, id).subscribe(() => {
        setTimeout(() => {
          this.router.navigate(['/product-view']);
          this.toastService.show('Product met succes bijgewerkt', {classname: 'bg-success text-light', delay: 3000});
        }, 1000);
        if (this.updateProductForm !== null) {
          this.updateProductForm.reset();
        }
      });
    }
  }
}
