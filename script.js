window.onload = function() {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let displayExpression = '';

    const outputElement = document.getElementById('result');
    
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function updateDisplay() {
        if (!selectedOperation) {
            displayExpression = a === '' ? '0' : a;
        } else {
            if (b === '') {
                displayExpression = a + ' ' + selectedOperation + ' ';
            } else {
                displayExpression = a + ' ' + selectedOperation + ' ' + b;
            }
        }
        outputElement.innerHTML = displayExpression;
    }

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes('.'))) {
                a += digit;
            }
            updateDisplay();
        } 
        else {
            if ((digit != '.') || (digit == '.' && !b.includes('.'))) {
                b += digit;
                updateDisplay();
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = this.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    function setOperation(op, displayOp) {
        if (a === '') return;
        
        // Если уже есть второй операнд и оператор, вычисляем результат
        if (selectedOperation && b !== '') {
            calculateResult();
        }
        
        selectedOperation = displayOp;
        updateDisplay();
    }

    document.getElementById("btn_op_mult").onclick = function() { 
        setOperation('*', '×');
    }
    
    document.getElementById("btn_op_plus").onclick = function() { 
        setOperation('+', '+');
    }
    
    document.getElementById("btn_op_minus").onclick = function() { 
        setOperation('-', '-');
    }
    
    document.getElementById("btn_op_div").onclick = function() { 
        setOperation('/', '÷');
    }

    function calculateResult() {
        if (a === '' || b === '' || !selectedOperation) return false;
        
        let opForCalc = selectedOperation;
        if (opForCalc === '×') opForCalc = '*';
        if (opForCalc === '÷') opForCalc = '/';
        
        let result;
        switch(opForCalc) { 
            case '*':
                result = (+a) * (+b);
                break;
            case '+':
                result = (+a) + (+b);
                break;
            case '-':
                result = (+a) - (+b);
                break;
            case '/':
                if (+b === 0) {
                    outputElement.innerHTML = 'Error';
                    return false;
                }
                result = (+a) / (+b);
                break;
            default:
                return false;
        }
        
        a = result.toString();
        b = '';
        selectedOperation = null;
        updateDisplay();
        return true;
    }

    document.getElementById("btn_op_sign").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') return;
            if (a.startsWith('-')) {
                a = a.substring(1);
            } else {
                a = '-' + a;
            }
            updateDisplay();
        } 
        else {
            if (b === '') return;
            if (b.startsWith('-')) {
                b = b.substring(1);
            } else {
                b = '-' + b;
            }
            updateDisplay();
        }
    }

    document.getElementById("btn_op_percent").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') return;
            const numA = parseFloat(a);
            a = (numA / 100).toString();
            updateDisplay();
        } 
        else {
            if (b === '' || a === '') return;
            const numA = parseFloat(a);
            const numB = parseFloat(b);
            const percentValue = (numA * numB) / 100;
            b = percentValue.toString();
            updateDisplay();
        }
    }

    document.getElementById("btn_op_square").onclick = function() {
        let currentNumber;
        if (!selectedOperation) {
            currentNumber = a;
        } else {
            currentNumber = b;
        }
        
        if (currentNumber === '') return;
        
        let num = parseFloat(currentNumber);
        let result = num * num;
        
        if (!selectedOperation) {
            a = result.toString();
            updateDisplay();
        } else {
            b = result.toString();
            updateDisplay();
        }
    }

    document.getElementById("btn_op_000").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') {
                a = '0';
            }
            a += '000';
            updateDisplay();
        } 
        else {
            if (b === '') {
                b = '0';
            }
            b += '000';
            updateDisplay();
        }
    }

    document.getElementById("btn_op_sqrt").onclick = function() {
        let currentNumber;
        if (!selectedOperation) {
            currentNumber = a;
        } else {
            currentNumber = b;
        }
        
        if (currentNumber === '') return;
        
        let value = parseFloat(currentNumber);
        
        if (value < 0) {
            outputElement.innerHTML = 'Error';
            return;
        }
        
        let result = Math.sqrt(value);
        
        if (!selectedOperation) {
            a = result.toString();
            updateDisplay();
        } else {
            b = result.toString();
            updateDisplay();
        }
    }

    document.getElementById("btn_op_clear").onclick = function() { 
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        updateDisplay();
    }

    document.getElementById("btn_op_equal").onclick = function() { 
        calculateResult();
    }

    document.getElementById("btn_op_backspace").onclick = function() {
        if (!selectedOperation) {
            if (a === '') return;
            a = a.slice(0, -1);
            updateDisplay();
        } 
        else {
            if (b === '') {
                // Если b пустой, удаляем оператор
                selectedOperation = null;
                updateDisplay();
            } else {
                b = b.slice(0, -1);
                updateDisplay();
            }
        }
    }

    // показать калькулятор
    const calculatorContainer = document.getElementById('calculator-container');
    const calculatorLink = document.getElementById('calculator-link');
    
    let isCalculatorVisible = false;
    
    calculatorLink.onclick = function(event) {
        event.preventDefault();
        
        if (isCalculatorVisible) {
            calculatorContainer.style.display = 'none';
            isCalculatorVisible = false;
        } else {
            calculatorContainer.style.display = 'flex';
            isCalculatorVisible = true;
        }
    };

    // тема
    const themeIndicator = document.getElementById('theme-indicator');
    let isDarkTheme = true;
    
    themeIndicator.onclick = function() {
        const body = document.body;
        
        if (isDarkTheme) {
            body.classList.add('light-theme');
            themeIndicator.innerHTML = '☀️';
            themeIndicator.style.backgroundColor = '#4a6fa5';
            isDarkTheme = false;
        } else {
            body.classList.remove('light-theme');
            themeIndicator.innerHTML = '🌙';
            themeIndicator.style.backgroundColor = '#ff9801';
            isDarkTheme = true;
        }
    };
    
    // об авторе
    const authorLink = document.getElementById('author-link');
    const tooltip = document.querySelector('.author-tooltip');
    
    authorLink.onmouseenter = function() {
        tooltip.style.display = 'block';
    };
    
    authorLink.onmouseleave = function() {
        tooltip.style.display = 'none';
    };
    
    authorLink.onclick = function(event) {
        event.preventDefault();
    };
};