import { randomUUID } from "crypto";
import Advertiser_Entity from "src/core/entities/Advertiser_Entity";
import IAdvertiser_Repository from "src/core/repositories/Advertiser_Repository";

export default class Advertiser_RepositoryInMemory
  implements IAdvertiser_Repository
{
  advertiserList: Advertiser_Entity[] = [];

  save(props: Advertiser_Entity): Promise<Advertiser_Entity> {
    const {
      id = randomUUID(),
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
      id,
      name,
      phone,
      img,
      whatsApp,
      facebook,
      instagram,
      userId,
      listingDate,
    });

    this.advertiserList.push(newAdvertiser);
    return Promise.resolve(newAdvertiser);
  }

  async findAll(): Promise<Advertiser_Entity[]> {
    return Promise.resolve(this.advertiserList);
  }

  async findById(id: string): Promise<Advertiser_Entity> {
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
    Promise.resolve(this.advertiserList.splice(index, 1));
  }

  async update(props: Advertiser_Entity): Promise<Advertiser_Entity> {
    const advertiserFound = this.advertiserList.find(
      (advertiser) => advertiser.id === props.id
    );

    if (!advertiserFound) {
      throw new Error("Anunciante não encontrado");
    }

    Object.assign(advertiserFound, props);
    return Promise.resolve(advertiserFound);
  }
}
