import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
// import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { finalize, tap, switchMap } from 'rxjs/operators';

import { ProductAttribute } from '../../shared/models/product-attribute.model';


import { Item } from '../../shared/models/item.model'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productVariantList$: Observable<any[]>;
  itemIdFilter$: BehaviorSubject<string|null>;
  private catCollection: AngularFirestoreCollection<any>;
  private itemsCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;
  private task: AngularFireUploadTask;
  private file: File;
  public currentProduct: Item;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  // private attributeList: AngularFireList<any>;
  products: Observable<Item[]>;
  categoryList: Observable<any[]>;
  productList: any[] = [];
  fb;
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.catCollection = afs.collection<any>('category');
    this.itemsCollection = afs.collection<any>('products');
    this.products = this.itemsCollection.valueChanges();
    this.afs
      .collection("products")
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.productList.push(doc.data());
        });
      });

  }
    
  getCategoryList() {
    return this.afs.collection('category').valueChanges();
  }

  addCategory(data: any) {
    const id = this.afs.createId();
    data.id = id;
    this.afs.collection<any>("category").doc(id).set(Object.assign({}, data));  
    
    return id
    
  }
  updateCategory(data: any){
    this.afs.collection<any>("category").doc(data.id).update(data);
  }

  deleteCategory(id: string){
    this.afs.collection<any>("category").doc(id).delete();
  }

  addItem(data: any) {
    const id = this.afs.createId();
    data.id = id;    
    this.itemsCollection.doc(id).set(Object.assign({}, data));
    return id
  }
  getItem(id: string): AngularFirestoreDocument<Item>{
    return this.afs.doc<Item>(`products/${id}`);
  }
  updateItem(data: any){    
    this.afs.collection<any>('products').doc(data.id).update(data);    
  }

  addVariant(data: any){

    const id = this.afs.createId();
    data.id = id;
    this.afs.collection<any>('variants').doc(id).set(Object.assign({}, data));

  }
  getProductVariantList(itemId: string | null){
    // this.itemIdFilter$.next(itemId);
    // this.productVariantList$ = combineLatest(
    //   this.itemIdFilter$,
    // ).pipe(
    //   switchMap(([id]) => 
    //     this.afs.collection('products', ref => {
    //       let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
    //       if (id) { query = query.where('productId', '==', id) };
    //       return query;
    //     }).valueChanges()
    //   )
    // );
    return this.afs.collection('variants', ref => ref.where('itemId', '==', itemId)).valueChanges();

    // this.afs.collection('variants').doc(id).set(Object.assign({}, data));

  }
  addAttribute(data: any) {
    const id = this.afs.createId();
    data.id = id;
    this.afs.collection<any>('attributes').doc(id).set(Object.assign({}, {name: data.name, displyType: data.displyType, attributeLines: data.attributeLines }));
    // for (let val in data.attributeLines){
    //   const id1 = this.afs.createId();
    //   this.afs.collection<any>('attributeLines').doc(id1).set(Object.assign({}, {attributeId: id, value: val}));
    // }
    // this.db.list('attributes').set(id, {name: data.name, displyType: data.displyType});  
    // this.db.list(`attributes/${id1}/ attributeLines`).push(data.attributeLines);
    // return id
  }

  getAttributeList() {
    return this.afs.collection('attributes').valueChanges();
  }

  getAttribute(id: string){
    return this.afs.doc<ProductAttribute>(`attributes/${id}`);
  }

  getTags(){
    return this.afs.collection('tags').valueChanges();
  }
}
