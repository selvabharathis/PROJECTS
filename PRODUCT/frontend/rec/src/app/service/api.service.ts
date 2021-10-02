import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/models/product';
import { ApiTemplateService } from './api-template.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public apiService: ApiTemplateService) { }

  getProducts(){
    let url = environment.productAPIUrl + '/getProducts';
    return this.apiService.getData<Product[]>(url);
  }

  getProduct(productId: number){
    let url = environment.productAPIUrl + `/${productId}`;
    return this.apiService.getData<Product>(url)
  }

  deleteProduct(productId: number){
    let url = environment.productAPIUrl + `/deleteProduct/${productId}`;
    return this.apiService.deleteData(url);
  }

  saveProduct(product: Product){
    let url = environment.productAPIUrl + `/addNewProduct`;
    return this.apiService.postData(url,product);
  }

  updateProduct(product: Product){
    let url = environment.productAPIUrl + `/updateProduct/${product.productId}`;
    return this.apiService.putData(url,product);
  }

}
