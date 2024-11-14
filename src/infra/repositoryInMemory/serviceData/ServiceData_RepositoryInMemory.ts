import { randomUUID } from "crypto";
import ServiceData_Entity from "src/core/entities/ServiceData_Entity";
import IServiceData_Repository from "src/core/repositories/ServiceData_Repository";

export default class ServiceData_RepositoryInMemory
  implements IServiceData_Repository
{
  serviceDataList: ServiceData_Entity[] = [];

  async save(props: ServiceData_Entity): Promise<ServiceData_Entity> {
    const createdServiceData = new ServiceData_Entity({
      ...props,
      id: randomUUID(),
    });
    this.serviceDataList.push(createdServiceData);
    return createdServiceData;
  }

  async findById(id: string): Promise<ServiceData_Entity> {
    const serviceDataFound = this.serviceDataList.find(
      (serviceData) => serviceData.id === id
    );

    if (!serviceDataFound) {
      throw new Error("Dados do serviço não encontrados");
    }

    return serviceDataFound;
  }

  async findAll(): Promise<ServiceData_Entity[]> {
    if (this.serviceDataList.length === 0) {
      throw new Error("Lista de serviços vazia");
    }
    return this.serviceDataList;
  }

  async delete(id: string): Promise<void> {
    const index = this.serviceDataList.findIndex(
      (serviceData) => serviceData.id === id
    );
    if (index === -1) {
      throw new Error("Dados do serviço não encontrados");
    }
    Promise.resolve(this.serviceDataList.splice(index, 1));
  }

  async update(props: ServiceData_Entity): Promise<ServiceData_Entity> {
    const serviceFound = this.serviceDataList.find(
      (serviceData) => serviceData.id === props.id
    );

    if (!serviceFound) {
      throw new Error("Dados do serviço não encontrados");
    }

    Object.assign(serviceFound, props);
    return Promise.resolve(serviceFound);
  }
}
