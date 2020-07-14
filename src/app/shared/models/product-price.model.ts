export class ProductPrice {
    id: string;
    price: number;
    sale: {
        salePrice: number;
        saleEndDate: Date;
    }
    lastUpdated: Date;
}
