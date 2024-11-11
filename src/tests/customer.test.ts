import Create_Customer from "src/core/useCases/customer/Create";
import Find_CustomersList from "src/core/useCases/customer/Find";
import Find_CustomerByEmail from "src/core/useCases/customer/FindByEmail";
import Find_CustomerByID from "src/core/useCases/customer/FindById";
import Customer_RepositoryInMemory from "src/infra/repositories/customer/Customer_Repository";
import { describe, expect, test } from "vitest";

describe("Teste unitário para customer", () => {
  const user = {
    customerName: "julio",
    customerEmail: "julio@teste.com",
    customerPassword: "23234234",
  };

  test("Deveria criar um novo customer", async () => {
    const customerRepositoryMemory = new Customer_RepositoryInMemory();
    const criarCustomer = new Create_Customer(customerRepositoryMemory);
    const newCustomer = await criarCustomer.execute(user);
    console.log(newCustomer);
  });

  test("Deveria retornar uma lista de customers", async () => {
    const customerRepositoryMemory = new Customer_RepositoryInMemory();
    const criarCustomer = new Find_CustomersList(customerRepositoryMemory);
    const newCustomer = await criarCustomer.execute();
    expect(newCustomer.length).toBe(2);
    const customer = newCustomer[0];
    expect(customer.customerName).toBe("julio");
    expect(customer.customerEmail).toBe("julio@teste.com");
    expect(customer.customerPassword).toBe("23234234");
  });

  test("Deveria retornar o customer com o ID fornecido", async () => {
    const customerRepositoryMemory = new Customer_RepositoryInMemory();
    const criarCustomer = new Find_CustomerByID(customerRepositoryMemory);
    const newCustomer = await criarCustomer.execute("2");
    expect(newCustomer).toBeDefined();
    expect(newCustomer?.customerId).toBe("2");
    expect(newCustomer?.customerName).toBe("joão");
  });

  test("Deveria retornar undefined para um ID que não existe", async () => {
    const customerRepositoryMemory = new Customer_RepositoryInMemory();
    const criarCustomer = new Find_CustomerByID(customerRepositoryMemory);
    await expect(criarCustomer.execute("999")).rejects.toThrowError(
      "Customer with id 999 not found."
    );
  });

  test("Deveria lançar um erro com a mensagem 'Customer with email notfound@example.com not found.' para um email que não existe", async () => {
    const customerRepositoryMemory = new Customer_RepositoryInMemory();
    const findCustomerByEmail = new Find_CustomerByEmail(
      customerRepositoryMemory
    );

    await expect(
      findCustomerByEmail.execute("notfound@example.com")
    ).rejects.toThrowError(
      "Customer with email notfound@example.com not found."
    );
  });

  test("Deveria retornar o cliente com o email correto", async () => {
    const customerRepositoryMemory = new Customer_RepositoryInMemory();
    const findCustomerByEmail = new Find_CustomerByEmail(
      customerRepositoryMemory
    );

    const customer = await findCustomerByEmail.execute("julio@teste.com");

    expect(customer).toBeDefined();
    expect(customer.customerEmail).toBe("julio@teste.com");
    expect(customer.customerName).toBe("julio");
  });
});
