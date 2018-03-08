import { Component, OnInit } from '@angular/core';
import { Product } from './model/product';
import { User } from './model/user';
import { OrderService } from './order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [OrderService]
})

export class AppComponent implements OnInit {
  // constructor
  constructor(private orderService: OrderService) {
    this.newProduct = new Product;
    }
  // definition
  products: Product[];
  user: User;
  total = 0;
  title: 'My Cart';
  newProduct: Product;
  // init
  ngOnInit(): void {
    this.getProducts();
    this.getUserProfile();
    this.title = 'My Cart';
  }

  getUserProfile(): void {
    this.orderService.getUserProfile()
      .then(user => {
        this.user = user;
      });
  }

  buyNew(): void {
    const productToAdd = {...this.newProduct};
    this.products.push(productToAdd);
    this.total += this.newProduct.price * this.newProduct.quantity;
    this.resetNewProduct();
  }

  resetNewProduct(): void {
    this.newProduct = new Product;
  }

  checkOut(): void {
     this.products.splice(0, this.products.length);
     this.user.balance -= this.total;
     this.total = 0 ;
     this.resetNewProduct();
  }

  getProducts(): void {
    this.orderService.getProducts()
      .then(products => {
        this.products = products;
        this.getTotal();
      });
  }

  getTotal(): void {
    this.products.forEach(product => {
      this.total = this.total + product.price * product.quantity;
    });
  }

}
