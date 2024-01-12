import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ToastService} from "../../../shared/toast/toast-services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit{

  createProductForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required, this.priceValidator()]),
    description: new FormControl(null, Validators.required),
  })

  constructor(private productService: ProductService,
              private toastService: ToastService,
              private router: Router) { }

  ngOnInit(): void {}

  createProduct() {
    this.toastService.show('We zijn bezig met het maken van een product', {
      classname: 'bg-info text-light', delay: 500
    });

    let product = {
      name: this.createProductForm.value["name"],
      price: this.createProductForm.value["price"],
      description: this.createProductForm.value["description"],
    }
    this.productService.createProduct(product).subscribe({
        next: () => {
          this.createProductForm.reset();
          setTimeout(() => {
            this.router.navigate(['/admin/product-view']);
            this.toastService.show('Product met succes aangemaakt', {classname: 'bg-success text-light', delay: 2000});
          }, 1000);
        },
        error: (message) => {
          this.toastService.show(message, {classname: 'bg-danger text-light', delay: 2000});
        }
      }
    )};

    priceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^\d+(\.\d{1,2})?$/;

      if (control.value && !pattern.test(control.value.toString())) {
        return { invalidPrice: true };
      }
      return null;
    };
  }
}
