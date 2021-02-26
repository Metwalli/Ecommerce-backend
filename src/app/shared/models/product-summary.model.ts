import { ProductAttribute } from './product-attribute.model';
import { ProductVariant } from './product-variant.model';
import { Image } from './image.model';

export class ProductSummary {

    id: string;// item id
    name: string;
    categoryId: string;
    description: string;

    img: Image[];

    attrs: ProductAttribute[];
    
    sattrs: ProductAttribute[]; // name, and value
    
    variants: ProductVariant[];
     
}
