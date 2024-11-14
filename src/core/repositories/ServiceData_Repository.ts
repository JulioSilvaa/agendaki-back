import ServiceData_Entity from "../entities/ServiceData_Entity";

export default interface IServiceData_Repository {
  save(props: ServiceData_Entity): Promise<ServiceData_Entity>;
  findById(id: string): Promise<ServiceData_Entity>;
  findAll(): Promise<ServiceData_Entity[]>;
  delete(id: string): Promise<void>;
  update(props: ServiceData_Entity): Promise<ServiceData_Entity>;
}
