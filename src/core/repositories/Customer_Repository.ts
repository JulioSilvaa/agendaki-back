import Customer_Entity from "../entities/Customer_Entity";

export default interface ICustomer_Repository {
  create({
    customerName,
    customerEmail,
    customerPassword,
  }: Customer_Entity): Promise<void>;
  find(): Promise<Customer_Entity[]>;
  findById(id: string): Promise<Customer_Entity>;
  findByEmail(email: string): Promise<Customer_Entity>;
}
