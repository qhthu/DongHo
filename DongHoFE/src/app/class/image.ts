export class Image {

  public id: number;
  public url: string;
  public productId: number;


  constructor(id: number, url: string, productId: number) {
    this.id = id;
    this.url = url;
    this.productId = productId;
  }
}
