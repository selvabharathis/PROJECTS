import { Injectable } from '@angular/core';
import { Product } from 'src/models/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonProcessService {

  products : Product[] = [];

  constructor(private apiService:ApiService) { }

  saveAllProducts(products: Product[]){
    this.products = products;
  }
  
}
