import ServiceData_Entity from "src/core/entities/ServiceData_Entity";
import IServiceData_Repository from "src/core/repositories/ServiceData_Repository";

export default class Find_ServiceDataById {
  serviceDataRepository: IServiceData_Repository;
  constructor(serviceDataRepository: IServiceData_Repository) {
    this.serviceDataRepository = serviceDataRepository;
  }

  async execute(id: string): Promise<ServiceData_Entity> {
    const serviceDataFound = await this.serviceDataRepository.findById(id);
    return serviceDataFound;
  }
}
