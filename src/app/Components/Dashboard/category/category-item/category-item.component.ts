import { CategoryService } from './../../../../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ICategory } from '../../../../Models/ICategory';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    TagModule,
    RouterLink,
    TagModule,
  ],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css',
})
export class CategoryItemComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(public categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.GetAll().subscribe({
      next: (data) => {
        this.categories = data;
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
        this.categoryService.Delete(id).subscribe({
          next: (data) => {
            this.categories = this.categories.filter((c) => c.id != id);
          },
          error: (error) => {
            console.log(error);
          },
        });
        await Swal.fire({
          title: 'Deleted!',
          text: 'Category has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
