export class Product {
  public id: number;
  public model: string;
  public brand: string;
  public gender: number;
  public quantity: number;
  public description: string;
  public price: number;
  public status: number;
  public create_at: number;
  public update_at: number;
  public discount: number;
  public sell: number;
  public image: string;


  constructor(id: number, model: string, brand: string, gender: number, quantity: number, description: string, price: number, status: number, create_at: number, update_at: number, discount: number, sell: number, image: string) {
    this.id = id;
    this.model = model;
    this.brand = brand;
    this.gender = gender;
    this.quantity = quantity;
    this.description = description;
    this.price = price;
    this.status = status;
    this.create_at = create_at;
    this.update_at = update_at;
    this.discount = discount;
    this.sell = sell;
    this.image = image;
  }
}
