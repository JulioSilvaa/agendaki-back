import { randomUUID } from "crypto";
import Customer_Entity from "src/core/entities/Customer_Entity";
import ICustomer_Repository from "src/core/repositories/Customer_Repository";

export default class Create_Customer {
  _customerRepository: ICustomer_Repository;
  constructor(customerRepository: ICustomer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute({
    customerId,
    customerName,
    customerEmail,
    customerPassword,
  }: Customer_Entity) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(customerEmail)) {
      throw new Error("Email inválido");
    }

    if (customerPassword.length <= 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }

    const newCustomer = await this._customerRepository.save({
      customerId: randomUUID(),
      customerEmail,
      customerName,
      customerPassword,
    });

    return newCustomer;
  }
}
