import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [
    { name: 'Product 1', price: 10, description: 'Description of product 1' },
    { name: 'Product 2', price: 20, description: 'Description of product 2' },
    { name: 'Product 3', price: 30, description: 'Description of product 3' },
  ];
}
