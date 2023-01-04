
class Calculator {
    constructor (previousText, currentText){
        this.previousOperand = previousText;
        this.currentOperand = currentText;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(data) {
        if(this.currentOperand.includes(".") && data === ".")return;
        this.currentOperand = this.currentOperand.toString() + data.toString();
    }

    chooseOperation(data) {
        if(this.currentOperand === "")return;
        if(this.operation != null){
            this.compute();
        };

        this.operation = data;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        switch (this.operation){
            case "+":
                computation = prev + current;
                break;
            
            case "/":
                computation = prev / current;
                break;

            case "*":
                computation = prev * current;
                break;

            case "-":
                computation = prev - current;
                break;

            default:
                return;
        }

        let checker = computation.toString();
        if(checker.includes(".")){
            this.currentOperand = computation.toFixed(2);
        }else{
            this.currentOperand = computation;
        }
        this.previousOperand = "";
        this.operation = null;
    }

    updateDisplay() {
        currentText.textContent = this.currentOperand;
        previousText.textContent = this.previousOperand;

        if(this.operation){
            previousText.textContent = `${this.previousOperand} ${this.operation}`;
        }
    }
}




const numbersBtn = document.querySelectorAll("[data-number]");
const operationsBtn = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector('[data-equal]');
const currentText = document.querySelector("[data-current]");
const previousText = document.querySelector("[data-prev]");

const user = new Calculator(previousText, currentText);


numbersBtn.forEach( (btn) => {
    btn.addEventListener("click", (e) => {
        user.appendNumber(e.target.textContent);
        user.updateDisplay();
    })
})

clearBtn.addEventListener('click', () => {
    user.clear();
    user.updateDisplay();
})

deleteBtn.addEventListener("click", () => {
    user.delete();
    user.updateDisplay();
})

operationsBtn.forEach( (btn) => {
    btn.addEventListener("click", (e) => {
        user.chooseOperation(e.target.textContent);
        user.updateDisplay();
    })
})

equalBtn.addEventListener("click", () => {
    user.compute();
    user.updateDisplay();
})