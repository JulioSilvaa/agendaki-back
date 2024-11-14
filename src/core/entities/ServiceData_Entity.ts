export interface IServiceData_Entity {
  id?: string;
  name: string;
  description: string;
  album: string[];
  addressId: string;
}

export default class ServiceData_Entity {
  id?: string;
  name: string;
  description: string;
  album: string[];
  addressId: string;

  constructor(entity: IServiceData_Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.album = entity.album;
    this.addressId = entity.addressId;
  }
}
