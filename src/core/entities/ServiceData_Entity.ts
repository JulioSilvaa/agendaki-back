export interface IServiceData_Entity {
  id: number;
  name: string;
  description: string;
  album: string[];
  addressId: number;
}

export default class ServiceData_Entity {
  id: number;
  name: string;
  description: string;
  album: string[];
  addressId: number;

  constructor(entity: IServiceData_Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.album = entity.album;
    this.addressId = entity.addressId;
  }
}
