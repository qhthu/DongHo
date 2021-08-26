import { Component, OnInit } from '@angular/core';
import {Product} from "../../../class/product";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {User} from "../../../class/user";
import Swal from "sweetalert2";
import {Gender} from "../../../class/gender";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  date: any;
  gender: Array<Gender> = new Array<Gender>();
  product: Product = new Product(0,"","",0,0,"",0,1,0,0,0,0,"");
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getListGender().subscribe(data => {
      this.gender = data;
    })
  }

  save() {
    this.date= new Date();
    this.product.create_at = this.date;
    this.userService.saveProduct(this.product).subscribe(data => {
      console.log(data.gender)
    });
    Swal.fire('Thành công!', 'Thêm sản phẩm thành công', 'success');
  }
}
