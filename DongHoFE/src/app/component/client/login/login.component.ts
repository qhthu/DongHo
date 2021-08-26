import { Component, OnInit } from '@angular/core';
import {User} from "../../../class/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import * as shajs from 'hash.js';
import Swal from "sweetalert2";
import { ReCaptchaV3Service } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  attack: any;
  response: any;
  authRequest:any;
  users: User[]=[];
  loginform: FormGroup;
  uname: string = "";
  check: boolean = true;
  passwd: string = "";
  str: String = "afsgdf";
  srcMainImg = 'assets/img/mainImg.jpg';
  show: any;

  siteKey: string = "6LdeWuUbAAAAAAwIChGTskeJPbNJlt6zg1OGv-SU";
  user: User = new User(0,"","","","",0,0,"","",1,"Customer",1, 0,0);
  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private userService: UserService) {

    this.loginform = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: new FormControl(false),
      // recaptcha: ['', Validators.required]
    });
  }

  onSubmit(){
    this.loginform.value.password = shajs.sha256().update( this.loginform.value.password).digest("hex");
    this.authRequest = JSON.parse(JSON.stringify({username: this.loginform.value.username, password: this.loginform.value.password}));
    let resp = this.userService.generateToken(this.authRequest);
    resp.subscribe(data=> {
      if(data == "block"){
        console.log("dhjggrerjhkghrtj")
        Swal.fire('Đăng nhập thất bại!', 'IP đã  bị chặn, vui lòng thử lại.', 'error');
        this.router.navigate(['']);
      }else{
        if(data == "not"){
          Swal.fire('Đăng nhập thất bại!', 'Tên tài khoản hoặc mật khẩu không chính xác.', 'error');
          this.router.navigate(['']);
        }else{
          this.userService.saveToken(data.toString());
          this.userService.saveUser(this.loginform.value.username);
          Swal.fire('Thành công!', 'Đăng nhập thành công', 'success');
          this.router.navigate(['/home']);
        }
      }

    });
  }

  ngOnInit(): void {
    this.reCaptchaV3Service.execute(this.siteKey, 'homepage', (token) => {
      console.log('This is your token: ', token);
    }, {
      useGlobalDomain: false
    });
  }

}
