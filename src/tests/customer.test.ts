import Create_Customer from "src/core/useCases/customer/Create";
import Find_CustomersList from "src/core/useCases/customer/Find";
import Find_CustomerByEmail from "src/core/useCases/customer/FindByEmail";
import Find_CustomerByID from "src/core/useCases/customer/FindById";
import Delete_Customer from "src/core/useCases/customer/Delete";
import Edite_Customer from "src/core/useCases/customer/Edite";
import Customer_RepositoryInMemory from "src/infra/repositoryInMemory/customer/Customer_Repository";
import { beforeEach, describe, expect, test } from "vitest";

describe("Teste unitário para Customer", () => {
  const user = {
    customerName: "julio",
    customerEmail: "julio@teste.com",
    customerPassword: "23234234",
  };

  let customerRepositoryMemory: Customer_RepositoryInMemory;

  beforeEach(() => {
    customerRepositoryMemory = new Customer_RepositoryInMemory();
  });

  test("Deveria criar um novo customer", async () => {
    const createCustomer = new Create_Customer(customerRepositoryMemory);
    const newCustomer = await createCustomer.execute(user);

    expect(newCustomer).toBeDefined();
    expect(newCustomer.customerName).toBe(user.customerName);
    expect(newCustomer.customerEmail).toBe(user.customerEmail);
    expect(newCustomer.customerPassword).toBe(user.customerPassword);
    expect(newCustomer.customerId).toBeDefined();
  });

  test("Deveria retornar uma lista de customers", async () => {
    const createCustomer = new Create_Customer(customerRepositoryMemory);
    await createCustomer.execute(user);

    const findCustomers = new Find_CustomersList(customerRepositoryMemory);
    const customers = await findCustomers.execute();

    expect(customers.length).toBeGreaterThan(0);
    const customer = customers[0];
    expect(customer.customerName).toBe(user.customerName);
    expect(customer.customerEmail).toBe(user.customerEmail);
    expect(customer.customerPassword).toBe(user.customerPassword);
  });

  test("Deveria retornar o customer com o ID fornecido", async () => {
    const createCustomer = new Create_Customer(customerRepositoryMemory);
    const newCustomer = await createCustomer.execute(user);

    const findCustomerById = new Find_CustomerByID(customerRepositoryMemory);
    const customer = await findCustomerById.execute(newCustomer.customerId);

    expect(customer).toBeDefined();
    expect(customer.customerId).toBe(newCustomer.customerId);
    expect(customer.customerName).toBe(newCustomer.customerName);
  });

  test("Deveria lançar um erro quando buscar um customer com um ID inexistente", async () => {
    const findCustomerById = new Find_CustomerByID(customerRepositoryMemory);

    await expect(findCustomerById.execute("999")).rejects.toThrowError(
      "Customer with id 999 not found."
    );
  });

  test("Deveria lançar um erro com a mensagem correta quando email não encontrado", async () => {
    const findCustomerByEmail = new Find_CustomerByEmail(
      customerRepositoryMemory
    );

    await expect(
      findCustomerByEmail.execute("notfound@example.com")
    ).rejects.toThrowError(
      "Customer with email notfound@example.com not found."
    );
  });

  test("Deveria retornar o cliente correto pelo email", async () => {
    const createCustomer = new Create_Customer(customerRepositoryMemory);
    const newCustomer = await createCustomer.execute(user);

    const findCustomerByEmail = new Find_CustomerByEmail(
      customerRepositoryMemory
    );
    const customer = await findCustomerByEmail.execute(user.customerEmail);

    expect(customer).toBeDefined();
    expect(customer.customerEmail).toBe(user.customerEmail);
    expect(customer.customerName).toBe(user.customerName);
  });

  test("Deveria apagar o cliente com o ID fornecido", async () => {
    const createCustomer = new Create_Customer(customerRepositoryMemory);
    const newCustomer = await createCustomer.execute(user);

    const deleteCustomer = new Delete_Customer(customerRepositoryMemory);
    const deletedCustomer = await deleteCustomer.execute(
      newCustomer.customerId
    );

    expect(deletedCustomer).toEqual(newCustomer);
  });

  test("Deveria lançar um erro quando tentar apagar um cliente que não existe", async () => {
    const deleteCustomer = new Delete_Customer(customerRepositoryMemory);

    await expect(deleteCustomer.execute("999")).rejects.toThrowError(
      "Cliente não encontrado!"
    );
  });

  // Teste para o caso de edição de um cliente
  test("Deveria editar os dados de um cliente", async () => {
    const createCustomer = new Create_Customer(customerRepositoryMemory);
    const newCustomer = await createCustomer.execute(user);

    // Dados a serem atualizados
    const updatedData = {
      customerName: "Julio Silva",
      customerEmail: "julio.silva@teste.com",
    };

    const editeCustomer = new Edite_Customer(customerRepositoryMemory);
    const updatedCustomer = await editeCustomer.execute(
      newCustomer.customerId,
      updatedData
    );

    expect(updatedCustomer.customerId).toBe(newCustomer.customerId);
    expect(updatedCustomer.customerName).toBe(updatedData.customerName);
    expect(updatedCustomer.customerEmail).toBe(updatedData.customerEmail);
    expect(updatedCustomer.customerPassword).toBe(newCustomer.customerPassword);
    console.log(updatedCustomer);
  });

  test("Deveria lançar erro quando tentar editar um cliente inexistente", async () => {
    const editeCustomer = new Edite_Customer(customerRepositoryMemory);

    await expect(
      editeCustomer.execute("999", { customerName: "Novo Nome" })
    ).rejects.toThrowError("Customer with id 999 not found.");
  });
});
