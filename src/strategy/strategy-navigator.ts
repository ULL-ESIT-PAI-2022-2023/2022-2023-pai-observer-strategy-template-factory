/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley, Daniel Mendéz Rodríguez
 * @since Mar 20 2023
 * @desc Example code of a navigator app following Strategy dessign pattern 
 */

/** @desc Defines what each strategy of the route builder should have */
interface RouteBuilderStrategy {
  buildRoute(): void;
}

/** @desc Strategy that builds a route by car */
class RoadStrategy implements RouteBuilderStrategy {
  /** @desc Builds a route by car */
  public buildRoute(): void {
    console.log('Built a route by car');
  }
}

/** @desc Strategy that builds a route by walking */
class WalkingStrategy implements RouteBuilderStrategy {
  /** @desc Builds a route by walking */
  public buildRoute(): void {
    console.log('Built a route by walking')
  }
}

/** @desc Strategy that builds a route by public transport */
class PublicTransportStrategy implements RouteBuilderStrategy {
  /** @desc Builds a route by public transport */
  public buildRoute(): void {
    console.log('Built a route by public transport');
  }
}

/** @desc Context that will use the strategies */
class NavigatorApp {
  constructor(private strategy: RouteBuilderStrategy) {
    this.strategy = strategy;
  }

  /** @desc Method that allows to change the strategy used during execution */
  public setRouteBuilderStrategy(strategy: RouteBuilderStrategy): void {
    this.strategy = strategy;
  }

  /** @desc Method that executes the strategy */
  public buildRoute(): void {
    console.log('Building a route...');
    this.strategy.buildRoute();
  }
}

/**
 * Client code simulating a user using the navigator app
 */
function navigatorAppUsage() {
  console.log('Welcome to the navigator app');

  const navigatorApp = new NavigatorApp(new RoadStrategy());
  navigatorApp.buildRoute();

  navigatorApp.setRouteBuilderStrategy(new WalkingStrategy());
  navigatorApp.buildRoute();

  navigatorApp.setRouteBuilderStrategy(new PublicTransportStrategy());
  navigatorApp.buildRoute();
}

navigatorAppUsage();
