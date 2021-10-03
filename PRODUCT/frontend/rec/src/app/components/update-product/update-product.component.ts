import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { CommonProcessService } from 'src/app/service/common-process.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm: FormGroup;
  submitted = false;
  product: Product = new Product();
  products: Product[];
  productName: string = '';
  productPrice: number;
  productDescription: string = '';
  quantityAvailable: number;
  productId: number;

  constructor(private formbuilder: FormBuilder,
    private apiService: ApiService,
    private commonProcess: CommonProcessService) { }

  ngOnInit(): void {
    this.updateProductForm = this.formbuilder.group({
      productName: ["",Validators.required],
      quantityAvailable: ["",Validators.required],
      price: ["",Validators.required],
      description: ["",Validators.required]
    })
    this.products = this.commonProcess.products;
  }

  findProduct(val){
    console.log(val);
    console.log(this.products);
    this.product = this.products.find((prod=>prod.productId == val));
    // this.products.forEach((product)=>{
    //   if(product.productId == val){
    //     this.product = product;
    //     console.log(product.productName);
    //     this.productName = product.productName;
    //     this.productDescription = product.description;
    //     this.productPrice = product.productPrice;
    //     this.quantityAvailable = product.productAvailability;
    //   }
    // })
    console.log(this.product);
    this.productName = this.product.productName;
    this.productDescription = this.product.description;
    this.productPrice = this.product.productPrice;
    this.quantityAvailable = this.product.productAvailability;
  }

  onSubmit(){
    this.submitted = true;
    if (this.updateProductForm.invalid) {
      return;
    }

    console.table(this.updateProductForm.value);
    console.table(this.updateProductForm);
    this.product.productName = this.updateProductForm.controls.productName.value;
    this.product.productPrice = this.updateProductForm.controls.price.value;
    this.product.description = this.updateProductForm.controls.description.value;
    this.product.productAvailability = this.updateProductForm.controls.quantityAvailable.value;
  
    this.apiService.updateProduct(this.product).subscribe(successMessage => {  
        console.log(successMessage);
        this.updateProductForm.reset();
      },errMessage => {
        console.log(errMessage);
      }
    )
  }

  onReset() {
    this.submitted = false;
    this.updateProductForm.reset();
  }
}
