import Address_Entity from "src/core/entities/Address_Entity";
import IAddress_Repository from "src/core/repositories/Address_Repository";

export default class Find_AddressById {
  addressRepository: IAddress_Repository;
  constructor(addressRepository: IAddress_Repository) {
    this.addressRepository = addressRepository;
  }

  async execute(id: string): Promise<Address_Entity | null> {
    const addressFound = await this.addressRepository.findById(id);
    return addressFound;
  }
}
