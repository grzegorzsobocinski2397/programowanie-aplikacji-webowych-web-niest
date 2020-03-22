import { Input } from "./input";

let inputs: Input[] = [];

document.addEventListener("DOMContentLoaded", function() {
  const specifier = document.querySelector("#specifier");
  specifier.addEventListener("change", createInputs.bind(specifier));
});

/**
 * Calculate all the number outputs on a input change.
 */
export function onInputChange(): void {
    const values = getCurrentValues();
    const areInputsCorrect = inputs.every(input => input.isValid);
  
    toggleErrors();
    
    if (areInputsCorrect) {
      setNumberOutputs(values);
    }
  }

/**
 * Create new input elements based on user's input.
 */
function createInputs(): void {
  const numberOfInputs = this.value;
  removePreviousInputs();

  for (let i = 0; i < numberOfInputs; i++) {
    const id = `input-${i}`
    const input = new Input(id);
    inputs.push(input);
  }
}

/**
 * Clear the children list of an DIV element.
 */
function removePreviousInputs(): void {
  inputs.forEach(input => input.onDestroy());
  inputs = [];
}

/**
 * Update the number outputs with calculated data.
 * @param values Values of the input elements.
 */
function setNumberOutputs(values: number[]): void {
  const {
    sumElement,
    averageElement,
    maxElement,
    minElement
  } = getNumberOutputs();

  const sum = values.reduce((a, b) => a + b, 0);

  sumElement.innerHTML = sum.toString();
  averageElement.innerHTML = (sum / values.length).toFixed(2);
  maxElement.innerHTML = `${Math.max(...values)}`;
  minElement.innerHTML = `${Math.min(...values)}`;
}

/**
 * Returns all the available number outputs as one object.
 */
function getNumberOutputs(): any {
  const averageElement = document.querySelector("#average");
  const sumElement = document.querySelector("#sum");
  const maxElement = document.querySelector("#max");
  const minElement = document.querySelector("#min");
  return { sumElement, averageElement, maxElement, minElement };
}

/**
 * Returns values from all the available inputs.
 */
function getCurrentValues(): number[] {
  return inputs.map(input => input.number);
}

/**
 * Set error state on the inputs, which are invalid.
 */
function toggleErrors(): void {
  inputs.forEach(input => input.toggleErrorState());
}
