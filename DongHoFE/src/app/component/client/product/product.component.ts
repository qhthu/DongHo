import { Component, OnInit } from '@angular/core';
import {Product} from "../../../class/product";
import {UserService} from "../../../service/user.service";
import {Image} from "../../../class/image";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Status} from "../../../class/status";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Array<Product> = new Array<Product>();
  products: Array<Product> = new Array<Product>();
  image: Array<Image> = new Array<Image>();
  pageNumber: number = 1;
  f: any;
  user: any;

  constructor(
    private userServices: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userServices.getUsername();
    this.userServices.getListProduct().subscribe(data => {
      this.product = data;
      this.product.forEach(item => {
        if (item.status == 1){
          this.products.push(item);
        }
      })
    });
    this.userServices.getListImage().subscribe(data => {
      this.image = data;
    });
  }
  // buy(id: number){
  //   this.userServices.getProduct(id).subscribe(item => {
  //     // this.router.navigate(['/show?id=', item.id]);
  //   });
  //
  // }

  signOut() {
    this.userServices.signOut();
    this.router.navigate(['/']);
  }
}
