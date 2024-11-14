import Create_Advertiser from "src/core/useCases/advertiser/Create";
import Delete_Advertiser from "src/core/useCases/advertiser/Delete";
import Edite_Advertiser from "src/core/useCases/advertiser/Edit";
import Advertiser_RepositoryInMemory from "src/infra/repositoryInMemory/advertiser/Advertiser_RepositoryInMemory";
import { beforeEach, describe, expect, test } from "vitest";

describe("Teste unitário para Advertiser", () => {
  const advertiserData = {
    name: "Nike",
    phone: "+123456789",
    img: "nike-logo.png",
    whatsApp: "+123456789",
    facebook: "https://facebook.com/nike",
    instagram: "https://instagram.com/nike",
    userId: "3",
    listingDate: new Date(Date.now()),
  };

  let advertiserRepositoryMemory: Advertiser_RepositoryInMemory;
  let createAdvertiser: Create_Advertiser;
  let deleteAdvertiser: Delete_Advertiser;
  let editAdvertiser: Edite_Advertiser;

  beforeEach(() => {
    advertiserRepositoryMemory = new Advertiser_RepositoryInMemory();
    createAdvertiser = new Create_Advertiser(advertiserRepositoryMemory);
    deleteAdvertiser = new Delete_Advertiser(advertiserRepositoryMemory);
    editAdvertiser = new Edite_Advertiser(advertiserRepositoryMemory);
  });

  test("Deveria criar um novo advertiser", async () => {
    const newAdvertiser = await createAdvertiser.execute(advertiserData);
    expect(newAdvertiser).toBeDefined();
    expect(newAdvertiser.name).toBe(advertiserData.name);
    expect(newAdvertiser.phone).toBe(advertiserData.phone);
    expect(newAdvertiser.whatsApp).toBe(advertiserData.whatsApp);
    expect(newAdvertiser.instagram).toBe(advertiserData.instagram);
    expect(newAdvertiser.listingDate).toBeDefined();
    expect(newAdvertiser.id).toBeDefined();
  });

  test("Deveria retornar a lista de anunciantes", async () => {
    await createAdvertiser.execute(advertiserData);
    const advertisers = await advertiserRepositoryMemory.findAll();
    expect(advertisers.length).toBe(1);
    expect(advertisers[0].name).toBe(advertiserData.name);
    expect(advertisers[0].phone).toBe(advertiserData.phone);
    expect(advertisers[0].whatsApp).toBe(advertiserData.whatsApp);
  });

  test("Deveria retornar um array vazio se a lista de anunciantes estiver vazia", async () => {
    const initialAdvertisers = await advertiserRepositoryMemory.findAll();
    expect(initialAdvertisers.length).toBe(0);
    await createAdvertiser.execute(advertiserData);
    const advertisers = await advertiserRepositoryMemory.findAll();
    expect(advertisers.length).toBe(1);
  });

  test("Deveria lançar um erro se não encontrar um anunciante pelo ID", async () => {
    await expect(
      advertiserRepositoryMemory.findById("999")
    ).rejects.toThrowError("Anunciante não encontrado");
  });

  test("Deveria deletar um anunciante", async () => {
    const newAdvertiser = await createAdvertiser.execute(advertiserData);
    expect(newAdvertiser).toBeDefined();
    expect(newAdvertiser.name).toBe(advertiserData.name);

    await deleteAdvertiser.execute(newAdvertiser.id);

    const advertisersAfterDelete = await advertiserRepositoryMemory.findAll();
    expect(advertisersAfterDelete.length).toBe(0);

    await expect(
      advertiserRepositoryMemory.findById(newAdvertiser.id)
    ).rejects.toThrowError("Anunciante não encontrado");
  });

  test("Deveria editar um anunciante quando o ID for válido", async () => {
    const newAdvertiser = await createAdvertiser.execute(advertiserData);

    const updatedData = { ...newAdvertiser, name: "Nike - Updated" };
    const updatedAdvertiser = await editAdvertiser.execute(updatedData);

    expect(updatedAdvertiser).toBeDefined();
    expect(updatedAdvertiser.id).toBe(newAdvertiser.id);
    expect(updatedAdvertiser.name).toBe("Nike - Updated");
  });

  test("Deveria lançar um erro se o anunciante não for encontrado pelo ID no edit", async () => {
    const updatedData = { id: "999", name: "Nonexistent Advertiser" };

    await expect(editAdvertiser.execute(updatedData)).rejects.toThrowError(
      "Anunciante não encontrado"
    );
  });

  test("Deveria realizar um update corretamente se o ID existir", async () => {
    const newAdvertiser = await createAdvertiser.execute(advertiserData);
    const updatedData = { ...newAdvertiser, name: "Nike - Updated" };
    const updatedAdvertiser = await editAdvertiser.execute(updatedData);

    expect(updatedAdvertiser.name).toBe("Nike - Updated");
  });
});
