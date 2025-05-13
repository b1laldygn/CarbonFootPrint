let currentStep = 0;
const formSteps = document.querySelectorAll(".step");
const resultContainer = document.getElementById("result");
function showStep(step) {
    formSteps.forEach((formStep, index) => {
        // Tüm adımları gizle
        formStep.classList.remove("active", "step-left", "step-right");
        formStep.style.display = "none";

        if (index === step) {
            // Sadece aktif adımı göster
            formStep.classList.add("active");
            formStep.style.display = "flex";

            // SAĞ-SOL geçişini ayarlayan kısım
            if (step % 2 === 0) {
                formStep.classList.add("step-left");
            } else {
                formStep.classList.add("step-right");
            }
        }
    });

     if (step === formSteps.length - 1) {
        document.querySelectorAll('.nextBtn').forEach(btn => {
            btn.textContent = "Sonuçları Göster";
        });
    } else {
        document.querySelectorAll('.nextBtn').forEach(btn => {
            btn.textContent = "İleri";
        });
    }

    const backgrounds = [
        './assets/bg1.png',
        './assets/bg2.png',
        './assets/bg3.png',
        './assets/bg4.png',
        './assets/bg5.png',
        './assets/bg6.png',
        './assets/bg7.png',
        './assets/bg8.png',
        './assets/bg9.png'
    ];

    document.body.style.backgroundImage = `url("${backgrounds[step]}")`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'scroll';
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

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

function showResult() {
    const meatKg = parseInt(document.querySelectorAll('.step')[0].querySelector('.selected')?.getAttribute('data-value')) || 0;
    const recycle = parseInt(document.querySelectorAll('.step')[1].querySelector('.selected')?.getAttribute('data-value')) || 0;
    const renewableEnergy = parseInt(document.querySelectorAll('.step')[2].querySelector('.selected')?.getAttribute('data-value')) || 0;
    const transport = parseInt(document.querySelectorAll('.step')[3].querySelector('.selected')?.getAttribute('data-value')) || 0;
    const naturalFood = parseInt(document.querySelectorAll('.step')[4].querySelector('.selected')?.getAttribute('data-value')) || 0;
    const plasticBottles = parseInt(document.querySelectorAll('.step')[5].querySelector('.selected')?.getAttribute('data-value')) || 0;
    const lightsOff = parseInt(document.querySelectorAll('.step')[6].querySelector('.selected')?.getAttribute('data-value')) || 0;
    const gardening = parseInt(document.querySelectorAll('.step')[7].querySelector('.selected')?.getAttribute('data-value')) || 0;
    const parcels = parseInt(document.querySelectorAll('.step')[8].querySelector('.selected')?.getAttribute('data-value')) || 0;

    let carbonFootprint = 0;
    if (!isNaN(meatKg)) carbonFootprint += meatKg * 3;
    if (recycle === 1) carbonFootprint -= 5;
    if (renewableEnergy === 1) carbonFootprint -= 10;
    if (!isNaN(transport)) carbonFootprint += transport * 1;
    if (!isNaN(naturalFood)) carbonFootprint -= naturalFood * 2;
    if (!isNaN(plasticBottles)) carbonFootprint += plasticBottles * 0.5;
    if (lightsOff === 1) carbonFootprint -= 5;
    if (gardening === 1) carbonFootprint -= 10;
    if (!isNaN(parcels)) carbonFootprint += parcels * 0.5;

    sessionStorage.setItem('carbonFootprint', (carbonFootprint * 52)+3000);
    window.location.href = "sonuc.html";
}

document.addEventListener("DOMContentLoaded", () => {
    resultContainer.style.display = "none";
    showStep(currentStep);

    document.querySelectorAll('.prevBtn').forEach(btn => {
        btn.addEventListener("click", prevStep);
    });

    document.querySelectorAll('.nextBtn').forEach(btn => {
        btn.addEventListener("click", nextStep);
    });

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            option.parentElement.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
});
