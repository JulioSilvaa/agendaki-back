import IAdvertiser_Repository from "src/core/repositories/Advertiser_Repository";

export default class Delete_Advertiser {
  advertiserRepository: IAdvertiser_Repository;
  constructor(advertiserRepository: IAdvertiser_Repository) {
    this.advertiserRepository = advertiserRepository;
  }

  async execute(id: string): Promise<void> {
    await this.advertiserRepository.delete(id);
  }
}
