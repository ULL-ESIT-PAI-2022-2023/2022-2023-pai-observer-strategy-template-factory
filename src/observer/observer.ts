/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley, Daniel Mendéz Rodríguez
 * @since Mar 20 2023
 * @desc Example code following the Observer dessign pattern 
 */

/** @desc The Subject interface declares a set of methods for managing subscribers */
interface StoreAlerts {
  // Attach a customer to the subscriber list for recieving alerts
  subscribe(observer: Customer): void;

  // Detach a customer from the subscriber list
  unsubscribe(observer: Customer): void;

  // Notify all customers about a new product
  notifyNewProduct(): void;
}

/** @class The Store owns an important state (latestProductCost) and notifies customers when it changes */
class Store implements StoreAlerts {
  /** @type {number} The Subject's state, essential to all subscribers */
  public latestProductCost: number = 0;

  /** @type {customer[]} List of subscribers */
  private subscribedCustomers: Customer[] = [];

  /**
   * @desc Manages adding new customers to our subscriber list
   * @param {Customer} customer Customer object we want to attach to subsciber list
   * @returns {void}
   */
  public subscribe(customer: Customer): void {
    if(this.subscribedCustomers.includes(customer)) {
      return console.log('Store: Customer is already on the subscriber list.');
    }
    console.log('Store: Customer succesfully added to subscriber list.');
    this.subscribedCustomers.push(customer);
  }

  /**
   * @desc Manages removing customers from our subscriber list
   * @param {Customer} customer Customer object we want to detach from subscriber list
   * @returns {void}
   */
  public unsubscribe(customer: Customer): void {
    const observerIndex = this.subscribedCustomers.indexOf(customer);
    if (observerIndex === -1) {
      return console.log('Store: Customer is not a part of the subscriber list.');
    }
    this.subscribedCustomers.splice(observerIndex, 1);
    console.log('Store: removed customer from subscriber list.');
  }

  /** @desc Trigger an update in each subscriber */
  public notifyNewProduct(): void {
    console.log('Store: Notifying subscribed customers...');
    for (const observer of this.subscribedCustomers) {
      observer.update(this);
    }
  }

  /**
   * @desc Method that calculates the price of the latest product and notifies all
   *       subscibed customers of it
   * @returns {void}
   */
  public addNewProduct(): void {
    console.log('\nNew product delivery incoming');
    this.latestProductCost = Math.floor(Math.random() * (100 + 1));

    console.log(`Store: NEW PRODUCT AVAILABLE, cost of new product is ${this.latestProductCost}`);
    this.notifyNewProduct();
  }
}

/** @desc The Customer interface declares the update method, used by concrete customer classes */
interface Customer {
  // Receive update from subject.
  update(subject: StoreAlerts): void;
}

/** @class Businessman will react to updates issued by Customer */
class Businessman implements Customer {
  /**
   * @desc Businessman has a lot of money, they will decide wether to buy a product or
   *       not to bother based on it's price
   * @param {StoreAlerts} alerts Interface through which we acess the new important state of Store 
   * @returns {void}
   */
  public update(alerts: StoreAlerts): void {
    if (alerts instanceof Store) {
      if (alerts.latestProductCost <= 20) {
        console.log(`The businessman didn't bother buying the new ${alerts.latestProductCost}€ product`);
      } else {
        console.log(`The businessman bought the new ${alerts.latestProductCost}€ product`)
      }
    }
  }
}

/** @class Student will react to updates issued by Customer */
class Student implements Customer {
  /**
   * @desc Student doesn't have lot of money, they will see wether they can afford a product or not
   * @param {StoreAlerts} alerts Interface through which we acess the new important state of Store 
   * @returns {void}
   */
  public update(alerts: StoreAlerts): void {
    if (alerts instanceof Store) {
      if (alerts.latestProductCost <= 40) {
        console.log(`The student bought the new ${alerts.latestProductCost}€ product`);
      } else {
        console.log(`The student wasn't able to afford the new ${alerts.latestProductCost}€ product`)
      }
    }
  }
}

/** @desc The client code */
function mainObserver(): void {
  const store = new Store();

  const customer1 = new Businessman();
  store.subscribe(customer1);

  const customer2 = new Student();
  store.subscribe(customer2);

  store.addNewProduct();
  store.addNewProduct();

  store.unsubscribe(customer2);

  store.addNewProduct();
}

mainObserver();