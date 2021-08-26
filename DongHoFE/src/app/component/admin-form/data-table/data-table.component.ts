import { Component, OnInit } from '@angular/core';
import {Gender} from "../../../class/gender";
import {Product} from "../../../class/product";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  product: Array<Product> = new Array<Product>();
  an: any = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
  }
  ngOnInit(): void {
    if(top.location != self.location){
      top.location = self.location;
    }

    this.userService.getListProduct().subscribe(data => {
      this.product = data;
    })
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Xóa xong thì không thu hồi được đâu',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Hong',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteProduct(id).subscribe(data => {
          if(data == "OK"){
            Swal.fire('Thành công!', 'Xóa sản phẩm thành công', 'success');
            location.reload();
          }
        })
      } else if (result.isDismissed) {
      }
    })

  }
}
