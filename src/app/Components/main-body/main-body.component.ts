import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { IProduct } from '../../Models/IProduct';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-body.component.html',
  styleUrl: './main-body.component.css',
})
export class MainBodyComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  SubForProds: any;

  constructor(public productService: ProductService) {}
  ngOnInit(): void {
    this.SubForProds = this.productService.GetPaging(5, 3).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.SubForProds != null) this.SubForProds.unsubscribe();
  }
}
