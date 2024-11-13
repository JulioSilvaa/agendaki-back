interface IAdvertiser {
  id?: string;
  userId: string;
  name: string;
  img: string;
  listingDate: Date;
  phone: string;
  whatsApp: string;
  facebook?: string;
  instagram?: string;
}

export default class Advertiser_Entity {
  id?: string | undefined;
  userId: string;
  name: string;
  img: string;
  listingDate: Date;
  phone: string;
  whatsApp: any;
  facebook: string | undefined;
  instagram: string | undefined;

  constructor(entity: IAdvertiser) {
    this.id = entity.id;
    this.userId = entity.userId;
    this.name = entity.name;
    this.img = entity.img;
    this.listingDate = entity.listingDate;
    this.phone = entity.phone;
    this.whatsApp = entity.whatsApp;
    this.facebook = entity.facebook;
    this.instagram = entity.instagram;
  }
}
