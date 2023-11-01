// Obtenha referências dos elementos da DOM
const amountInput = document.getElementById("amount") as HTMLInputElement;
const fromCurrencySelect = document.getElementById("fromCurrency") as HTMLSelectElement;
const toCurrencySelect = document.getElementById("toCurrency") as HTMLSelectElement;
const convertButton = document.getElementById("convertButton") as HTMLButtonElement;
const conversionResultSpan = document.getElementById("conversionResult") as HTMLSpanElement;

// Função para fazer a conversão
const convertCurrency = async () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    try {
        // Chamar a API para obter a taxa de conversão
        const response = await fetch(`https://v6.exchangerate-api.com/v6/eed4311b7256ac1b328dfff1/latest/${fromCurrency}`);
        const data = await response.json();

        if (data && data.conversion_rates && data.conversion_rates[toCurrency]) {
            const exchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = amount * exchangeRate;
            conversionResultSpan.textContent = convertedAmount.toFixed(2);
        } else {
            conversionResultSpan.textContent = "Erro na conversão";
        }
    } catch (error) {
        conversionResultSpan.textContent = "Erro ao acessar a API";
    }
};

// Adicionar um event listener ao botão de conversão
convertButton.addEventListener("click", convertCurrency);
