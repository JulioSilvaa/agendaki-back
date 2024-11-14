import IServiceData_Repository from "src/core/repositories/ServiceData_Repository";

export default class Delete_ServiceData {
  serviceDataRepository: IServiceData_Repository;
  constructor(serviceDataRepository: IServiceData_Repository) {
    this.serviceDataRepository = serviceDataRepository;
  }

  async execute(id: string): Promise<void> {
    await this.serviceDataRepository.delete(id);
  }
}
