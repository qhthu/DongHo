import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  user: any;
  constructor(
    private userServices: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userServices.getUsername();
    const routeParams = this.route.snapshot.paramMap;
    const orderId = Number(routeParams.get('orderId'));
    console.log(orderId);
  }

  signOut() {
    this.userServices.signOut();
    this.router.navigate(['/']);
  }
}
