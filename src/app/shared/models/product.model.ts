import { SettingRoutingModule } from 'src/app/components/setting/setting-routing.module';

export class Product {
    id: string = "";
    
    name: string ="";
    description: [
        {
            lang: string,
            val: string;
        }
    ];
    type: string;
    collection: string[]=[];
    category: string[]=[];
    brand: string;
    images: any[]=[]; //Image[];
    attributes: string[]=[];
    shipping: any={}; // Shipping = new Shipping();
    specs: any[];
    price: any={}; // ProductPrice = new ProductPrice();
    sale: true;
    new: true;
    tags: any[]=[];
    variants: any[]=[]; // ProductVariant[];
    hasVariants: boolean= false;
    availableColors: string;
    lastUpdated: Date;
    sku: number;    
    barcode: number;
    trackInventory: boolean;
    productQuatity: number;
    ratings: number;
    favourite: boolean;
    productSeller: string; 
    // id: string;
    // $key: string;
    // description: [
    //     {
    //         lang: string,
    //         val: string;
    //     }
    // ];
    // name: string;
    // category: string;
    // price: {
    //     standardprice: number;
    //     comparePice: number;
    //     costPrice: number;
    //     endDate: Date;
    // }
    // sku: number;    
    // barcode: number;
    // trackInventory: boolean;
    // productQuatity: number;
    // ratings: number;
    // favourite: boolean;
    // productSeller: string;
    // assets: {
    //     imgs: [
    //         {               
    //             height: number;
    //             width: number;
    //             src: string;
    //         }
    //     ]
    // }
    // shipping: {
    //     dimensions: {
    //         height: number;
    //         width: number;
    //         length: number;
    //     },
    //     weight: number;
    // }
    // attributes: [
    //     {
    //         name: string;
    //         value: string;
    //     }
    // ]
    // variants: [
    //     {
    //         name: string; // color, size, etc.
    //         type: string; // combobox, image, button, etc.
    //     }
        
    // ]    
}
