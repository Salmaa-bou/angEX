// src/app/features/products/components/product-list/product-list.component.ts
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductStateService } from '../../services/product-state.service';
import { Product } from '../../models/interfaces/product.model';
import { ProductForm } from '../product-form/product-form';
import { DataTable } from '../../../../shared/components/data-table/data-table';
import { ConfirmationDialog } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductForm,
    DataTable,
    ConfirmationDialog
  ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit{

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' },
    { header: 'Price', field: 'price', format: 'currency' as const },
    { header: 'Stock', field: 'stockQuantity' },
    { header: 'Actions', field: 'actions', actions: true }
  ];

  showConfirmation = signal(false);
  confirmProductId = signal<number | null>(null);
  editingProduct = signal<Product | null>(null);

  constructor(public state: ProductStateService) {}

  ngOnInit() {
    // State service auto-loads products
  }

  onProductSubmitted(product: Partial<Product>) {
    if (this.editingProduct()) {
      this.state.updateProduct(this.editingProduct()!.id, product);
      this.editingProduct.set(null);
    } else {
      this.state.addProduct(product);
    }
  }

  editProduct(product: Product) {
    this.editingProduct.set(product);
  }

  cancelEdit() {
    this.editingProduct.set(null);
  }

  openDeleteConfirmation(id: number) {
    this.confirmProductId.set(id);
    this.showConfirmation.set(true);
  }

  confirmDelete() {
    const id = this.confirmProductId();
    if (id !== null) {
      this.state.deleteProduct(id);
    }
    this.closeConfirmation();
  }

  closeConfirmation() {
    this.showConfirmation.set(false);
    this.confirmProductId.set(null);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(value);
  }
}