import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/client/login/login.component";
import {RegisterComponent} from "./component/client/register/register.component";
import {HomeComponent} from "./component/client/home/home.component";
import {ProductComponent} from "./component/client/product/product.component";
import {ShowComponent} from "./component/client/show/show.component";
import {CartComponent} from "./component/client/cart/cart.component";
import { NgxLoadingModule } from 'ngx-loading';
import {PaymentComponent} from "./component/client/payment/payment.component";
import {AdminComponent} from "./component/admin-form/admin/admin.component";
import {EditComponent} from "./component/admin-form/edit/edit.component";
import {DataTableComponent} from "./component/admin-form/data-table/data-table.component";
import {AccountComponent} from "./account/account.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'manager/account/:userId', component: AccountComponent},
  {path: 'product', component: ProductComponent},
  {path: 'payment/:orderId', component: PaymentComponent},
  {path: 'cart', component: CartComponent},
  {path: 'edit', component: EditComponent},
  {path: 'data.dongho.vn', component: DataTableComponent},
  {path: 'admin.dongho.vn', component: AdminComponent},
  {path: 'show/:id', component: ShowComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgxLoadingModule.forRoot({})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
