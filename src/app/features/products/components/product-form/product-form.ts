import { Component, Input, Output, EventEmitter, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {Product} from '../../models/interfaces/product.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-form',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  standalone: true,

})
export class ProductForm implements OnInit, OnChanges{
  @Input() product: Product | null = null;
  @Output() productSubmitted = new EventEmitter<Partial<Product>>();
  @Output() cancel = new EventEmitter<void>();
  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(200)
    ]),
    description: new FormControl('', [
      Validators.maxLength(500)
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0.01)
    ]),
    stockQuantity: new FormControl(0,  [
      Validators.required,
      Validators.min(0)
    ])
  });
  ngOnInit(){
    if (this.product){
      this.productForm.patchValue({
        name: this.product.name,
        description:this.product.description,
        price: this.product.price,
        stockQuantity: this.product.stockQuantity
      });

    }
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.loadProductData();
    }
  }
  private loadProductData() {
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        stockQuantity: this.product.stockQuantity
      });
    } else {
      // Reset form when product is null (for "Add New Product" mode)
      this.productForm.reset({
        name: '',
        description: '',
        price: 0,
        stockQuantity: 0
      });
    }
  }

  get name() {return this.productForm.get('name');

  }
    get price() {return this.productForm.get('price');
    
  }
    get stockQuantity() {return this.productForm.get('stockQuantity');
    
  }
  onSubmit(){
    if (this.productForm.valid){
      this.productSubmitted.emit(this.productForm.value as Partial<Product>);
      this.productForm.reset();
    }
  }
  onCancel() {
    this.productForm.reset({
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0
  });
  this.cancel.emit();
}
  hasError(controlName: string, errorName: string): boolean {
    const control = this.productForm.get(controlName) ;
    return !!(control && control.hasError(errorName) && control.touched);
  }
}
