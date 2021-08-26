import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import { Product } from '../../../class/product';
import {UserService} from "../../../service/user.service";
import {Image} from "../../../class/image";
import {OrderDetail} from "../../../class/order-detail";
import {Order} from "../../../class/order";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  orderDetail: OrderDetail = new OrderDetail(0,0,0,1, 1005);
  product: Product = new Product(0,"","",0,0,"",0,0,0,0,0,0,"");
  products: Array<Product> = new Array<Product>();
  similarProduct: Array<Product> = new Array<Product>();
  image: Array<Image> = new Array<Image>();
  images: Array<Image> = new Array<Image>();
  user: any;
  constructor(
    private userServices: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userServices.getUsername();
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    this.userServices.getListImage().subscribe(data => {
      this.image = data;
      this.image.forEach(item => {
        if(item.productId == productIdFromRoute){
          this.images.push(item);
        }
      })

    });
    this.userServices.getProduct(productIdFromRoute).subscribe(item => {
      this.product = item;
      this.userServices.getListProduct().subscribe(data => {
        this.products = data;
        this.products.forEach(item => {
          if(item.brand == this.product.brand){
            this.similarProduct.push(item);
          }
        })
      });
    });

    let i = 0;
  }
  signOut() {
    this.userServices.signOut();
    this.router.navigate(['/']);
  }
  buy(quantity: number, productId: number) {
    this.orderDetail.quantity = quantity;
    this.orderDetail.productId = productId;
    this.userServices.getUser(this.userServices.getUsername()).subscribe(data =>{
      this.orderDetail.userId = data.id;
      this.userServices.saveOrderDetail(this.orderDetail).subscribe();
    })
    Swal.fire('Thành công!', 'Sản phẩm đã được thêm vào giỏ hàng của bạn.', 'success');
  }
}
