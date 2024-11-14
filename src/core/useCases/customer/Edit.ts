import Customer_Entity from "src/core/entities/Customer_Entity";
import ICustomer_Repository from "src/core/repositories/Customer_Repository";

export default class Edite_Customer {
  private customerRepository: ICustomer_Repository;

  constructor(customerRepository: ICustomer_Repository) {
    this.customerRepository = customerRepository;
  }

  async execute(id: string, updatedData: any): Promise<Customer_Entity> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new Error(`Customer with id ${id} not found.`);
    }

    const updatedCustomer = {
      ...customer,
      ...updatedData,
    };

    return await this.customerRepository.update(id, updatedCustomer);
  }
}
