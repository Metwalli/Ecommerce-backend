export class Item {
    id: string;
    $key: string;
    description: [
        {
            lang: string,
            val: string;
        }
    ];
    name: string;
    category: string;
    brand: {
        id: string;
        name: string;
        img: string;
    }
    assets: {
        imgs: [
            {               
                height: number;
                width: number;
                src: string;
            }
        ]
    }
    shipping: {
        dimensions: {
            height: number;
            width: number;
            length: number;
        },
        weight: number;
    }
    specs: [
        {
            name: string;
            value: string;
        }
    ]
    attrs: [
        {
            name: string;
            value: string;
        }
    ]
    variants: {
        count: number;
        attrs: [
            {
                name: string; // color, size, etc.
                dispType: string; // combobox, image, button, etc.
            }
        ]        
    }    
    lastUpdated: Date;
    sku: number;    
    barcode: number;
    trackInventory: boolean;
    productQuatity: number;
    ratings: number;
    favourite: boolean;
    productSeller: string;   
}
