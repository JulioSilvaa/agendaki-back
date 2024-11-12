interface IService {
  id?: string;
  serviceDataId: string;
  advertiserId: string;
}

export default class Service_Entity {
  id: string | undefined;
  serviceDataId: string;
  advertiserId: string;

  constructor(entity: IService) {
    this.id = entity.id;
    this.serviceDataId = entity.serviceDataId;
    this.advertiserId = entity.advertiserId;
  }
}
