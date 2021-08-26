import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {User} from "../../../class/user";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DongHoFE'
  // user: User;
  srcMainImg = 'assets/img/mainImg.jpg';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    // this.user = new User(0,"","","","",0,0,"","",1,1,1, 0,0);
  }
}
