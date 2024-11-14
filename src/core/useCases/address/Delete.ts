import IAddress_Repository from "src/core/repositories/Address_Repository";

export default class Delete_Address {
  addressRepository: IAddress_Repository;
  constructor(addressRepository: IAddress_Repository) {
    this.addressRepository = addressRepository;
  }

  async execute(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
