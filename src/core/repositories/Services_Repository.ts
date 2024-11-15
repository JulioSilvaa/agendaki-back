import Services_Entity from "../entities/Services_Entity";

export default interface IServices_Repository {
  save(props: Services_Entity): Promise<Services_Entity>;
  findById(id: string): Promise<Services_Entity>;
  findAll(): Promise<Services_Entity[]>;
  delete(id: string): Promise<void>;
}
