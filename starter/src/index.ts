document.addEventListener('DOMContentLoaded', function () {
    const specifier = document.querySelector('#specifier')
    specifier.addEventListener('change', addInputElements.bind(specifier));
    document.querySelector('.lds-dual-ring').classList.add('lds-dual-ring--hidden');
})

/**
 * Create new input elements based on user's input.
 */
function addInputElements(): void {
    const numberOfInputs = this.value;
    const container = document.querySelector('.inputs') as HTMLDivElement;
    removePreviousChildren(container);

    for (let i = 0; i < numberOfInputs; i++) {
        const input = createInputElement();
        container.appendChild(input);
    }
}

/**
 * Create new input element, add a class and bind the event onChange.
 */
function createInputElement(): HTMLInputElement {
    const input = document.createElement('input');
    input.classList.add('input')
    input.placeholder = "Please type in your number..."
    input.addEventListener('change', onInputChange.bind(input));
    return input;
}

/**
 * Clear the children list of an DIV element.
 * @param container DIV container that has all the input elements.
 */
function removePreviousChildren(container: HTMLDivElement): void {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

/**
 * Calculate all the number outputs on a input change.
 */
function onInputChange(): void {
    const values = getCurrentValues();
    const areInputsCorrect = validateValues(values);
    
    if (areInputsCorrect) {
        setNumberOutputs(values);
    }
    else {
        setErrors(values);
    }
}

/**
 * 
 * @param areValuesCorrect 
 */
function toggleLoader(areValuesCorrect: boolean): void {
    if (areValuesCorrect) {
        document.querySelector('.lds-dual-ring').classList.remove('lds-dual-ring--hidden');
    } else {
        document.querySelector('.lds-dual-ring').classList.add('lds-dual-ring--hidden');
    }
}

/**
 * Update the number outputs with calculated data.
 * @param inputValues Values of the input elements.
 */
function setNumberOutputs(inputValues: string[]): void {
    const values = inputValues.filter(value => value != "").map(value => Number(value));
    const { sumElement, averageElement, maxElement, minElement } = getNumberOutputs();
    const sum = values.reduce((a, b) => a + b, 0);

    sumElement.innerHTML = sum.toString();
    averageElement.innerHTML = (sum / values.length).toFixed(2);
    maxElement.innerHTML = `${Math.max(...values)}`;
    minElement.innerHTML = `${Math.min(...values)}`;
}

/**
 * Set error state on the input elements, which are invalid.
 * @param values Values of the input elements.
 */
function setErrors(values: string[]): void {
    const inputs = document.querySelectorAll('.input');
    values.forEach((value, index) => {
        if (Number.isNaN(+value)) {
            inputs[index].classList.add('input--invalid');
        }
        else {
            inputs[index].classList.remove('input--invalid');
        }
    })
}

/**
 * Returns all the available number outputs as one object.
 */
function getNumberOutputs(): any {
    const averageElement = document.querySelector('#average');
    const sumElement = document.querySelector('#sum');
    const maxElement = document.querySelector('#max');
    const minElement = document.querySelector('#min');
    return { sumElement, averageElement, maxElement, minElement }
}

/**
 * Returns values from all the available inputs.
 */
function getCurrentValues(): string[] {
    const inputs = document.querySelectorAll('.input');   
    inputs.forEach(input => input.classList.remove("input--invalid")); 
    return Array.from(inputs).map(input => (input as HTMLInputElement).value);
}

/**
 * Check all the input values if they are correct numbers.
 * @param inputValues Values of the input elements.
 */
function validateValues(inputValues: string[]): boolean {
   return inputValues.every(value => !Number.isNaN(+value));
}