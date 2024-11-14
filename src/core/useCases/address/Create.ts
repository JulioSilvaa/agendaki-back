import Address_Entity from "src/core/entities/Address_Entity";
import IAddress_Repository from "src/core/repositories/Address_Repository";

export default class Create_Address {
  addressRepository: IAddress_Repository;
  constructor(addressRepository: IAddress_Repository) {
    this.addressRepository = addressRepository;
  }

  async execute(props: Address_Entity): Promise<Address_Entity> {
    if (!props.zipcode) {
      throw new Error("Zipcode is required");
    }
    const createdAddress = await this.addressRepository.save(props);

    return createdAddress;
  }
}
