import ServiceData_Entity from "src/core/entities/ServiceData_Entity";
import Create_ServiceData from "src/core/useCases/servideData/Create";
import Delete_ServiceData from "src/core/useCases/servideData/Delete";
import Find_AllServiceData from "src/core/useCases/servideData/Find";
import Find_ServiceDataById from "src/core/useCases/servideData/FindById";
import Update_ServiceData from "src/core/useCases/servideData/Update";
import ServiceData_RepositoryInMemory from "src/infra/repositoryInMemory/serviceData/ServiceData_RepositoryInMemory";

import { beforeEach, describe, expect, test } from "vitest";

describe("Teste unitário para criação de endereço", () => {
  const serviceData: ServiceData_Entity = {
    name: "My Image Album",
    description: "This is an album containing some images.",
    album: [
      "https://example.com/images/image1.jpg",
      "https://example.com/images/image2.jpg",
      "https://example.com/images/image3.jpg",
    ],
    addressId: "123456",
  };

  let serviceDataRepositoryMemory: ServiceData_RepositoryInMemory;
  let createServiceData: Create_ServiceData;
  let findServiceDataById: Find_ServiceDataById;
  let deleteServiceData: Delete_ServiceData;
  let updateServiceData: Update_ServiceData;
  let findAllServiceData: Find_AllServiceData;

  beforeEach(() => {
    ("");
    serviceDataRepositoryMemory = new ServiceData_RepositoryInMemory();
    createServiceData = new Create_ServiceData(serviceDataRepositoryMemory);
    findServiceDataById = new Find_ServiceDataById(serviceDataRepositoryMemory);
    deleteServiceData = new Delete_ServiceData(serviceDataRepositoryMemory);
    updateServiceData = new Update_ServiceData(serviceDataRepositoryMemory);
    findAllServiceData = new Find_AllServiceData(serviceDataRepositoryMemory);
  });

  test("Deve adicionar dados do servico corretamente", async () => {
    const createService = await createServiceData.execute(serviceData);

    expect(createService).toHaveProperty("id");
    expect(createService.name).toBe(serviceData.name);
    expect(createService.description).toBe(serviceData.description);

    const savedServiceData = await serviceDataRepositoryMemory.findById(
      createService.id
    );
    expect(savedServiceData).toBeDefined();
    expect(savedServiceData?.id).toBe(createService.id);
  });

  test("Deve retornar todos os elementos criados", async () => {
    const serviceData1 = await createServiceData.execute({
      ...serviceData,
      name: "Churros da lalá",
    });
    const serviceData2 = await createServiceData.execute({
      ...serviceData,
      name: "Mesas e cadeiras do GUI",
    });

    const allServiceData = await serviceDataRepositoryMemory.findAll();
    expect(allServiceData).toHaveLength(2);
    expect(allServiceData).toEqual([
      expect.objectContaining({ id: serviceData1.id, name: "Churros da lalá" }),
      expect.objectContaining({
        id: serviceData2.id,
        name: "Mesas e cadeiras do GUI",
      }),
    ]);
  });

  test("Deve retornar um usuário caso o ID seja válido", async () => {
    const newService = await createServiceData.execute(serviceData);
    expect(newService).toBeDefined();
    expect(newService.name).toBe(serviceData.name);

    const serviceFound = await serviceDataRepositoryMemory.findById(
      newService.id
    );
    expect(serviceFound).toBeDefined();
    expect(serviceData.name).toBe(serviceData.name);
  });

  test("Deve apagar o dado do serviço caso o ID seja válido", async () => {
    const createdServiceData = await createServiceData.execute(serviceData);
    expect(createdServiceData).toBeDefined();
    expect(createdServiceData.name).toBe(serviceData.name);

    const serviceDataFound = await findServiceDataById.execute(
      createdServiceData.id
    );
    expect(serviceDataFound).toBeDefined();

    await deleteServiceData.execute(createdServiceData.id);

    try {
      await findServiceDataById.execute(createdServiceData.id);
    } catch (error) {
      expect(error.message).toBe("Dados do serviço não encontrados");
    }
  });

  test("Deve retornar erro se a lista de serviços estiver vazia", async () => {
    await expect(serviceDataRepositoryMemory.findAll()).rejects.toThrow(
      "Lista de serviços vazia"
    );
  });

  test("Deve atualizar um serviço com sucesso", async () => {
    const createdServiceData = await createServiceData.execute(serviceData);

    const updatedData = {
      ...createdServiceData,
      name: "Novo nome do álbum",
      description: "Descrição atualizada do álbum",
    };
    const updatedServiceData = await updateServiceData.execute(updatedData);

    expect(updatedServiceData.name).toBe("Novo nome do álbum");
    expect(updatedServiceData.description).toBe(
      "Descrição atualizada do álbum"
    );

    const savedUpdatedServiceData = await serviceDataRepositoryMemory.findById(
      updatedServiceData.id
    );
    expect(savedUpdatedServiceData).toBeDefined();
    expect(savedUpdatedServiceData?.name).toBe("Novo nome do álbum");
    expect(savedUpdatedServiceData?.description).toBe(
      "Descrição atualizada do álbum"
    );
  });
  test("Deve retornar um serviço pelo ID", async () => {
    const createdServiceData = await createServiceData.execute(serviceData);

    const serviceFound = await findServiceDataById.execute(
      createdServiceData.id
    );

    expect(serviceFound).toBeDefined();
    expect(serviceFound?.id).toBe(createdServiceData.id);
    expect(serviceFound?.name).toBe(serviceData.name);
    expect(serviceFound?.description).toBe(serviceData.description);
    expect(serviceFound?.album).toEqual(serviceData.album);
  });

  test("Deve retornar erro ao tentar atualizar um serviço não encontrado", async () => {
    const nonExistentServiceData = new ServiceData_Entity({
      id: "non-existent-id",
      name: "Serviço Inexistente",
      description: "Descrição de serviço que não existe",
      album: [],
      addressId: "123456",
    });

    await expect(
      updateServiceData.execute(nonExistentServiceData)
    ).rejects.toThrow("Dados do serviço não encontrados");
  });
});
