import Customer_Entity from "src/core/entities/Customer_Entity";
import ICustomer_Repository from "src/core/repositories/Customer_Repository";

export default class Customer_RepositoryInMemory
  implements ICustomer_Repository
{
  customerList: Customer_Entity[] = [
    {
      customerName: "julio",
      customerEmail: "julio@teste.com",
      customerPassword: "23234234",
    },
    {
      customerId: "2",
      customerName: "joão",
      customerEmail: "joão@teste.com",
      customerPassword: "23234234",
    },
  ];

  async create({
    customerName,
    customerEmail,
    customerPassword,
  }: Customer_Entity): Promise<Customer_Entity> {
    const newCustomer: Customer_Entity = {
      customerId: (this.customerList.length + 1).toString(),
      customerName,
      customerEmail,
      customerPassword,
    };

    this.customerList.push(newCustomer);

    return newCustomer;
  }

  async find(): Promise<Customer_Entity[]> {
    return this.customerList;
  }

  async findById(id: string): Promise<Customer_Entity> {
    const customerFound = this.customerList.find(
      (customer) => customer.customerId === id
    );

    if (!customerFound) {
      throw new Error(`Customer with id ${id} not found.`);
    }
    return customerFound;
  }

  async findByEmail(email: string): Promise<Customer_Entity> {
    const customerFound = this.customerList.find(
      (customer) => customer.customerEmail === email
    );

    if (!customerFound) {
      throw new Error("Customer with email notfound@example.com not found.");
    }
    return customerFound;
  }

  async delete(id: string): Promise<Customer_Entity> {
    const customerDeleted = this.customerList.find(
      (customer) => customer.customerId === id
    );
    if (!customerDeleted) {
      throw new Error("Cliente não encontrado!");
    }
    return Promise.resolve(customerDeleted);
  }

  async update(
    id: string,
    updatedCustomer: Customer_Entity
  ): Promise<Customer_Entity> {
    const index = this.customerList.findIndex(
      (customer) => customer.customerId === id
    );

    if (index === -1) {
      throw new Error(`Customer with id ${id} not found.`);
    }

    this.customerList[index] = updatedCustomer;
    return updatedCustomer;
  }
}
