import Advertiser_Entity from "src/core/entities/Advertiser_Entity";
import IAdvertiser_Repository from "src/core/repositories/Advertiser_Repository";

export default class Edite_Advertiser {
  advertiserRepository: IAdvertiser_Repository;

  constructor(advertiseRepository: IAdvertiser_Repository) {
    this.advertiserRepository = advertiseRepository;
  }

  async execute(props: Advertiser_Entity): Promise<Advertiser_Entity> {
    if (!props.id) {
      throw new Error("ID do anunciante é necessário");
    }

    const advertiserFound = await this.advertiserRepository.findById(props.id);

    if (!advertiserFound) {
      throw new Error("Anunciante não encontrado");
    }

    const updatedAdvertiser = { ...advertiserFound, ...props };

    return await this.advertiserRepository.update(updatedAdvertiser);
  }
}
