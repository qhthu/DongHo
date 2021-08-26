import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/client/index/app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./service/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { RegisterComponent } from './component/client/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {LoginComponent} from "./component/client/login/login.component";
import {HomeComponent} from "./component/client/home/home.component";
import {ProductComponent} from "./component/client/product/product.component";
import { ShowComponent } from './component/client/show/show.component';
import {CartComponent} from "./component/client/cart/cart.component";
import { BotDetectCaptchaModule } from 'angular-captcha';
// import { NgxSpinnerModule } from "ngx-spinner";
import * as $ from 'jquery';
import { PaymentComponent } from './component/client/payment/payment.component';
import { AdminComponent } from './component/admin-form/admin/admin.component';
import { EditComponent } from './component/admin-form/edit/edit.component';
import { DataTableComponent } from './component/admin-form/data-table/data-table.component';
import {AppSidebarModule} from "@coreui/angular";
import { NgxCaptchaModule } from 'ngx-captcha';
import { AccountComponent } from './account/account.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CartComponent,
    RegisterComponent,
    ProductComponent,
    ShowComponent,
    PaymentComponent,
    AdminComponent,
    EditComponent,
    DataTableComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    // NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BotDetectCaptchaModule,
    IvyCarouselModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    AppSidebarModule
  ],
  providers: [UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
