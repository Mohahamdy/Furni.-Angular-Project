import { ProductService } from './../../Services/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { IProduct } from '../../Models/IProduct';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [DataViewModule, TagModule, CommonModule, ButtonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.GetAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  all() {
    this.productService.GetAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fur() {
    this.productService.GetByCategory('Furniture').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  acc() {
    this.productService.GetByCategory('Accessories').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  li() {
    this.productService.GetByCategory('Lighting').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
