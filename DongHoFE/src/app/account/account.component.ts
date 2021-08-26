import { Component, OnInit } from '@angular/core';
import {User} from "../class/user";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User = new User(0,"","","","",0,0,"","",0,"",0, 0,0);

  constructor(
    private userServices: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userID = Number(routeParams.get('userId'));
    this.userServices.getUserById(userID).subscribe(data => {
      this.user = data;
    });
  }

  deleteAccount(id: number) {
    this.userServices.deleteUserById(id).subscribe();
    this.router.navigate(['/']);
  }
}
