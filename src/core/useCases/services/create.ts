import Services_Entity from "src/core/entities/Services_Entity";
import IServices_Repository from "src/core/repositories/Services_Repository";

export default class Create_Services {
  servicesRepository: IServices_Repository;

  constructor(servicesRepository: IServices_Repository) {
    this.servicesRepository = servicesRepository;
  }

  async execute(props: Services_Entity): Promise<Services_Entity> {
    const newService = await this.servicesRepository.save(props);
    return newService;
  }
}
