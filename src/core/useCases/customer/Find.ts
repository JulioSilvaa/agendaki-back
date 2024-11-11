import Customer_Entity from "src/core/entities/Customer_Entity";
import ICustomer_Repository from "src/core/repositories/Customer_Repository";
import Customer_Repository from "src/core/repositories/Customer_Repository";

export default class Find_CustomersList {
  private _customerRepository: ICustomer_Repository;
  constructor(customerRepository: ICustomer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(): Promise<Customer_Entity[]> {
    const costumerList = await this._customerRepository.find();
    if (costumerList.length === 0) {
      throw new Error("Lista de clientes esta vazia");
    }
    return costumerList;
  }
}
