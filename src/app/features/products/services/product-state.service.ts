
// feature state management manage UI state for products feature
// application layer
/// single source of truth for feature state; prevent duplicate API calls 
// signals === simplicity performance
import {Injectable, signal, computed, WritableSignal } from '@angular/core';
import {Product} from '../models/interfaces/product.model';
import { ProductsService } from './products.service';
import {tap, catchError, throwError, of} from 'rxjs';
@Injectable({providedIn:  'root'})
export class ProductStateService {
    // core state signals private
    private productsSignal = signal<Product[]>([]);
    private loadingSignal = signal(false);
    private errorSignal = signal<string | null>(null);
    products = computed(() => this.productsSignal());
    loading = computed(() => this.loadingSignal());
    error = computed(() => this.errorSignal());
    constructor(private productsService: ProductsService){
        this.loadProducts();
    }
    loadProducts() {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.productsService.getProducts().subscribe({
            next: (products) => {
                this.productsSignal.set(products);
                this.loadingSignal.set(false);            },
            error: (err) => {
                this.errorSignal.set(err.message || 'Failed to load products');
                this.loadingSignal.set(false);
                console.error('Load products error:',err);
            }
        });
    }
    addProduct(product: Partial<Product>){
          this.loadingSignal.set(true);
          this.errorSignal.set(null);
          this.productsService.createProduct(product).subscribe({
             next: (id) => {
                const newProduct: Product = {
                    id,
                    ...product,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: null
                } as Product;
           
             this.productsSignal.update(products => [...products, newProduct]);
             this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(err.message || 'failed to create product');
                this.loadingSignal.set(false);
                console.error('create product error' , err);

            }
          });
        }
        updateProduct(id: number, product: Partial<Product>) {
            this.loadingSignal.set(true);
            this.errorSignal.set(null);
            this.productsService.updateProduct(id, product).subscribe({
                next: () => {
                    this.productsSignal.update(products => 
                        products.map(p => p.id === id ? {...p, ...product } as Product : p)
                    );
                    this.loadingSignal.set(false);

                },
                error: (error) => {
                    this.errorSignal.set(error.message || 'Failed to update ^product');
                    this.loadingSignal.set(false);
                    console.error('Update product error:', error);
                }
            });

       
    }
    deleteProduct(id: number) {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        this.productsService.deleteProduct(id).subscribe({
            next: () => {
                this.productsSignal.update(products => products.filter(p => p.id !== id));
                this.loadingSignal.set(false);
            },
            error: (err) => {
                this.errorSignal.set(err.message || 'faileeeeeeeed safee');
                this.loadingSignal.set(false);
            }
        });
    }
    clearError(){
        this.errorSignal.set(null);
    }
}
