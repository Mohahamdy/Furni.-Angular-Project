import { IProduct } from './../Models/IProduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // baseURL: string = 'http://localhost:5000/api/products';
  baseURL: string = 'http://localhost:8066/api/products';

  constructor(public httpClient: HttpClient) {}

  GetAll(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.baseURL);
  }

  GetPaging(page: number, pageSizing: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `${this.baseURL}/${page},${pageSizing}`
    );
  }

  GetById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.baseURL}/${id}`);
  }

  GetByCategory(categoryName: string): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.baseURL}/${categoryName}`);
  }

  Insert(product?: IProduct) {
    return this.httpClient.post(this.baseURL, product);
  }

  Update(id: number, product?: IProduct) {
    return this.httpClient.put(`${this.baseURL}/${id}`, product);
  }

  Delete(id: number) {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
