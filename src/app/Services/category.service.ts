import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../Models/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // baseURL: string = 'http://localhost:5000/api/categories';
  baseURL: string = 'http://localhost:8066/api/categories';

  constructor(public httpClient: HttpClient) {}

  GetAll(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(this.baseURL);
  }

  GetById(id: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${this.baseURL}/${id}`);
  }

  Insert(category?: ICategory) {
    return this.httpClient.post(this.baseURL, category);
  }

  Update(id: number, category?: ICategory) {
    return this.httpClient.put(`${this.baseURL}/${id}`, category);
  }

  Delete(id: number) {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
