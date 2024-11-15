interface IServices {
  id?: string;
  serviceDataId: string;
  advertiserId: string;
}

export default class Services_Entity {
  id?: string | undefined;
  serviceDataId: string;
  advertiserId: string;

  constructor(entity: IServices) {
    this.id = entity.id;
    this.serviceDataId = entity.serviceDataId;
    this.advertiserId = entity.advertiserId;
  }
}
