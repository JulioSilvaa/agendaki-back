import ServiceData_Entity from "src/core/entities/ServiceData_Entity";
import IServiceData_Repository from "src/core/repositories/ServiceData_Repository";

export default class Create_ServiceData {
  serviceDataRepository: IServiceData_Repository;
  constructor(serviceDataRepository: IServiceData_Repository) {
    this.serviceDataRepository = serviceDataRepository;
  }

  async execute(props: ServiceData_Entity): Promise<ServiceData_Entity> {
    const newServiceData = await this.serviceDataRepository.save(props);
    return newServiceData;
  }
}
