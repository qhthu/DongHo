export class Order {

  public id: number;
  public total: number;
  public userId: number;
  public status: number;
  public create_at: number;
  public update_at: number;


  constructor(id: number, total: number, userId: number, status: number, create_at: number, update_at: number) {
    this.id = id;
    this.total = total;
    this.userId = userId;
    this.status = status;
    this.create_at = create_at;
    this.update_at = update_at;
  }
}
