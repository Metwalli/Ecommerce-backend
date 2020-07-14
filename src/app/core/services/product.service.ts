import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Product } from '../../shared/models/product.model'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private itemsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Product>('products');
    this.products = this.itemsCollection.valueChanges();
  }
  addItem(item: Product) {
    const id = this.afs.createId();
    // const item1: Product = { id, i};
    this.itemsCollection.doc(id).set(Object.assign({}, item));
    // this.itemsCollection.add(item);
  }
}
