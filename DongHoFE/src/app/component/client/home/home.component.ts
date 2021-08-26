import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {Product} from "../../../class/product";
import {Image} from "../../../class/image";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  id: any;
  count: any;
  newProduct: Array<Product> = new Array<Product>();
  saleProduct: Array<Product> = new Array<Product>();
  image: Array<Image> = new Array<Image>();
  constructor(
    private userServices: UserService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.userServices.getListNewProduct().subscribe(data => {
      this.newProduct = data;
    });
    this.userServices.getListImage().subscribe(data => {
      this.image = data;
    });
    this.userServices.getListSaleProduct().subscribe(data => {
      this.saleProduct = data;
    });
    if(this.userServices.getUsername() != null){
      this.user= this.userServices.getUsername();
      this.userServices.getUser(this.user).subscribe(data => {
        console.log(data.id)
        this.id = data.id;
      });
    }
    this.userServices.countCartByUserName(this.user).subscribe(data => {
      this.count= data;
    });


  }

  signOut() {
    this.userServices.signOut();
    this.router.navigate(['/']);
  }
}
