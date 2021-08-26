import {Component, Directive, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import * as shajs from 'hash.js';
import {User} from "../../../class/user";
import {Auth} from "../../../class/auth";
import Swal from "sweetalert2";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
  }

  @Directive({
    selector: '[toggle]'
  })
  title = 'angularclient';
  user: User;
  date: any;
  hide = true;
  srcMainImg = 'assets/img/mainImg.jpg';

  auth: Auth= new Auth("", "");
  show: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user = new User(0,"","","","",0,1,"","",1,"Customer",1, 0,0);
  }
  onSubmit() {
    this.date = new Date();
    this.user.password = shajs.sha256().update(this.user.password).digest("hex");
    this.user.create_at = this.date;
    this.userService.save(this.user).subscribe(data =>
    {
      if(data != null){
        Swal.fire('Thành công!', 'Đăng ký thành công', 'success');
        this.gotoFinish()
      }
      else {
        Swal.fire('Thất bại!', 'Tên tài khoản đã tồn tại!', 'error');
        location.reload();
      }
    });
  }
  gotoFinish() {
    this.router.navigate(['/']);
  }
}
