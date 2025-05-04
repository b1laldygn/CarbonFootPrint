let currentStep = 0;
const formSteps = document.querySelectorAll(".step");
const nextButton = document.getElementById("nextBtn");
const prevButton = document.getElementById("prevBtn");
const bikeUsageInput = document.getElementById("bikeUsage");
const naturalFoodInput = document.getElementById("naturalFood");
const plasticBottlesInput = document.getElementById("plasticBottles");
const lightsOffInput = document.getElementById("lightsOff");
const gardeningInput = document.getElementById("gardening");
const resultContainer = document.getElementById("result");

// Soruları formdan alalım
//const carKmInput = document.getElementById("carKm");
//const flightInput = document.getElementById("flight");
const meatInput = document.getElementById("meat");
const recycleInput = document.getElementById("recycle");
const renewableInput = document.getElementById("renewable");
const peopleInput = document.getElementById("people");
const publicTransportInput = document.getElementById("publicTransport");
//const waterSavingInput = document.getElementById("waterSaving");
//const ecoProductsInput = document.getElementById("ecoProducts");
//const energySavingInput = document.getElementById("energySaving");
const bikeUsage = parseInt(bikeUsageInput.value);
const naturalFood = parseInt(naturalFoodInput.value);
const plasticBottles = parseInt(plasticBottlesInput.value);
const lightsOff = parseInt(lightsOffInput.value);
const gardening = parseInt(gardeningInput.value);
nextButton.addEventListener("click", nextStep);
prevButton.addEventListener("click", prevStep);

function showStep(step) {
    formSteps.forEach((formStep, index) => {
        formStep.classList.remove("active");
        if (index === step) {
            formStep.classList.add("active");
        }
    });

    if (step === formSteps.length - 1) {
        nextButton.textContent = "Sonuçları Göster";
    } else {
        nextButton.textContent = "İleri";
    }
}

function nextStep() {
    if (currentStep < formSteps.length - 1) {
        currentStep++;
        showStep(currentStep);
    } else {
        // Son adımda sonucu göster
        showResult();
        // Formu gizle
        document.querySelector("form").style.display = "none";
        // Sonuç kutusunu göster
        resultContainer.style.display = "block";
    }
}

// Sayfa ilk yüklendiğinde sadece sonucu gizle
document.addEventListener("DOMContentLoaded", () => {
    resultContainer.style.display = "none";
    showStep(currentStep);
});


function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

// Soruların cevaplarını alarak hesaplama yapalım
function showResult() {
    //const carKm = parseFloat(carKmInput.value);
    //const flightKm = parseFloat(flightInput.value);
    const meatKg = parseFloat(meatInput.value);
    const recycle = parseInt(recycleInput.value);
    const renewableEnergyPercentage = parseInt(renewableInput.value);
    const people = parseInt(peopleInput.value);
    const publicTransportKm = parseFloat(publicTransportInput.value);
    //const waterSaving = waterSavingInput.value.trim() ? "Evet" : "Hayır";
    //const ecoProducts = parseInt(ecoProductsInput.value);
    //const energySaving = energySavingInput.value.trim() ? "Evet" : "Hayır";

    // Hesaplama - Örnek değerler (gerçek formüller için daha karmaşık hesaplamalar yapılabilir)
    let carbonFootprint = 0;

    // Araba ile seyahat
    //if (!isNaN(carKm)) carbonFootprint += carKm * 0.2; // 0.2 kg CO2/km (ortalama)
    
    // Uçak ile seyahat
    //if (!isNaN(flightKm)) carbonFootprint += flightKm * 0.15; // 0.15 kg CO2/km (ortalama)

    // Et tüketimi
    if (!isNaN(meatKg)) carbonFootprint += meatKg * 20; // 20 kg CO2/kg et (ortalama)

    // Geri dönüşüm
    if (recycle === 1) carbonFootprint -= 5; // Geri dönüşüm CO2 tasarrufu

    // Yenilenebilir enerji oranı
    if (!isNaN(renewableEnergyPercentage)) carbonFootprint -= renewableEnergyPercentage * 0.3; // Yüzdeye göre tasarruf

    // Evdeki kişi sayısı
    if (!isNaN(people)) carbonFootprint += people * 2; // 2 kg CO2/kişi (ortalama)

    // Toplu taşıma kullanımı
    if (!isNaN(publicTransportKm)) carbonFootprint += publicTransportKm * 0.05; // 0.05 kg CO2/km (ortalama)

    // Su tasarrufu
    //if (waterSaving === "Evet") carbonFootprint -= 10; // Su tasarrufu için CO2 tasarrufu

    // Doğa dostu ürünler kullanımı
    //if (ecoProducts === 1) carbonFootprint -= 10; // Organik gıda ve doğa dostu ürünler için CO2 tasarrufu

    // Enerji tasarrufu
    //if (energySaving === "Evet") carbonFootprint -= 10; // Enerji tasarrufu için CO2 tasarrufu

    // Calculate carbon footprint adjustments
    if (!isNaN(bikeUsage)) carbonFootprint -= bikeUsage * 1; // Assume 1 kg CO2 saved per ride
    if (!isNaN(naturalFood)) carbonFootprint -= naturalFood * 2; // Assume 2 kg CO2 saved per meal
    if (!isNaN(plasticBottles)) carbonFootprint += plasticBottles * 0.5; // Assume 0.5 kg CO2 per bottle used
    if (lightsOff === 1) carbonFootprint -= 5; // Assume 5 kg CO2 saved per year
    if (gardening === 1) carbonFootprint -= 10; // Assume 10 kg CO2 saved per year

    // Sonuçları göster
    resultContainer.innerHTML = `
        <h3>Karbon Ayak İzinizi Hesapladık!</h3>
        <p>Toplam Karbon Ayak İzinizi: <strong>${carbonFootprint.toFixed(2)} kg CO2</strong></p>
    `;
}

showStep(currentStep);
