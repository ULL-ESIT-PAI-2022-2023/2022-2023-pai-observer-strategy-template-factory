/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley, Daniel Mendéz Rodríguez
 * @since Mar 20 2023
 * @desc Example code following the Factory Method dessign pattern 
 */

/** 
 * @class Creator class, declares factory method that is supposed to return an
 *        object of a Product class (usually implemented by it's subclasses)
 */
abstract class Client {
  /** @type {number} Standard ticket price */
  private ticketPrice: number = 10;
  
  /** @desc Factory method, Creator can provide a default implementation if it chooses */
  public abstract createDiscount(): Discount;

  /**
   * @desc Despite it's name, the Creator usually contains some business logic
   *       that relies on Product objects returned by the factory method
   */
  public applyDiscount(): void {
    console.log(`Standard ticket price is ${this.ticketPrice}€.`);
    // Call the factory method to create a Product object.
    const product = this.createDiscount();
    // Now, use the product.
    this.ticketPrice *= product.retrieveDiscount();
    console.log(`Discounted price for client is ${this.ticketPrice}€.`);
  }
}

/** @class Overrides the factory method to change the resulting product's type */
class Child extends Client {
  /** 
   * @desc Still uses the abstract product type so the Creator can stay independent 
   * @returns {Discount} Will return a concrete product
   */
  public createDiscount(): Discount {
    return new ChildDiscount();
  }
}

/** @class Overrides the factory method to change the resulting product's type */
class Adult extends Client {
  /** 
   * @desc Still uses the abstract product type so the Creator can stay independent 
   * @returns {Discount} Will return a concrete product
   */
  public createDiscount(): Discount {
    return new NoDiscount();
  }
}

/** @desc Product interface declares the operations that all concrete products must implement */
interface Discount {
  retrieveDiscount(): number;
}

/** @class Concrete Products provide various implementations of the Product interface */
class ChildDiscount implements Discount {
  /**
   * @desc Returns the discount the cinema applies to child tickets
   * @returns {number} Discount that will be applied
   */
  public retrieveDiscount(): number {
    const DISCOUNT: number = 0.5;
    console.log(`This child will recieve a ${100 - DISCOUNT * 100}% discount.`);
    return DISCOUNT;
  }
}

/** @class Concrete Products provide various implementations of the Product interface */
class NoDiscount implements Discount {
  /**
   * @desc Returns the discount the cinema applies to adult tickets
   * @returns {number} Discount that will be applied
   */
  public retrieveDiscount(): number {
    const DISCOUNT: number = 1;
    console.log(`This person will recieve a ${100 - DISCOUNT * 100}% discount.`);
    return DISCOUNT;
  }
}

/**
 * @desc The client code works through the Creator class' interface so that
 *       it can deal with any of it's concrete instances
 * @param {Client} client 
 */
function cinema(client: Client): void {
  console.log('Cinema: A new client has arrived to watch a film.');
  client.applyDiscount();
}

/** @desc Application that sets the Creator's type */
function mainFactory(): void {
  console.log('A child is going to the cinema to watch a film.');
  cinema(new Child());
  console.log('');

  console.log('An adult is going to the cinema to watch a film.');
  cinema(new Adult());
}

mainFactory();