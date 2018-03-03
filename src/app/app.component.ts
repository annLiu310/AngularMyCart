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
    this.newProduct = { name:''};
    }
  // definition
  products: Product[];
  user: User;
  title: 'My Cart';
  total = 0;
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
  addOne(product: Product): void {
    product.quantity++;
    this.total += product.price;
    // this.getTotal();
  }
  removeOne(product: Product): void {
    product.quantity--;
    this.total -= product.price;
    // this.getTotal();
  }
  removeProduct(product: Product): void {
    const indexOfProduct = this.products.indexOf(product);
    // this.products.splice(indexOfProduct, 1);
    this.products = this.products.filter(x => x.name !== product.name);
    this.total -= product.price * product.quantity;
    // this.getTotal();
  }
  buyNew(product: Product): void {
     this.products.push(product);
    this.total += product.price * product.quantity;
    // this.getTotal();
  }
  checkOut(): void {
     this.products.splice(0, this.products.length);
    this.user.balance -= this.total;
    this.total = 0 ;
    this.newProduct = { name:''};
    // this.getTotal();
  }
}
