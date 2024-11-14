import { randomUUID } from "crypto";
import Address_Entity from "src/core/entities/Address_Entity";
import Address_Repository from "src/core/repositories/Address_Repository";

export default class Address_RepositoryInMemory implements Address_Repository {
  addressList: Address_Entity[] = [];

  async save(props: Address_Entity): Promise<Address_Entity> {
    const newAddress = new Address_Entity({
      id: randomUUID(),
      ...props,
    });

    this.addressList.push(newAddress);

    return newAddress;
  }

  async findById(id: string): Promise<Address_Entity> {
    const addressFound = await this.addressList.find(
      (address) => address.id === id
    );

    if (!addressFound) {
      throw new Error("endereço não encontrado");
    }

    return Promise.resolve(addressFound);
  }

  async delete(id: string): Promise<void> {
    const index = this.addressList.findIndex((address) => address.id === id);
    if (index === -1) {
      throw new Error("Endereço não encontrado");
    }
    Promise.resolve(this.addressList.splice(index, 1));
  }

  async findAll(): Promise<Address_Entity[]> {
    if (this.addressList.length === 0) {
      throw new Error("Lista de endereços vazia");
    }
    return this.addressList;
  }

  async update(props: Address_Entity): Promise<Address_Entity> {
    const AddressFound = this.addressList.find(
      (address) => address.id === props.id
    );

    if (!AddressFound) {
      throw new Error("Endereço não encontrado");
    }

    Object.assign(AddressFound, props);
    return Promise.resolve(AddressFound);
  }
}
