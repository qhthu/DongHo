import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }


  sidebarMinimized: boolean = false;
  // navItems: any = navItems;

  toggleMinimize(e: any) {
    this.sidebarMinimized = e;
  }
  ngOnInit(): void {
    $('.home').click(function (e) {
      e.preventDefault();
      $('.home_drop').fadeToggle();
    });

    $('.form').click(function (e) {
      e.preventDefault();
      $('.form_drop').fadeToggle();
    });
  }

}
