import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../Models/IProduct';
import { ProductService } from '../../../../Services/product.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-items',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    TagModule,
    RouterLink,
    DialogModule,
    CardModule,
  ],
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.css',
})
export class ProductItemsComponent implements OnInit {
  products: IProduct[] = [];
  product?: IProduct;
  visible: boolean = false;
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

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't delete this item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.productService.Delete(id).subscribe({
          next: (data) => {
            this.products = this.products.filter((p) => p.id != id);
          },
          error: (error) => {
            console.log(error);
          },
        });
        await Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted.',
          icon: 'success',
        });
      }
    });
  }
  Display(id: number) {
    this.product = this.products.find((p) => p.id == id);
    this.visible = true;
  }
}
