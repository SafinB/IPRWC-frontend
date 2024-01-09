import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {ToastService} from "../../../shared/toast/toast-services";
import {Router} from "@angular/router";
import {PromocodeService} from "../../../shared/services/promocode.service";

@Component({
  selector: 'app-promo-create',
  templateUrl: './promo-create.component.html',
  styleUrls: ['./promo-create.component.scss']
})
export class PromoCreateComponent implements OnInit{

  createPromoForm = new FormGroup({
    code: new FormControl(null, Validators.required),
    discount: new FormControl(null, Validators.required),
  })

  constructor(private promoService: PromocodeService,
              private toastService: ToastService,
              private router: Router) { }

  ngOnInit(): void {
  }


  createProduct() {
    this.toastService.show('We zijn bezig met het maken van een product', {
      classname: 'bg-info text-light', delay: 500
    });

    let promo = {
      code: this.createPromoForm.value["code"],
      discount: this.createPromoForm.value["discount"],
    }
    this.promoService.postCode(promo).subscribe({
          next: () => {
            this.createPromoForm.reset();
            setTimeout(() => {
              this.router.navigate(['/promocode-view']);
              this.toastService.show('Promo met succes aangemaakt', {classname: 'bg-success text-light', delay: 3000});
            }, 1000);
          },
          error: (message) => {
            this.toastService.show(message, {classname: 'bg-danger text-light', delay: 3000});
          }
        }
    )};


}
