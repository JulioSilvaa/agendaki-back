import Address_Entity from "src/core/entities/Address_Entity";
import IAddress_Repository from "src/core/repositories/Address_Repository";

export default class Find_AllAddress {
  addressRepository: IAddress_Repository;
  constructor(addressRepository: IAddress_Repository) {
    this.addressRepository = addressRepository;
  }

  async execute(): Promise<Address_Entity[] | null> {
    const addressList = await this.addressRepository.findAll();
    return addressList;
  }
}
