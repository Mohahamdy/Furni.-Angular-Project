import { FileUploadModule } from 'primeng/fileupload';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IProduct } from '../../../../Models/IProduct';
import { ProductService } from '../../../../Services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../Services/category.service';
import { ICategory } from '../../../../Models/ICategory';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FileUploadModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit, OnDestroy {
  id: number = 0;
  product: IProduct | any = {};
  categories: ICategory[] = [];
  SubForGetId: any;
  SubForGetProduct: any;
  SubForAddOrEditProduct: any;
  SubForGetCats: any;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public categoryService: CategoryService,
    public productService: ProductService
  ) {}
  ngOnInit(): void {
    this.SubForGetCats = this.categoryService.GetAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.SubForGetId = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        this.getName.setValue('');
        this.getDescription.setValue('');
        this.getQuantity.setValue(null);
        this.getPrice.setValue(null);
        this.getImage.setValue(null);
        this.getDiscount.setValue(null);
        this.getCategoryId.setValue(null);
      },
    });
    if (this.id != 0) {
      this.SubForGetProduct = this.productService.GetById(this.id).subscribe({
        next: (data) => {
          this.product = data;
          this.getName.setValue(this.product.name);
          this.getDescription.setValue(this.product.description);
          this.getQuantity.setValue(this.product.quantity);
          this.getPrice.setValue(this.product.price);
          this.getImage.setValue(this.product.image);
          this.getDiscount.setValue(this.product.discount);
          this.getCategoryId.setValue(this.product.categoryId);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  ProductForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.max(50),
    ]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    price: new FormControl(null, [Validators.min(1)]),
    quantity: new FormControl(null, [Validators.min(0)]),
    discount: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    categoryId: new FormControl(null),
  });
  selectedFile: File | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.uploadFile();
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'productImages');

      fetch('https://api.cloudinary.com/v1_1/dxmhdkqlq/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            this.ProductForm?.patchValue({ image: data.secure_url });
          }
        })
        .catch((error) => {
          console.error('Error uploading file to Cloudinary:', error);
        });
    }
  }
  get getName() {
    return this.ProductForm.controls['name'];
  }
  get getDescription() {
    return this.ProductForm.controls['description'];
  }
  get getPrice() {
    return this.ProductForm.controls['price'];
  }
  get getQuantity() {
    return this.ProductForm.controls['quantity'];
  }
  get getDiscount() {
    return this.ProductForm.controls['discount'];
  }
  get getImage() {
    return this.ProductForm.controls['image'];
  }
  get getCategoryId() {
    return this.ProductForm.controls['categoryId'];
  }
  FormHandle() {
    if (this.ProductForm.status == 'VALID') {
      this.product = this.ProductForm.value;
      this.product.isDeleted = false;

      if (this.id == 0) {
        this.SubForAddOrEditProduct = this.productService
          .Insert(this.product)
          .subscribe({
            next: (data) => {
              this.router.navigate(['/dashboard/products']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      } else {
        this.product.id = this.id;
        this.SubForAddOrEditProduct = this.productService
          .Update(this.id, this.product)
          .subscribe({
            next: (data) => {
              this.router.navigate(['/dashboard/products']);
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
    if (this.SubForGetCats != null) this.SubForGetCats.unsubscribe();

    if (this.SubForGetId != null) this.SubForGetId.unsubscribe();

    if (this.SubForGetProduct != null) this.SubForGetProduct.unsubscribe();

    if (this.SubForAddOrEditProduct != null)
      this.SubForAddOrEditProduct.unsubscribe();
  }
}
