import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CommonProcessService } from 'src/app/service/common-process.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products:Product[] = [];
  constructor(private commonProcess:CommonProcessService,private apiService: ApiService) { }
  
  ngOnInit(): void {
      this.apiService.getProducts().subscribe(products=>{
          console.log(products)
          this.products = products;
          this.commonProcess.saveAllProducts(products);
        })
      
  }

}
