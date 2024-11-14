import Advertiser_Entity from "../entities/Advertiser_Entity";

export default interface IAdvertiser_Repository {
  create(props: Advertiser_Entity): Promise<Advertiser_Entity>;
  findAll(): Promise<Advertiser_Entity[]>;
  findById(id: string): Promise<Advertiser_Entity>;
  delete(id: string): Promise<void>;
  update(props: Advertiser_Entity): Promise<Advertiser_Entity>;
}
