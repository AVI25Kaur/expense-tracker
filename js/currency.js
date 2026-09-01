const CURRENCY_CACHE_KEY='exchangeRatesCache';
const CACHE_DURATION_MS=60*60*1000; 

async function fetchExchangeRates(baseCurrency='INR') {
    const cached=getCachedRates(baseCurrency);
    if (cached) {
        return cached;
    }
    try {
        
        const response=await fetch(`https://api.frankfurter.dev/v1/latest?base=USD`);
        if (!response.ok) {
            throw new Error(`API error:${response.status}`);
        }
        const data=await response.json();
        const usdRates={...data.rates, USD:1};
        const baseRateInUsd=usdRates[baseCurrency];
        if (!baseRateInUsd) {
            throw new Error(`Base currency ${baseCurrency} not supported`);
        }
        const rates={};
        for (const [currency, rateVsUsd] of Object.entries(usdRates)) {
            if (currency===baseCurrency) continue;
            rates[currency]=rateVsUsd/baseRateInUsd;
        }
        cacheRates(baseCurrency,rates);
        return rates;
    } catch (err) {
        console.error('failed to fetch exchange rates:',err);
        return null;
    }
}

function getCachedRates(baseCurrency) {
    const raw=localStorage.getItem(CURRENCY_CACHE_KEY);
    if (!raw) {
        return null;
    }
    const cache=JSON.parse(raw);
    if (cache.base!==baseCurrency) {
        return null;
    }
    if (Date.now()-cache.timestamp>CACHE_DURATION_MS) {
        return null;
    }
    return cache.rates;
}

function cacheRates(baseCurrency,rates) {
    localStorage.setItem(CURRENCY_CACHE_KEY,JSON.stringify({
        base:baseCurrency,
        rates,
        timestamp:Date.now()
    }));
}

function convertCurrency(amount,fromCurrency,toCurrency,rates) {
    if (fromCurrency===toCurrency) {
        return amount;
    }
    if (fromCurrency==='INR') {
        return amount*rates[toCurrency];
    }
    if (toCurrency==='INR') {
        return amount/rates[fromCurrency];
    }
    const inlnr=amount/rates[fromCurrency];
    return inlnr*rates[toCurrency];
}

async function renderCurrencyWidget(container) {
    const rates=await fetchExchangeRates('INR');
    const currencies=rates ? Object.keys(rates):['USD','EUR','GBP'];

    container.innerHTML=`
        <div class="currency-widget">
        <h3>Currency Converter</h3>
        <input type="number" id="curr-amount" placeholder="Amount" value="1">
        <select id="fromCurrency">
        <option value="INR">INR</option>
        ${currencies.map(cur=>`<option value="${cur}">${cur}</option>`).join('')}
        </select>
        <span>-></span>
        <select id="curr-to">
        ${currencies.map(c=>`<option value="${c}"${c==='USD' ? ' selected' : ''}>${c}</option>`).join('')}
        </select>
        <div id="curr-result" class="currency-result"></div>
        </div>
    `;


const amountInput=document.getElementById('curr-amount');
const fromSelect=document.getElementById('fromCurrency');
const toSelect=document.getElementById('curr-to');
const resultDiv=document.getElementById('curr-result');

function updateResult() {
    if(!rates){
        resultDiv.textContent='Exchange rates not available.';
        return;
    }
    const amount=parseFloat(amountInput.value) || 0;
    const from=fromSelect.value;
    const to=toSelect.value;
    const converted=convertCurrency(amount,from,to,rates);
    resultDiv.textContent=`${amount} ${from} = ${converted.toFixed(2)} ${to}`;
}

amountInput.addEventListener('input',updateResult);
fromSelect.addEventListener('change',updateResult);
toSelect.addEventListener('change',updateResult);

updateResult();
}
