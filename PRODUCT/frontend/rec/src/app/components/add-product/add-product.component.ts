import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  submitted = false;
  product: Product = new Product();

  constructor(private formbuilder: FormBuilder,private apiService: ApiService) { }

  ngOnInit(): void {
    this.addProductForm = this.formbuilder.group({
      productName: ["",Validators.required],
      quantityAvailable: ["",Validators.required],
      price: ["",Validators.required],
      description: ["",Validators.required]
    })
  }


  onSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }

    console.table(this.addProductForm.value);
    console.table(this.addProductForm);
    this.product.productName = this.addProductForm.controls.productName.value;
    this.product.productPrice = this.addProductForm.controls.price.value;
    this.product.description = this.addProductForm.controls.description.value;
    this.product.productAvailability = this.addProductForm.controls.quantityAvailable.value;
  
    this.apiService.saveProduct(this.product).subscribe(successMessage => {  
        console.log(successMessage);
        this.addProductForm.reset();
      },errMessage => {
        console.log(errMessage);
      }
    )
  
  }

  onReset() {
    this.submitted = false;
    this.addProductForm.reset();
  }

}
