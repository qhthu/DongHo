export class Address {
  private id: number;
  private city: string;
  private district: string;
  private address: string;


  constructor(id: number, city: string, district: string, address: string) {
    this.id = id;
    this.city = city;
    this.district = district;
    this.address = address;
  }
}
