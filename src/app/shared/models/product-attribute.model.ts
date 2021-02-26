import { ProductAttributeLine } from './product-attribute-line.model';

export class ProductAttribute {
    id: string;
    name: String;
    displyType: String;
    attributeLines: ProductAttributeLine[]=[];
}
