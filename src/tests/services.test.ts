import Services_Entity from "src/core/entities/Services_Entity";
import Create_Services from "src/core/useCases/services/Create";
import Delete_Services from "src/core/useCases/services/Delete";
import Find_ServicesById from "src/core/useCases/services/FindById";
import Services_RepositoryInMemory from "src/infra/repositoryInMemory/services/Service_RepositoryInMemory";

import { beforeEach, describe, expect, test } from "vitest";

describe("Teste unitário para criação de um serviço", () => {
  const serviceData: Services_Entity = {
    serviceDataId: "1313",
    advertiserId: "1212",
  };

  let servicesRepositoryMemory: Services_RepositoryInMemory;
  let createServiceData: Create_Services;
  let findServicesByID: Find_ServicesById;
  let deleteService: Delete_Services;

  beforeEach(() => {
    ("");
    servicesRepositoryMemory = new Services_RepositoryInMemory();
    createServiceData = new Create_Services(servicesRepositoryMemory);
    findServicesByID = new Find_ServicesById(servicesRepositoryMemory);
    deleteService = new Delete_Services(servicesRepositoryMemory);
  });

  test("Deve adicionar novo servico corretamente", async () => {
    const createService = await createServiceData.execute(serviceData);

    expect(createService).toHaveProperty("id");
    expect(createService.advertiserId).toBe(serviceData.advertiserId);
    expect(createService.serviceDataId).toBe(serviceData.serviceDataId);

    const savedServiceData = await servicesRepositoryMemory.findById(
      createService.id
    );
    expect(savedServiceData).toBeDefined();
    expect(savedServiceData?.id).toBe(createService.id);
  });

  test("Deve ser possivel encontrar um serviço pelo ID se o ID for válido", async () => {
    const createdService = await createServiceData.execute(serviceData);

    const serviceFound = await findServicesByID.execute(createdService.id);

    expect(serviceFound).toBeDefined();
    expect(serviceFound?.id).toBe(createdService.id);
    expect(serviceFound?.advertiserId).toBe(serviceData.advertiserId);
    expect(serviceFound?.serviceDataId).toBe(serviceData.serviceDataId);
  });

  test("Deve retornar erro se a lista de serviços estiver vazia", async () => {
    await expect(servicesRepositoryMemory.findAll()).rejects.toThrow(
      "Lista de serviços vazia"
    );
  });

  test("Deve apagar do serviço caso o ID seja válido", async () => {
    const createdServiceData = await createServiceData.execute(serviceData);
    expect(createdServiceData).toBeDefined();
    expect(createdServiceData.advertiserId).toBe(serviceData.advertiserId);
    expect(createdServiceData.serviceDataId).toBe(serviceData.serviceDataId);

    const serviceDataFound = await findServicesByID.execute(
      createdServiceData.id
    );
    expect(serviceDataFound).toBeDefined();

    await deleteService.execute(createdServiceData.id);

    try {
      await findServicesByID.execute(createdServiceData.id);
    } catch (error) {
      expect(error.message).toBe("Serviço não encontrado");
    }
  });
});
