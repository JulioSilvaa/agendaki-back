import Customer_Entity from "src/core/entities/Customer_Entity";
import ICustomer_Repository from "src/core/repositories/Customer_Repository";

export default class Delete_Customer {
  private customerRepository;
  constructor(customerRepository: ICustomer_Repository) {
    this.customerRepository = customerRepository;
  }

  async execute(id: string): Promise<Customer_Entity> {
    const customerDeleted = await this.customerRepository.delete(id);
    return customerDeleted;
  }
}
