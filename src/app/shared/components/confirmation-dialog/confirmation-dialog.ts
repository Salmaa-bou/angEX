// PURPOSE: Reusable confirmation dialog - consistent user confirmation
// LAYER: Shared (UI)
// WHY: Prevent accidental actions; consistent UX pattern
// DECISION: Simple dialog with configurable text
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ConfirmationDialog {
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}