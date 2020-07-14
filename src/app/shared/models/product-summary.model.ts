export class ProductSummary {
    id: string;
    $key: string;
    name: string;
    category: string;
    description: [
        {
            lang: string,
            val: string;
        }
    ];    
    img: [        
        {
            height: number;
            width: number;
            src: string;
            title: string;
        }
    ]   
    attrs: [
        {
            name: string;
            value: string;
        }
    ]
    sattrs: [
        {
            name: string;
            value: string;
        }
    ]
    variants: [
        {
            id: string;
            img: [    
                {
                    height: number;
                    width: number;
                    src: string;
                    title: string;
                }        
            ]   
            attrs: [
                {
                    name: string; // color, size, etc.
                    dispType: string; // combobox, image, button, etc.
                }
            ]      
        }          
    ] 
    lastUpdated: Date;
    sku: number;    
    barcode: number;
    trackInventory: boolean;
    productQuatity: number;
    ratings: number;
    favourite: boolean;
    productSeller: string;   
    
    
}
