import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/models/product';
import { ApiTemplateService } from './api-template.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public apiTemplateService: ApiTemplateService) { }

  getProducts(){
    let url = environment.productAPIUrl + '/getProducts';
    return this.apiTemplateService.getData<Product[]>(url);
  }

  getProduct(productId: number){
    let url = environment.productAPIUrl + `/${productId}`;
    return this.apiTemplateService.getData<Product>(url)
  }

  deleteProduct(productId: number){
    let url = environment.productAPIUrl + `/deleteProduct/${productId}`;
    return this.apiTemplateService.deleteData(url);
  }

  saveProduct(product: Product){
    let url = environment.productAPIUrl + `/addNewProduct`;
    return this.apiTemplateService.postData(url,product);
  }

  updateProduct(product: Product){
    let url = environment.productAPIUrl + `/updateProduct/${product.productId}`;
    return this.apiTemplateService.putData(url,product);
  }

}
