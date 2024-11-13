import Advertiser_Entity from "src/core/entities/Advertiser_Entity";
import IAdvertiser_Repository from "src/core/repositories/Advertiser_Repository";

export default class Advertiser_RepositoryInMemory
  implements IAdvertiser_Repository
{
  advertiserList: Advertiser_Entity[] = [];

  create(props: Advertiser_Entity): Promise<Advertiser_Entity> {
    const {
      name,
      phone,
      img,
      whatsApp,
      facebook,
      instagram,
      listingDate,
      userId,
    } = props;

    const newAdvertiser: Advertiser_Entity = new Advertiser_Entity({
      id: (this.advertiserList.length + 1).toString(),
      name,
      phone,
      img,
      whatsApp,
      facebook,
      instagram,
      userId,
      listingDate,
    });

    console.log(newAdvertiser);
    this.advertiserList.push(newAdvertiser);
    return Promise.resolve(newAdvertiser);
  }

  async findAll(): Promise<Advertiser_Entity[]> {
    return Promise.resolve(this.advertiserList);
  }

  async findbyId(id: string): Promise<Advertiser_Entity> {
    const advertiserFound = this.advertiserList.find(
      (advertiser) => advertiser.id === id
    );

    if (!advertiserFound) {
      throw new Error("Anunciante não encontrado");
    }

    return Promise.resolve(advertiserFound);
  }

  async delete(id: string): Promise<void> {
    const index = this.advertiserList.findIndex(
      (advertiser) => advertiser.id === id
    );
    if (index === -1) {
      throw new Error("Anunciante não encontrado");
    }
    this.advertiserList.splice(index, 1);
  }
}
