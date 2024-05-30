import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ICategory } from '../../../../Models/ICategory';
import { CategoryService } from '../../../../Services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  id: number = 0;
  category: ICategory | any = {};
  SubForGetId: any;
  SubForGetCategort: any;
  SubForAddOrEditCategory: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public categoryService: CategoryService
  ) {}

  ProductForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.max(50),
    ]),
  });

  get getName() {
    return this.ProductForm.controls['name'];
  }

  ngOnInit(): void {
    this.SubForGetId = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        this.getName.setValue('');
      },
    });
    if (this.id != 0) {
      this.SubForGetCategort = this.categoryService.GetById(this.id).subscribe({
        next: (data) => {
          this.category = data;
          this.getName.setValue(this.category.name);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  FormHandle() {
    if (this.ProductForm.status == 'VALID') {
      this.category = this.ProductForm.value;
      this.category.isDeleted = false;

      if (this.id == 0) {
        this.SubForAddOrEditCategory = this.categoryService
          .Insert(this.category)
          .subscribe({
            next: (data) => {
              this.router.navigate(['/dashboard/categories']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      } else {
        this.category.id = this.id;
        this.SubForAddOrEditCategory = this.categoryService
          .Update(this.id, this.category)
          .subscribe({
            next: (data) => {
              this.router.navigate(['/dashboard/categories']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
    } else {
      console.log(this.ProductForm);
    }
  }

  ngOnDestroy(): void {
    if (this.SubForGetId != null) this.SubForGetId.unsubscribe();

    if (this.SubForGetCategort != null) this.SubForGetCategort.unsubscribe();

    if (this.SubForAddOrEditCategory != null)
      this.SubForAddOrEditCategory.unsubscribe();
  }
}
