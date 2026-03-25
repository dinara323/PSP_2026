window.onload = function() {
    let currentNumber = '';
    
    const outputElement = document.getElementById('result');
    
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (digit === '.') {
            if (currentNumber === '') {
                currentNumber = '0.';
            }
            else if (!currentNumber.includes('.')) {
                currentNumber += digit;
            }
        } 
        else {
            currentNumber += digit;
            
            if (currentNumber.length > 1 && currentNumber[0] === '0' && currentNumber[1] !== '.') {
                currentNumber = currentNumber.substring(1);
            }
        }
        
        outputElement.innerHTML = currentNumber || '0';
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = this.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    document.getElementById('btn_op_clear').onclick = function() {
        currentNumber = '';
        outputElement.innerHTML = '0';
    };


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

    // блок темы
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
    // блок кнопки про автора
    const authorLink = document.getElementById('author-link');
    const tooltip = document.getElementById('.author-tooltip');
    
    authorLink.onmouseenter = function() {
        tooltip.style.display = 'block';
    };
    
    authorLink.onmouseleave = function() {
        tooltip.style.display = 'none';
    };
    

};