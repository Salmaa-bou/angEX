/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationDialog } from './confirmation-dialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialog;
  let fixture: ComponentFixture<ConfirmationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialog]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialog);
    component = fixture.componentInstance;
    component.title = 'Delete Product';
    component.message = 'Are you sure?';
    component.confirmText = 'Delete';
    component.cancelText = 'Cancel';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display custom title and message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Delete Product');
    expect(compiled.textContent).toContain('Are you sure?');
  });

  it('should emit confirm event on confirm button click', () => {
    spyOn(component.confirm, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const confirmButton = compiled.querySelector('.btn-danger') as HTMLButtonElement;
    confirmButton.click();
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('should emit cancel event on cancel button click', () => {
    spyOn(component.cancel, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const cancelButton = compiled.querySelector('.btn-secondary') as HTMLButtonElement;
    cancelButton.click();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should emit cancel when clicking overlay', () => {
    spyOn(component.cancel, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const overlay = compiled.querySelector('.dialog-overlay') as HTMLElement;
    overlay.click();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should NOT emit cancel when clicking inside dialog', () => {
    spyOn(component.cancel, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.dialog-container') as HTMLElement;
    container.click();
    expect(component.cancel.emit).not.toHaveBeenCalled();
  });
});