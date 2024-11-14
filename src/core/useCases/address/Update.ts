import Address_Entity from "src/core/entities/Address_Entity";
import IAddress_Repository from "src/core/repositories/Address_Repository";

export default class Update_Address {
  addressRepository: IAddress_Repository;

  constructor(addressRepository: IAddress_Repository) {
    this.addressRepository = addressRepository;
  }

  async execute(props: Address_Entity): Promise<Address_Entity> {
    if (!this.isValidZipcode(props.zipcode)) {
      throw new Error("CEP inválido");
    }

    const updatedAddress = await this.addressRepository.update(props);
    return updatedAddress;
  }

  private isValidZipcode(zipcode: string): boolean {
    const zipcodeRegex = /^\d{5}-\d{3}$/;
    return zipcodeRegex.test(zipcode);
  }
}
