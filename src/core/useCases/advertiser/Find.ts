import Advertiser_Entity from "src/core/entities/Advertiser_Entity";
import IAdvertiser_Repository from "src/core/repositories/Advertiser_Repository";

export default class Find_Advertise {
  advertiseRepository: IAdvertiser_Repository;
  constructor(advertiseRepository: IAdvertiser_Repository) {
    this.advertiseRepository = advertiseRepository;
  }

  async execute(): Promise<Advertiser_Entity[]> {
    const advertiserList = this.advertiseRepository.findAll();
    if (!advertiserList) {
      throw new Error("Lista de anunciantes está vazia");
    }
    return advertiserList;
  }
}
