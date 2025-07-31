import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { IProduct, IProductRes } from '../../shared/models/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Header } from '../../shared/services/header';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  priceSortDirection = signal<'asc' | 'desc' | null>(null);
  allProducts = signal<IProduct[]>([]);
  productList = computed(() => {
    const products = [...this.allProducts()];
    if (this.priceSortDirection()) {
      return products.sort((a, b) =>
        this.priceSortDirection() === 'asc'
          ? a.price - b.price
          : b.price - a.price
      );
    } else {
      return products;
    }
  });
  constructor(
    private readonly http: HttpClient,
    private readonly header: Header
  ) {
    this.getProductDetail();
    this.header.heading.set('Product Page');
  }

  private getProductDetail() {
    this.http.get<IProductRes>('/products').subscribe({
      next: (res) => {
        console.log('res---->', res);
        this.allProducts.set(res.products);
      },
    });
  }
  sortByPrice() {
    if (!this.priceSortDirection()) {
      this.priceSortDirection.set('asc');
    } else if (this.priceSortDirection() === 'asc') {
      this.priceSortDirection.set('desc');
    } else {
      this.priceSortDirection.set(null);
    }
  }
}
