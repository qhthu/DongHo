import { Injectable } from '@angular/core';
import { User } from '../class/user';
import {HttpClient, HttpHeaders, HttpRequest, HttpClientModule} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Product} from "../class/product";
import {Image} from "../class/image";
import {Status} from "../class/status";
import {Order} from "../class/order";
import {OrderDetail} from "../class/order-detail";
import {Gender} from "../class/gender";

const token_key = "token-key";
const user_key = "user-key";
const cart_key = "cart-key";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string = "http://localhost:8080";


  headers: any;
  tokenStr: any;
  httpOptions: any;
  private currentUserSubject: BehaviorSubject<User> ;
  public currentUser: Observable<User> ;


  rememberMe(remember: boolean , username: string, password: string){
    if(remember){
      this.cookiesService.put(username, username);
      this.cookiesService.put(password, password);
    }
  }
  getCookies(username: string): boolean{
    if(localStorage.getItem(username) != null){
      return true;
    }
    return false;
  }
  // token: string = "";
  // username: string = "";
  constructor(private httpClient: HttpClient,
              private cookiesService: CookieService) {
    this.tokenStr = this.getToken();
    this.headers = new HttpHeaders().set('Authorization', this.tokenStr);
    this.currentUserSubject = new BehaviorSubject<User>({
      addressId: 0,
      create_at: 0,
      dob: 0,
      email: "",
      firstName: "",
      gender: 0,
      id: 0,
      lastName: "",
      password: "",
      phone: "",
      roleId: "",
      status: 0,
      update_at: 0,
      username: ""
    });
    this.currentUser = new BehaviorSubject<User>({
      addressId: 0,
      create_at: 0,
      dob: 0,
      email: "",
      firstName: "",
      gender: 0,
      id: 0,
      lastName: "",
      password: "",
      phone: "",
      roleId: "",
      status: 0,
      update_at: 0,
      username: ""
    });
  }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    // localStorage.removeItem(token_key);
    // localStorage.setItem(token_key, token);
    window.localStorage.removeItem(token_key);
    window.localStorage.setItem(token_key, token);
  }

  public getToken(): string {
    return <string>localStorage.getItem(token_key);
  }

  public saveUser(username: string): void {
    // window.localStorage.removeItem(user_key);
    // window.localStorage.setItem(user_key, username);
    window.localStorage.setItem(cart_key, username);
  }

  public getUsername(): any {
    const uname = window.localStorage.getItem(cart_key);
    if (uname) {
      return uname;
    }
    return "";
  }

  public generateToken(request:any){
    return this.httpClient.post<String>(this.usersUrl+"/api/public/generate", request, {  responseType: 'text' as 'json'});
  }

  public authenticate(token: any) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return headers;
  }

  public getUser(username:string) {
    let headers = this.authenticate(this.getToken());
    return this.httpClient.get<User>(this.usersUrl+"/api/public/user/get?username="+username, {headers, responseType: 'json' });
  }
  public getUserById(id:number) {
    let headers = this.authenticate(this.getToken());
    return this.httpClient.get<User>(this.usersUrl+"/api/private/user/getuserbyid?id="+id, {headers, responseType: 'json' });
  }

  // public deleteUserById(id:number) {
  //   return this.httpClient.get(this.usersUrl+"/api/public/user/deleteuserbyid?id="+id);
  // }
  public deleteUserById(id:number) {
    let headers = this.authenticate(this.getToken());
    return this.httpClient.get(this.usersUrl+"/api/private/user/deleteuserbyid?id="+id, {headers, responseType: 'json' });
  }

  public findAll(): Observable<any> {
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<User[]>(this.usersUrl + "/api/private/user/list", {headers, responseType: 'json' } );
  }

  public countCartByUserName(username: string){
    return this.httpClient.get(this.usersUrl + "/api/public/cartnumber?username="+username );
  }

  public getListNewProduct(): Observable<any> {
    return this.httpClient.get<Product[]>(this.usersUrl + "/api/public/product/listnew" );
  }

  public getListSaleProduct(): Observable<any> {
    return this.httpClient.get<Product[]>(this.usersUrl + "/api/public/product/listsale" );
  }

  public getListImage(): Observable<any> {
    return this.httpClient.get<Image[]>(this.usersUrl + "/api/public/image/list" );
  }

  public getListProduct(): Observable<any> {
    return this.httpClient.get<Product[]>(this.usersUrl + "/api/public/product/list" );
  }

  public getListOrderDetail(): Observable<any> {
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<OrderDetail[]>("http://localhost:8080/api/private/od/list", {headers, responseType: 'json' } );
  }

  public getProduct(id: number): Observable<any> {
    return this.httpClient.get<Product>(this.usersUrl + "/api/public/product/get?id="+id);
  }

  public deleteProduct(id: number){
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get(this.usersUrl + "/api/private/product/update?id="+id, {headers, responseType: 'json' } );
  }

  public updateOrderId(id: number, orderId: number){
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get(this.usersUrl + "/api/private/od/update?id="+id+"&orderId="+orderId, {headers, responseType: 'json' } );
  }
  public getListGender(): Observable<any> {
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Gender[]>(this.usersUrl + "/api/private/gender/list", {headers, responseType: 'json' } );
  }
  public save(user: User) {
    return this.httpClient.post<User>(this.usersUrl + "/api/public/user/create", user);
  }

  public saveProduct(prod: Product) {
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.post<Product>(this.usersUrl + "/api/private/product/create", prod, {headers, responseType: 'json' } );
  }

  public saveOrder(order: Order) {
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.post<Order>(this.usersUrl + "/api/private/order/create", order, {headers, responseType: 'json' } );
  }

  public saveOrderDetail(detail: OrderDetail) {
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    console.log(detail);
    return this.httpClient.post<OrderDetail>("http://localhost:8080/api/private/od/create", detail, {headers, responseType: 'json' } );
  }

  // public sendMail(mail: string) {
  //   return this.httpClient.get<string>(this.usersUrl+"/sendemail?email="+mail);
  // }
  //
  // public delete(username: string){
  //   let tokenStr = 'Bearer ' + this.getToken();
  //   const headers = new HttpHeaders().set('Authorization', tokenStr);
  //   return this.httpClient.delete("http://localhost:8080/delete?uname="+username, {headers, responseType: 'json' });
  // }
}
