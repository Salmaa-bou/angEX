/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { ProductForm } from '../product-form/product-form';
import { DataTable} from '../../../../shared/components/data-table/data-table';
import { ConfirmationDialog} from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { ProductStateService } from '../../services/product-state.service';
import { Product } from '../../models/interfaces/product.model';
import { signal } from '@angular/core';

// Mock service with signals
class MockProductStateService {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', description: 'Gaming laptop', price: 999.99, stockQuantity: 10, isActive: true, createdAt: new Date().toISOString(), updatedAt: null }
  ]);
  loading = signal(false);
  error = signal(null);
  loadProducts = jasmine.createSpy('loadProducts');
  addProduct = jasmine.createSpy('addProduct');
  updateProduct = jasmine.createSpy('updateProduct');
  deleteProduct = jasmine.createSpy('deleteProduct');
  clearError = jasmine.createSpy('clearError');
}

describe('ProductListComponent', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;
  let mockStateService: MockProductStateService;

  beforeEach(async () => {
    mockStateService = new MockProductStateService();
    
    await TestBed.configureTestingModule({
      imports: [
        ProductList,
        ProductForm,
        DataTable,
        ConfirmationDialog
      ],
      providers: [
        { provide: ProductStateService, useValue: mockStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products when loaded', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Laptop');
    expect(compiled.textContent).toContain('999.99');
  });

  it('should call addProduct when form submitted', () => {
    const testProduct = { name: 'Mouse', description: 'Wireless', price: 29.99, stockQuantity: 50 };
    component.onProductSubmitted(testProduct);
    expect(mockStateService.addProduct).toHaveBeenCalledWith(testProduct);
  });

  it('should open delete confirmation', () => {
    component.openDeleteConfirmation(1);
    expect(component.showConfirmation()).toBe(true);
    expect(component.confirmProductId()).toBe(1);
  });

  it('should format currency correctly', () => {
    expect(component.formatCurrency(1234.56)).toBe('$1,234.56');
  });
});