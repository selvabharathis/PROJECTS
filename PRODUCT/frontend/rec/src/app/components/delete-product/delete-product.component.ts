import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  productId:number;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.apiService.deleteProduct(this.productId).subscribe(successMessage=>{
      console.log(successMessage);
    },errorMessage=>{
      console.log(errorMessage);
    })
  }

}
