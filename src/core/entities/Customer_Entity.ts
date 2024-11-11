interface ICustomer_Entity {
  customerId?: string;
  customerName: string;
  customerPassword: string;
  customerEmail: string;
}

export default class Customer_Entity {
  customerId?: string;
  customerName: string;
  customerPassword: string;
  customerEmail: string;

  constructor(entity: ICustomer_Entity) {
    this.customerId = entity.customerId;
    this.customerName = entity.customerName;
    this.customerPassword = entity.customerPassword;
    this.customerEmail = entity.customerEmail;
  }
}
