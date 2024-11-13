import Advertiser_Entity from "src/core/entities/Advertiser_Entity";
import IAdvertiser_Repository from "src/core/repositories/Advertiser_Repository";

export default class Find_AdvertiserById {
  advertiserRespository: IAdvertiser_Repository;
  constructor(advertiserRepository: IAdvertiser_Repository) {
    this.advertiserRespository = advertiserRepository;
  }

  async execute(id: string): Promise<Advertiser_Entity> {
    const advertiser = await this.advertiserRespository.findbyId(id);

    return advertiser;
  }
}