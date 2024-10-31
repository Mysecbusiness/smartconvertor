const conversions = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701,
        nanometer: 1e9,  // Engineering, medical
        micron: 1e6,     // Medical, engineering
    },
    weight: {
        gram: 1,
        kilogram: 0.001,
        milligram: 1000,
        pound: 0.00220462,
        ounce: 0.035274,
        microgram: 1e6,   // Medical
    },
    temperature: {
        celsius: (val) => val,
        fahrenheit: (val) => (val * 9/5) + 32,
        kelvin: (val) => val + 273.15,
        rankine: (val) => (val + 273.15) * 9/5,  // Engineering, weather
    },
    volume: {
        liter: 1,
        milliliter: 1000,
        gallon: 0.264172,
        quart: 1.05669,
        pint: 2.11338,
        cubic_meter: 0.001,  // Engineering
        cubic_inch: 61.0237, // Engineering
    },
    time: {
        second: 1,
        minute: 1 / 60,
        hour: 1 / 3600,
        day: 1 / 86400,
        millisecond: 1000,   // Web development
        microsecond: 1e6,    // Engineering, web
    },
    speed: {
        'meter per second': 1,
        'kilometer per hour': 3.6,
        'mile per hour': 2.23694,
        'knot': 1.94384,       // Weather, navigation
        'speed of light': 3.33564e-9, // Physics, engineering
    },
    data: {
        bit: 1,
        byte: 1 / 8,
        kilobyte: 1 / 8192,
        megabyte: 1 / (8 * 1024 ** 2),
        gigabyte: 1 / (8 * 1024 ** 3),
        terabyte: 1 / (8 * 1024 ** 4),
        petabyte: 1 / (8 * 1024 ** 5),
    },
    angle: {
        degree: 1,
        radian: Math.PI / 180,
        gradian: 1.11111,   // Engineering, graphics
    },
    pressure: {
        pascal: 1,
        atmosphere: 9.86923e-6,
        bar: 1e-5,
        psi: 0.000145038,   // Engineering, weather
    }
};

function populateUnits() {
    currentCategory = document.getElementById("category").value;
    const units = Object.keys(conversions[currentCategory]);
    const inputUnitSelect = document.getElementById("inputUnit");
    const outputUnitSelect = document.getElementById("outputUnit");

    inputUnitSelect.innerHTML = '';
    outputUnitSelect.innerHTML = '';

    units.forEach(unit => {
        inputUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        outputUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    });

    convertUnit();
}

function convertUnit() {
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const inputUnit = document.getElementById("inputUnit").value;
    const outputUnit = document.getElementById("inputUnit").value;
}

const unitDescriptions = {
    length: {
        meter: "Basic unit of length in the metric system.",
        kilometer: "1,000 meters; commonly used for measuring long distances.",
        centimeter: "0.01 meters; used in everyday measurements.",
        millimeter: "0.001 meters; used for precision measurements.",
        mile: "1,609.34 meters; used mainly in the U.S. and UK.",
        yard: "0.9144 meters; commonly used in sports.",
        foot: "0.3048 meters; used in the U.S.",
        inch: "0.0254 meters; commonly used in U.S. and UK.",
        nanometer: "1e-9 meters; used in scientific measurements.",
        micron: "1e-6 meters; also known as a micrometer.",
    },
    weight: {
        gram: "Basic unit of mass in the metric system.",
        kilogram: "1,000 grams; standard unit for mass.",
        milligram: "0.001 grams; used in medicine and science.",
        pound: "0.453592 kg; commonly used in the U.S.",
        ounce: "0.0283495 kg; often used for food measurements.",
        microgram: "1e-6 grams; used in laboratory science.",
    },
    // Add similar descriptions for other units and categories...
};

function populateUnits() {
    currentCategory = document.getElementById("category").value;
    const units = Object.keys(conversions[currentCategory]);
    const inputUnitSelect = document.getElementById("inputUnit");
    const outputUnitSelect = document.getElementById("outputUnit");

    inputUnitSelect.innerHTML = '';
    outputUnitSelect.innerHTML = '';

    units.forEach(unit => {
        inputUnitSelect.innerHTML += `<option value="${unit}" title="${unitDescriptions[currentCategory][unit] || ''}">${unit}</option>`;
        outputUnitSelect.innerHTML += `<option value="${unit}" title="${unitDescriptions[currentCategory][unit] || ''}">${unit}</option>`;
    });

    convertUnit();
}

function convertUnit() {
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const inputUnit = document.getElementById("inputUnit").value;
    const outputUnit = document.getElementById("outputUnit").value;
    const outputValueField = document.getElementById("outputValue");
    const precision = parseInt(document.getElementById("precision").value) || 2;

    if (!inputValue) {
        outputValueField.value = '';
        return;
    }

    let result;
    if (currentCategory === 'temperature') {
        result = convertTemperature(inputValue, inputUnit, outputUnit);
    } else {
        const inputConversionRate = conversions[currentCategory][inputUnit];
        const outputConversionRate = conversions[currentCategory][outputUnit];
        result = (inputValue * inputConversionRate) / outputConversionRate;
    }

    outputValueField.value = result.toFixed(precision);
    addToHistory(inputValue, inputUnit, result, outputUnit);
}

    
    let currentCategory = 'length';
    
    function populateUnits() {
        currentCategory = document.getElementById("category").value;
        const units = Object.keys(conversions[currentCategory]);
        const inputUnitSelect = document.getElementById("inputUnit");
        const outputUnitSelect = document.getElementById("outputUnit");
    
        inputUnitSelect.innerHTML = '';
        outputUnitSelect.innerHTML = '';
    
        units.forEach(unit => {
            inputUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
            outputUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        });
    
        convertUnit();
    }
    
    function convertUnit() {
        const inputValue = parseFloat(document.getElementById("inputValue").value);
        const inputUnit = document.getElementById("inputUnit").value;
        const outputUnit = document.getElementById("outputUnit").value;
        const outputValueField = document.getElementById("outputValue");
    
        if (!inputValue) {
            outputValueField.value = '';
            return;
        }
    
        let result;
        if (currentCategory === 'temperature') {
            result = convertTemperature(inputValue, inputUnit, outputUnit);
        } else {
            const inputConversionRate = conversions[currentCategory][inputUnit];
            const outputConversionRate = conversions[currentCategory][outputUnit];
            result = (inputValue * inputConversionRate) / outputConversionRate;
        }
    
        outputValueField.value = result.toFixed(2);
        addToHistory(inputValue, inputUnit, result, outputUnit);
    }
    
    function convertTemperature(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;
    
        if (fromUnit === 'celsius') {
            return toUnit === 'fahrenheit' ? (value * 9/5) + 32 : value + 273.15;
        } else if (fromUnit === 'fahrenheit') {
            return toUnit === 'celsius' ? (value - 32) * 5/9 : (value - 32) * 5/9 + 273.15;
        } else if (fromUnit === 'kelvin') {
            return toUnit === 'celsius' ? value - 273.15 : (value - 273.15) * 9/5 + 32;
        }
    }
    
    function addToHistory(inputValue, inputUnit, outputValue, outputUnit) {
        const history = document.getElementById("history");
        const conversion = `${inputValue} ${inputUnit} = ${outputValue} ${outputUnit}`;
        const listItem = document.createElement("li");
        listItem.textContent = conversion;
        history.prepend(listItem);
    
        if (history.childElementCount > 5) {
            history.removeChild(history.lastChild);
        }
    }
    
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
    }
    
    // Initial population of units
    populateUnits();



