import Services_Entity from "src/core/entities/Services_Entity";
import IServices_Repository from "src/core/repositories/Services_Repository";

export default class Find_ServicesById {
  servicesRepository: IServices_Repository;

  constructor(servicesRepository: IServices_Repository) {
    this.servicesRepository = servicesRepository;
  }

  async execute(id: string): Promise<Services_Entity> {
    const serviceFound = await this.servicesRepository.findById(id);
    return serviceFound;
  }
}
