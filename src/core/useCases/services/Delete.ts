import IServices_Repository from "src/core/repositories/Services_Repository";

export default class Delete_Services {
  servicesRepository: IServices_Repository;

  constructor(servicesRepository: IServices_Repository) {
    this.servicesRepository = servicesRepository;
  }

  async execute(id: string): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}
