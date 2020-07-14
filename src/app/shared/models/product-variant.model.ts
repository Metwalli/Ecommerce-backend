export class ProductVariant {
    id: string; //sku
    name: string;
    itemId: string;
    assets: {
        imgs: [
            {               
                height: number;
                width: number;
                src: string;
            }
        ]
    }
    attrs: [
        {
            name: string;
            value: string;
        }
    ]    
}
