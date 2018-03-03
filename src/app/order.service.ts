import { Injectable } from '@angular/core';
import { Product } from './model/product';
import { PRODUCTS } from './model/mock-products';
import { User } from './model/user';
import { USER } from './model/mock-user';



@Injectable()
export class OrderService {
  getProducts(): Promise<Product[]> {
    return Promise.resolve(PRODUCTS);
  }

  getUserProfile(): Promise<User> {
    return Promise.resolve(USER);
  }
}
