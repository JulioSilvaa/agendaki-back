import Create_Address from "src/core/useCases/address/Create";
import Delete_Address from "src/core/useCases/address/Delete";
import Address_RepositoryInMemory from "src/infra/repositoryInMemory/address/Address_RepositoryInMemory";
import { beforeEach, describe, expect, test } from "vitest";
import Address_Entity from "src/core/entities/Address_Entity";
import Update_Address from "src/core/useCases/address/Update";
import Find_AddressById from "src/core/useCases/address/FindById";

describe("Teste unitário para criação de endereço", () => {
  const addressData: Address_Entity = {
    city: "São Paulo",
    street: "Avenida Paulista",
    zipcode: "01310-000",
    neighborhood: "Bela Vista",
    state: "SP",
    complemente: "Casa 199099",
  };

  let addressRepositoryMemory: Address_RepositoryInMemory;
  let createAddress: Create_Address;
  let deleteAddress: Delete_Address;
  let findAddress: Find_AddressById;
  let updateAddress: Update_Address;

  beforeEach(() => {
    addressRepositoryMemory = new Address_RepositoryInMemory();
    createAddress = new Create_Address(addressRepositoryMemory);
    deleteAddress = new Delete_Address(addressRepositoryMemory);
    findAddress = new Find_AddressById(addressRepositoryMemory);
    updateAddress = new Update_Address(addressRepositoryMemory);
  });

  test("Deve criar um endereço com sucesso", async () => {
    const createdAddress = await createAddress.execute(addressData);

    expect(createdAddress).toHaveProperty("id");
    expect(createdAddress.city).toBe(addressData.city);
    expect(createdAddress.street).toBe(addressData.street);
    expect(createdAddress.zipcode).toBe(addressData.zipcode);
    expect(createdAddress.neighborhood).toBe(addressData.neighborhood);
    expect(createdAddress.state).toBe(addressData.state);

    const savedAddress = await addressRepositoryMemory.findById(
      createdAddress.id
    );
    expect(savedAddress).toBeDefined();
    expect(savedAddress?.id).toBe(createdAddress.id);
  });

  test("Deve retornar todos os endereços criados", async () => {
    const address1 = await createAddress.execute({
      ...addressData,
      city: "Rio de Janeiro",
    });
    const address2 = await createAddress.execute({
      ...addressData,
      city: "Belo Horizonte",
    });

    const allAddresses = await addressRepositoryMemory.findAll();
    expect(allAddresses).toHaveLength(2);
    expect(allAddresses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: address1.id, city: "Rio de Janeiro" }),
        expect.objectContaining({ id: address2.id, city: "Belo Horizonte" }),
      ])
    );
  });

  test("Deve retornar erro ao tentar criar um endereço com dados inválidos", async () => {
    const invalidAddressData = { ...addressData, zipcode: "" };

    await expect(createAddress.execute(invalidAddressData)).rejects.toThrow(
      "Zipcode is required"
    );
  });

  test("Deve apagar um endereço por id se o id for válido", async () => {
    const newAddress = await createAddress.execute(addressData);
    expect(newAddress).toBeDefined();
    expect(newAddress.city).toBe(addressData.city);

    const createdAddress = await findAddress.execute(newAddress.id);
    expect(createdAddress).toBeDefined();

    await deleteAddress.execute(newAddress.id);

    try {
      await findAddress.execute(newAddress.id);
    } catch (error) {
      expect(error.message).toBe("endereço não encontrado");
    }
  });

  test("Deve retornar erro se a lista de endereços estiver vazia", async () => {
    await expect(addressRepositoryMemory.findAll()).rejects.toThrow(
      "Lista de endereços vazia"
    );
  });

  test("Deve atualizar um endereço com sucesso", async () => {
    const createdAddress = await createAddress.execute(addressData);

    const updatedData = new Address_Entity({
      ...createdAddress,
      city: "Rio de Janeiro",
      street: "Avenida Atlântica",
      zipcode: "22010-000",
    });

    const updatedAddress = await updateAddress.execute(updatedData);

    expect(updatedAddress.city).toBe("Rio de Janeiro");
    expect(updatedAddress.street).toBe("Avenida Atlântica");
    expect(updatedAddress.zipcode).toBe("22010-000");

    const savedUpdatedAddress = await addressRepositoryMemory.findById(
      updatedAddress.id
    );
    expect(savedUpdatedAddress).toBeDefined();
    expect(savedUpdatedAddress?.city).toBe("Rio de Janeiro");
  });

  test("Deve retornar erro ao tentar atualizar um endereço não encontrado", async () => {
    const nonExistentAddress = new Address_Entity({
      id: "non-existent-id",
      city: "São Paulo",
      street: "Rua Teste",
      zipcode: "00000-000",
      neighborhood: "Centro",
      state: "SP",
    });

    await expect(updateAddress.execute(nonExistentAddress)).rejects.toThrow(
      "Endereço não encontrado"
    );
  });
});
