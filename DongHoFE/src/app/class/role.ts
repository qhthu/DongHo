export class Role {

  private id: number;
  private name: string;
  private create_at: number;
  private update_at: number;


  constructor(id: number, name: string, create_at: number, update_at: number) {
    this.id = id;
    this.name = name;
    this.create_at = create_at;
    this.update_at = update_at;
  }
}
