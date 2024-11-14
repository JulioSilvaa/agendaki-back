import Customer_Entity from "../entities/Customer_Entity";

export default interface ICustomer_Repository {
  save({
    customerName,
    customerEmail,
    customerPassword,
  }: Customer_Entity): Promise<Customer_Entity>;
  find(): Promise<Customer_Entity[]>;
  findById(id: string): Promise<Customer_Entity>;
  findByEmail(email: string): Promise<Customer_Entity>;
  delete(id: string): Promise<Customer_Entity>;
  update(id: string, updatedCustomer: any): Promise<Customer_Entity>;
}
