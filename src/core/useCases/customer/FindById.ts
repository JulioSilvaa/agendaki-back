import Customer_Entity from "src/core/entities/Customer_Entity";
import ICustomer_Repository from "src/core/repositories/Customer_Repository";

export default class Find_CustomerByID {
  private _customerRepository: ICustomer_Repository;
  constructor(customerRepository: ICustomer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(id: string): Promise<Customer_Entity> {
    if (!id || typeof id !== "string") {
      throw new Error("Forneça um id válido");
    }

    const customerFound = await this._customerRepository.findById(id);

    if (!customerFound) {
      throw new Error("Customer with email notfound@example.com not found.");
    }
    return customerFound;
  }
}
