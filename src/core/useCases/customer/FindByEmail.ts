import Customer_Entity from "src/core/entities/Customer_Entity";
import ICustomer_Repository from "src/core/repositories/Customer_Repository";

export default class Find_CustomerByEmail {
  private _customerRepository: ICustomer_Repository;
  constructor(customerRepository: ICustomer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(email: string): Promise<Customer_Entity> {
    const customerFound = await this._customerRepository.findByEmail(email);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      throw new Error("Customer with email notfound@example.com not found.");
    }

    return customerFound;
  }
}
