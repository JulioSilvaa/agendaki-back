interface IAddress_Entity {
  id?: string;
  city: string;
  street: string;
  zipcode: string;
  neighborhood: string;
  state: string;
  complemente?: string;
}

export default class Address_Entity {
  id?: string;
  city: string;
  street: string;
  zipcode: string;
  neighborhood: string;
  state: string;
  complemente?: string;

  constructor(entity: IAddress_Entity) {
    this.id = entity.id;
    this.city = entity.city;
    this.street = entity.street;
    this.zipcode = entity.zipcode;
    this.neighborhood = entity.neighborhood;
    this.state = entity.state;
    this.complemente = entity.complemente;
  }
}
