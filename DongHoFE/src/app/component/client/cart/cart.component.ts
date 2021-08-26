import {Component, SimpleChanges, OnChanges, OnInit} from '@angular/core';
import {Product} from "../../../class/product";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderDetail} from "../../../class/order-detail";
import {Order} from "../../../class/order";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: any;
  detail: Array<OrderDetail> = new Array<OrderDetail>();
  detailProds: Array<Object> = new Array<Object>();
  checklist: Array<any> = new Array<any>();
  products: Array<Product> = new Array<Product>();
  selectedAll: any;
  select: any;
  order: Order = new Order(0,0,0,1,0,0);
  orderId: number = 0;
  total: number = 0;
  totalProduct: number = 0;

  userId: any;
  // checklist: any;
  private value: OrderDetail | undefined;
  constructor(
    private userServices: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userServices.getUsername();
    this.userServices.getUser(this.user).subscribe(data => {
      this.userId = data.id;
    })
    this.userServices.getListOrderDetail().subscribe(data => {
      this.detail = data;
      this.detail.forEach(item => {
        if(item.userId == this.userId){
          this.checklist.push({id: item.productId, quantity: item.quantity, idDetail: item.id,isSelected: false});
        }
      })
    });
    this.userServices.getListProduct().subscribe(prod =>{
      this.products = prod;
    });
  }

  cancel(){

  }
//dung goi
  selectAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].selected = this.selectedAll;
      this.userServices.getListProduct().subscribe(prod =>{
        this.total = 0;
        this.totalProduct = 0;
        this.products = prod;
        this.products.forEach(p => {
          this.checklist.forEach(va => {
            if(p.id == va.id){
              this.totalProduct++;
              this.total += (va.quantity*p.price);
            }
          })
        })
      });
    }
  }

  //dang sua
  checkIfAllSelected() {
    this.selectedAll = this.checklist.every(function(item:any) {
      return item.selected == true;
    });
  }

  addOrderId() {
    this.orderId++;
    this.order.id = this.orderId;
    this.order.total = this.total;
    this.order.status = 3;
    this.order.userId = 1;
    this.userServices.saveOrder(this.order).subscribe(data => {
      this.checklist.forEach(item => {
        if(item.selected){
          this.userServices.updateOrderId(item.idDetail,this.order.id).subscribe();
        }
      })
    })
  }


  signOut() {
    this.userServices.signOut();
    this.router.navigate(['/']);
  }
}
