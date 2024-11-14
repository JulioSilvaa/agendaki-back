import ServiceData_Entity from "src/core/entities/ServiceData_Entity";
import IServiceData_Repository from "src/core/repositories/ServiceData_Repository";

export default class Find_AllServiceData {
  serviceDataRepository: IServiceData_Repository;
  constructor(serviceDataRepository: IServiceData_Repository) {
    this.serviceDataRepository = serviceDataRepository;
  }

  async execute(): Promise<ServiceData_Entity[]> {
    const newServiceData = await this.serviceDataRepository.findAll();
    return newServiceData;
  }
}
