export class User {

  public id: number;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public email: string;
  public dob: number;
  public gender: number;
  public username: string;
  public password: string;
  public status: number;
  public roleId: string;
  public addressId: number;
  public create_at: number;
  public update_at: number;


  constructor(id: number, firstName: string, lastName: string, phone: string, email: string, dob: number, gender: number, username: string, password: string, status: number, roleId: string, addressId: number, create_at: number, update_at: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.dob = dob;
    this.gender = gender;
    this.username = username;
    this.password = password;
    this.status = status;
    this.roleId = roleId;
    this.addressId = addressId;
    this.create_at = create_at;
    this.update_at = update_at;
  }
}
