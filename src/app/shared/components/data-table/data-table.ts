// PURPOSE: Reusable data table component - display tabular data consistently
// LAYER: Shared (UI)
// WHY: Prevent duplication; consistent table behavior across app
// DECISION: Generic component with configurable columns
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DataTable<T> {
  @Input() data: T[] = [];
  @Input() columns: { 
    header: string; 
    field: string; 
    format?: 'currency' | 'date'; 
    actions?: boolean 
  }[] = [];
  
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
    getCellValue(item: T, field: string): any {
    return (item as any)[field];
  }

  formatValue(value: any, format?: string): string {
    if (value === null || value === undefined) return '-';
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD' 
        }).format(value);
      case 'date':
        return new Date(value).toLocaleDateString();
      default:
        return String(value);
    }
  }
}