import ServiceData_Entity from "src/core/entities/ServiceData_Entity";
import IServiceData_Repository from "src/core/repositories/ServiceData_Repository";

export default class Update_ServiceData {
  serviceDataRepository: IServiceData_Repository;
  constructor(serviceDataRepository: IServiceData_Repository) {
    this.serviceDataRepository = serviceDataRepository;
  }

  async execute(props: ServiceData_Entity): Promise<ServiceData_Entity> {
    const servicedataupdated = await this.serviceDataRepository.update(props);
    return servicedataupdated;
  }
}
