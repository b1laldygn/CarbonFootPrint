let currentStep = 0;
const formSteps = document.querySelectorAll(".step");
const nextButton = document.getElementById("nextBtn");
const prevButton = document.getElementById("prevBtn");
const resultContainer = document.getElementById("result");

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
        showResult();
        document.querySelector("form").style.display = "none";
        resultContainer.style.display = "block";
    }
}

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

function showResult() {
    const meatKg = parseInt(document.querySelectorAll('.step')[0].querySelector('.selected').getAttribute('data-value')) || 0;
    const recycle = parseInt(document.querySelectorAll('.step')[1].querySelector('.selected').getAttribute('data-value')) || 0;
    const renewableEnergyPercentage = parseInt(document.querySelectorAll('.step')[2].querySelector('.selected').getAttribute('data-value')) || 0;
    const people = parseInt(document.querySelectorAll('.step')[3].querySelector('.selected').getAttribute('data-value')) || 0;
    const publicTransportKm = parseInt(document.querySelectorAll('.step')[4].querySelector('.selected').getAttribute('data-value')) || 0;
    const bikeUsage = parseInt(document.querySelectorAll('.step')[5].querySelector('.selected').getAttribute('data-value')) || 0;
    const naturalFood = parseInt(document.querySelectorAll('.step')[6].querySelector('.selected').getAttribute('data-value')) || 0;
    const plasticBottles = parseInt(document.querySelectorAll('.step')[7].querySelector('.selected').getAttribute('data-value')) || 0;
    const lightsOff = parseInt(document.querySelectorAll('.step')[8].querySelector('.selected').getAttribute('data-value')) || 0;
    const gardening = parseInt(document.querySelectorAll('.step')[9].querySelector('.selected').getAttribute('data-value')) || 0;

    let carbonFootprint = 0;

    if (!isNaN(meatKg)) carbonFootprint += meatKg * 20; // 20 kg CO2/kg et
    if (recycle === 1) carbonFootprint -= 5; // Geri dönüşüm CO2 tasarrufu
    if (!isNaN(renewableEnergyPercentage)) carbonFootprint -= renewableEnergyPercentage * 0.3; // Yenilenebilir enerji
    if (!isNaN(people)) carbonFootprint += people * 2; // 2 kg CO2/kişi
    if (!isNaN(publicTransportKm)) carbonFootprint += publicTransportKm * 0.05; // Toplu taşıma
    if (!isNaN(bikeUsage)) carbonFootprint -= bikeUsage * 1; // Bisiklet kullanımı
    if (!isNaN(naturalFood)) carbonFootprint -= naturalFood * 2; // Doğal gıda
    if (!isNaN(plasticBottles)) carbonFootprint += plasticBottles * 0.5; // Su şişesi
    if (lightsOff === 1) carbonFootprint -= 5; // Işıkları kapatma
    if (gardening === 1) carbonFootprint -= 10; // Bahçe

    resultContainer.innerHTML = `
        <h3>Karbon Ayak İzinizi Hesapladık!</h3>
        <p>Toplam Karbon Ayak İzinizi: <strong>${carbonFootprint.toFixed(2)} kg CO2</strong></p>
    `;
}

showStep(currentStep);