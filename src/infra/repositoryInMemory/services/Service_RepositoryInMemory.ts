import { randomUUID } from "crypto";
import Services_Entity from "src/core/entities/Services_Entity";
import IServices_Repository from "src/core/repositories/Services_Repository";

export default class Services_RepositoryInMemory
  implements IServices_Repository
{
  serviceList: Services_Entity[] = [];

  async save(props: Services_Entity): Promise<Services_Entity> {
    const createdService = {
      ...props,
      id: randomUUID(),
    };
    await this.serviceList.push(createdService);
    return createdService;
  }

  async findById(id: string): Promise<Services_Entity> {
    const serviceDataFound = this.serviceList.find(
      (service) => service.id === id
    );

    if (!serviceDataFound) {
      throw new Error("Serviço não encontrado");
    }

    return serviceDataFound;
  }

  async findAll(): Promise<Services_Entity[]> {
    if (this.serviceList.length === 0) {
      throw new Error("Lista de serviços vazia");
    }
    return this.serviceList;
  }
  async delete(id: string): Promise<void> {
    const index = this.serviceList.findIndex((service) => service.id === id);
    if (index === -1) {
      throw new Error("Serviço não encontrado");
    }
    Promise.resolve(this.serviceList.splice(index, 1));
  }
}
