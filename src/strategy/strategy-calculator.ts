/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley, Daniel Mendéz Rodríguez
 * @since Mar 20 2023
 * @desc Example code of a simple calculator following Strategy dessign pattern 
 */

/** @desc Defines what each strategy of the calculator should have */
interface CalculatorStrategy {
  calculate(firstNumber: number, secondNumber: number): number;
}

/** @desc Strategy that adds two numbers */
class AdditionStrategy implements CalculatorStrategy {
  public calculate(firstNumber: number, secondNumber: number): number {
    return firstNumber + secondNumber;
  }
}

/** @desc Strategy that subtracts two numbers */
class SubtractionStrategy implements CalculatorStrategy {
  public calculate(firstNumber: number, secondNumber: number): number {
    return firstNumber - secondNumber;
  }
}

/** @desc Strategy that multiplies two numbers */
class MultiplicationStrategy implements CalculatorStrategy {
  public calculate(firstNumber: number, secondNumber: number): number {
    return firstNumber * secondNumber;
  }
}

/** @desc Context that will use the strategies */
class CalculatorContext {
  constructor(private strategy: CalculatorStrategy) {
    this.strategy = strategy;
  }

  /** @desc Method that allows to change the strategy used during execution */
  public setStrategy(strategy: CalculatorStrategy): void {
    this.strategy = strategy;
  }

  /** @desc Method that executes the strategy */
  public executeStrategy(firstNumber: number, secondNumber: number): number {
    console.log('Executing strategy with numbers: ', firstNumber, secondNumber);
    return this.strategy.calculate(firstNumber, secondNumber);
  }
}

/**
 * Client code can work with any strategy
 */
function calculatorUsage() {
  console.log('Welcome to the calculator');
  console.log('===========================');
  const firstNumber = 10;
  const secondNumber = 5;
  
  console.log('Client A: I want to add two numbers');
  const calculator = new CalculatorContext(new AdditionStrategy());
  console.log('Result: ', calculator.executeStrategy(firstNumber, secondNumber));
  console.log('');
  console.log('Client B: I want to multiply two numbers');
  calculator.setStrategy(new MultiplicationStrategy());
  console.log('Result: ', calculator.executeStrategy(firstNumber, secondNumber));
}

calculatorUsage();
