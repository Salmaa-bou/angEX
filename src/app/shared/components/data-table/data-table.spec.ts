import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTable } from './data-table';
import { Product } from '../../../features/products/models/interfaces/product.model';

describe('DataTableComponent', () => {
  let component: DataTable<Product>;
  let fixture: ComponentFixture<DataTable<Product>>;

  const mockData: Product[] = [
    { id: 1, name: 'Laptop', description: 'Gaming', price: 999.99, stockQuantity: 10, isActive: true, createdAt: new Date().toISOString(), updatedAt: null },
    { id: 2, name: 'Mouse', description: 'Wireless', price: 29.99, stockQuantity: 50, isActive: true, createdAt: new Date().toISOString(), updatedAt: null }
  ];

  const mockColumns = [
    { header: 'Name', field: 'name' },
    { header: 'Price', field: 'price', format: 'currency' as const },
    { header: 'Actions', field: 'actions', actions: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTable]
    }).compileComponents();

   fixture = TestBed.createComponent(DataTable) as ComponentFixture<DataTable<Product>>;
    component = fixture.componentInstance;
    component.data = mockData;
    component.columns = mockColumns;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should format currency values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('$999.99');
    expect(compiled.textContent).toContain('$29.99');
  });

  it('should emit edit event', () => {
    vi.spyOn(component.edit, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const editButton = compiled.querySelector('button') as HTMLButtonElement;
    editButton.click();
    expect(component.edit.emit).toHaveBeenCalledWith(mockData[0]);
  });

  it('should emit delete event', () => {
    vi.spyOn(component.delete, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButtons = compiled.querySelectorAll('button');
    // Second button is delete (after edit)
    (deleteButtons[1] as HTMLButtonElement).click();
    expect(component.delete.emit).toHaveBeenCalledWith(mockData[0]);
  });
});