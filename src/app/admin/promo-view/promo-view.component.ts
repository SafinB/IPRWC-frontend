import {Component, OnInit} from '@angular/core';
import {Promocode} from "../../shared/models/Promocode.model";
import {PromocodeService} from "../../shared/services/promocode.service";
import {ToastService} from "../../shared/toast/toast-services";

@Component({
  selector: 'app-promo-view',
  templateUrl: './promo-view.component.html',
  styleUrls: ['./promo-view.component.scss']
})
export class PromoViewComponent implements OnInit{

  public Promos: Promocode[] = [];

  constructor(private promocodeService: PromocodeService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.getPromos();
  }

  getPromos(): void {
    this.Promos = [];
    this.promocodeService.getAllCodes().subscribe((response) => {
      response.forEach((promos: Promocode) => {
        this.Promos = response;
      })
    })
  }

  deletePromo(id: string): void {
      this.promocodeService.deleteCode(id).subscribe(() => {
      this.getPromos();
      })
    this.toastService.show('Promo code deleted', { classname: 'bg-info text-light', delay: 1000 });
  }

  togglePromoStatus(id: string, currentStatus: boolean): void {
    const newStatus = !currentStatus;
    this.promocodeService.toggleCodeStatus(id, newStatus).subscribe(() => {
      this.getPromos();
    });
  }
}
