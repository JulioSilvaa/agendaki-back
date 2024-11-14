import Address_Entity from "../entities/Address_Entity";

export default interface IAddress_Repository {
  save(props: Address_Entity): Promise<Address_Entity>;
  findById(id: string): Promise<Address_Entity>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Address_Entity[]>;
  update(props: Address_Entity): Promise<Address_Entity>;
}
