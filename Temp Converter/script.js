const convertBtn = document.getElementById('convert');
const clearBtn = document.getElementById('clear');

convertBtn.addEventListener('click', tempConvert);
clearBtn.addEventListener('click', clearForm);

function tempConvert() {

    const fahrenheitInput = document.getElementById("fahrenheit");
    const celsiusInput = document.getElementById("celsius");

    let fahrenheit = parseFloat(fahrenheitInput.value);
    let celsius = parseFloat(celsiusInput.value);

    if (isNaN(fahrenheit) && isNaN(celsius)) {
        alert('Please enter a valid temperature');
        return;
    }

    if (isNaN(fahrenheit)) {
        fahrenheit = (celsius * 1.8) + 32;
        fahrenheitInput.value = fahrenheit.toFixed(1);
    } else if (isNaN(celsius)) {
        celsius = (fahrenheit - 32) / 1.8;
        celsiusInput.value = celsius.toFixed(1);
    }

}

function clearForm() {
    document.getElementById('fahrenheit').value = '';
    document.getElementById('celsius').value = '';
}
