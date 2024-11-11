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
  }: Customer_Entity): Promise<void> {
    this.customerList.push({
      customerName,
      customerEmail,
      customerPassword,
    });
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
}
