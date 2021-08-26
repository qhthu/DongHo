export class OrderDetail {

  public id: number;
  public orderid: number;
  public productId: number;
  public quantity: number;
  public userId: number;


  constructor(id: number, orderid: number, productId: number, quantity: number, userId: number) {
    this.id = id;
    this.orderid = orderid;
    this.productId = productId;
    this.quantity = quantity;
    this.userId = userId;
  }
}
