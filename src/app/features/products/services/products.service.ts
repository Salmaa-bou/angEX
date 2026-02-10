// business logic layer -what to call and why business intent
// layer: application orchestration
//why encapsulate business rules ; validate before API calls; transform data
// Use ApiService (How)  BUT Adds business cpntext
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import {Product} from '../models/interfaces/product.model';

@Injectable({ providedIn: 'root'})
export class ProductsService {
    private readonly endpoint = 'api/products';
    constructor(private api: ApiService) {}
    getProducts(): Observable<Product[]>{
        return this.api.get<Product[]>(this.endpoint);
    }
    getProduct(id: number): Observable<Product> {
        if(id<= 0) throw new Error('invalid product id');
        return this.api.get<Product>(`${this.endpoint}/${id}`);
    }
    // trim() : is a js string method that removes whitespace from both ends of a string.
    //'  hello  '.trim()    // 'hello'
    //product.name?.trim() //  ?  sooo it Returns undefined if name is undefined/null instead of error 
    // partial<T> its ts utility type that makes all properties of a type optional
    //When updating a product, you typically don't need to send all fields—only the ones being changed
    // look partial earfana elash f creation c est pas une bonne pratique hit nqedru n siftou {} object walakine meaa business validition is okeey to use it but 
    //Summary
//Your understanding is correct: Using Partial<Product> with runtime validation does prevent sending invalid data. However:

//Using a specific DTO (like CreateProductDto) gives you compile-time safety + runtime validation
//Using Partial<Product> relies only on runtime validation (more error-prone)

//Both work, but the DTO approach catches errors earlier  at compile-time(at development time vs runtime).
    
    createProduct(product: Partial<Product>): Observable<number>
    {
        if(!product.name?.trim()) throw new Error('Product name is required');
        if(product.price === undefined || product.price <= 0) throw new Error('proce must be positive');
        if(product.stockQuantity === undefined || product.stockQuantity <= 0) throw new Error('Stockquantity cannnooot be negative');
        const payload = {
            name: product.name.trim(),
            description: product.description?.trim() || '',
            price: product.price,
            stockQuantity: product.stockQuantity
        };
        return this.api.post<number>(this.endpoint, payload);
    }
    updateProduct(id: number, product: Partial<Product>):Observable<void>{
       if (id <= 0) throw new Error('Invalid product ID');
       if (!product.name?.trim()) throw new Error('Product name is required');
       const payload = {
        id,
        name: product.name.trim(),
        description: product.description?.trim() || '',
        price: product.price || 0,
        stockQuantity: product.stockQuantity || 0
       };

        return this.api.put<void>(`${this.endpoint}/${id}`, payload);
    }
    deleteProduct(id: number): Observable<void>{
      if (id <= 0) throw new Error('Invalid product Id');
      return this.api.delete<void>(`${this.endpoint}/${id}`);
    }
}
