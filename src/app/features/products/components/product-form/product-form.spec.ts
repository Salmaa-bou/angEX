import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductForm } from './product-form';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductFormComponent', () => {
  let component: ProductForm;
  let fixture: ComponentFixture<ProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductForm, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.productForm.valid).toBe(false);
  });

  it('should validate required fields', () => {
    component.productForm.setValue({
      name: '',
      description: '',
      price: null,
      stockQuantity: null
    });
    component.productForm.markAllAsTouched(); 
    expect(component.name?.hasError('required')).toBe(true);
    expect(component.price?.hasError('required')).toBe(true);
    expect(component.stockQuantity?.hasError('required')).toBe(true);
  });

  it('should emit productSubmitted on valid submit', () => {
    vi.spyOn(component.productSubmitted, 'emit');
    
    component.productForm.setValue({
      name: 'Keyboard',
      description: 'Mechanical',
      price: 79.99,
      stockQuantity: 30
    });
    
    component.onSubmit();
    
    expect(component.productSubmitted.emit).toHaveBeenCalledWith({
      name: 'Keyboard',
      description: 'Mechanical',
      price: 79.99,
      stockQuantity: 30
    });
  });

  it('should not emit on invalid submit', () => {
    vi.spyOn(component.productSubmitted, 'emit');
    component.productForm.setValue({
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0
    });
    component.onSubmit();
    expect(component.productSubmitted.emit).not.toHaveBeenCalled();
  });

  it('should reset form on cancel', () => {
    vi.spyOn(component.cancel, 'emit');
    component.productForm.setValue({
      name: 'Test',
      description: 'Test',
      price: 10,
      stockQuantity: 5
    });
    component.onCancel();
    expect(component.productForm.value).toEqual({
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0
    });
    expect(component.cancel.emit).toHaveBeenCalled();
  });
});