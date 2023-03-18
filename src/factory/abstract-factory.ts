/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley, Daniel Mendéz Rodríguez
 * @since Mar 20 2023
 * @desc Example code of a furniture shop following the Abstract Factory dessign pattern 
 */

/** @desc Chair interface declares what a chair should do, independently of the style */
interface Chair {
  sitOn(): void;
}

/** @desc CoffeTable interface does the same as Chair interface, both are concrete products interfaces */
interface CoffeeTable {
  putCupOn(): void;
}

/**
 * @desc Represents a chair belonging to the Victorian style, will be created by the Victorian factory
 * @implements Chair
 */
class VictorianChair implements Chair {
  /** @desc Allows a person to sit on the chair */
  public sitOn(): void {
    console.log('Sitting on a Victorian chair');
  }
}

/**
 * @desc Represents a Victorian coffee table
 * @implements CoffeeTable
 */
class VictorianCoffeeTable implements CoffeeTable {
  /** @desc Puts a cup of coffee on the coffee table */
  public putCupOn(): void {
    console.log('Putting a cup of coffee on a Victorian coffee table');
  }
}

/**
 * @desc Represents a chair belonging to the Modern style, will be created by the Modern factory
 * @implements Chair
 */
class ModernChair implements Chair {
  /** @desc Allows a person to sit on the chair */
  public sitOn(): void {
    console.log('Sitting on a Modern chair');
  }
}

/**
 * @desc Represents a Modern coffee table
 * @implements CoffeeTable
 */
class ModernCoffeeTable implements CoffeeTable {
  /** @desc Puts a cup of coffee on the coffee table */
  public putCupOn(): void {
    console.log('Putting a cup of coffee on a Modern coffee table');
  }
}

/** @desc The Abstract factory, implements methods that creates abstract products */
interface FurnitureFactory {
  createChair(): Chair;
  createCoffeeTable(): CoffeeTable;
}

/** @desc Factory in charge of creating furniture of Victorian style */
class VictorianFurnitureFactory implements FurnitureFactory {
  /** @desc Creates a new Victorian style chair */
  public createChair(): Chair {
    return new VictorianChair();
  }

  /** @desc Creates a new Victorian style coffee table */
  public createCoffeeTable(): CoffeeTable {
    return new VictorianCoffeeTable();
  }
}

/** @desc Factory in charge of creating furniture of Modern style */
class ModernFurnitureFactory implements FurnitureFactory {
  /** @desc Creates a new Modern style chair */
  public createChair(): Chair {
    return new ModernChair();
  }

  /** @desc Creates a new Modern style coffee table */
  public createCoffeeTable(): CoffeeTable {
    return new ModernCoffeeTable();
  }
}

/** @desc Requests a chair and a coffee table from a factory, it does not mind which factory the products come from */
function clientFurnitureCode(factory: FurnitureFactory): void {
  const chair: Chair = factory.createChair();
  const coffeeTable: CoffeeTable = factory.createCoffeeTable();

  chair.sitOn();
  coffeeTable.putCupOn();
}

/**
* The client code can work with any concrete factory class.
*/
function clientFurnitureRequest() {
  console.log('Client A: I like Victorian furniture');
  clientFurnitureCode(new VictorianFurnitureFactory());
  console.log('');

  console.log('Client B: I like Modern furniture rather than Victorian');
  clientFurnitureCode(new ModernFurnitureFactory());
}

clientFurnitureRequest();
