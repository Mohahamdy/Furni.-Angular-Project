import { MainBodyComponent } from './Components/main-body/main-body.component';
import { CategoryFormComponent } from './Components/Dashboard/category/category-form/category-form.component';
import { CategoryItemComponent } from './Components/Dashboard/category/category-item/category-item.component';
import { ProductFormComponent } from './Components/Dashboard/product/product-form/product-form.component';
import { ProductItemsComponent } from './Components/Dashboard/product/product-items/product-items.component';
import { Routes } from '@angular/router';
import { ShopComponent } from './Components/shop/shop.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Services/auth.guard';
import { adminGuard } from './Services/admin.guard';
import { NotfoundComponent } from './Components/notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: MainBodyComponent },
  {
    path: 'dashboard/products',
    component: ProductItemsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard/categories',
    component: CategoryItemComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard/products/edit/:id',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard/categories/edit/:id',
    component: CategoryFormComponent,
    canActivate: [adminGuard],
  },
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];
