import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products:Product[] = [];
  constructor(private apiService:ApiService) { }
  
  ngOnInit(): void {
    this.apiService.getProducts().subscribe((response:Product[])=>{
      console.log("called get products api")
      this.products = response;
      console.log(this.products)
    })
  }

}
