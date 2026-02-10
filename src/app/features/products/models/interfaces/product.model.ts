// Domain model  tooo define what aa Product IS
//layer domain business
// single source of truth for product structure ; typescript safety
// match .net api model exactly for seamless serialization
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string | null;
}