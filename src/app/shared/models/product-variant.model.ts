import { ProductAttribute } from './product-attribute.model';
export class ProductVariant {
    sku: string; //sku
    name: string;
    itemId: string;  
    price: number;  
    img: string;
    color: string;
    size: string;// if the product don't has size, size attribute doesn't show in the component
    attrs: any[]=[]; // ProductAttribute[];    
}
