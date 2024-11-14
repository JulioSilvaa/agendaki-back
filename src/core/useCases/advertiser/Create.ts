import Advertiser_Entity from "src/core/entities/Advertiser_Entity";
import IAdvertiser_Repository from "src/core/repositories/Advertiser_Repository";

export default class Create_Advertiser {
  advertiserRepository: IAdvertiser_Repository;

  constructor(advertiserRepository: IAdvertiser_Repository) {
    this.advertiserRepository = advertiserRepository;
  }

  async execute(props: Advertiser_Entity): Promise<Advertiser_Entity> {
    const advertiser = await this.advertiserRepository.save(props);
    return advertiser;
  }
}
