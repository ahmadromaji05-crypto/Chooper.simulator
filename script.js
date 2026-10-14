let rakeSlider, handlebarSlider, tankSelect, colorPicker, randomBtn;
let rakeValSpan, handlebarValSpan;

function setup() {
    let canvas = createCanvas(500, 400);
    canvas.parent('canvas-container');

    // Ambil elemen HTML
    rakeSlider = document.getElementById('rakeRange');
    handlebarSlider = document.getElementById('handlebarRange');
    tankSelect = document.getElementById('tankType');
    colorPicker = document.getElementById('frameColor');
    
    rakeValSpan = document.getElementById('rakeVal');
    handlebarValSpan = document.getElementById('handlebarVal');
    randomBtn = document.getElementById('randomBtn');

    // Event listener tombol acak (Fitur Generator Otomatis)
    randomBtn.addEventListener('click', randomizeChopper);
}

function draw() {
    background(20);

    // Update nilai teks pada label slider
    rakeValSpan.innerText = rakeSlider.value;
    handlebarValSpan.innerText = handlebarSlider.value;

    let rakeAngle = float(rakeSlider.value);
    let barHeight = float(handlebarSlider.value);
    let tankStyle = tankSelect.value;
    let baseColor = colorPicker.value;

    drawChopper(rakeAngle, barHeight, tankStyle, baseColor);
}

function drawChopper(rake, barH, tank, col) {
    push();
    translate(150, 280); // Titik pusat roda belakang

    let customColor = color(col);

    // --- 1. Roda Belakang & Depan ---
    stroke(200);
    strokeWeight(4);
    fill(40);
    // Roda Belakang
    ellipse(0, 0, 90, 90);
    fill(200);
    ellipse(0, 0, 15, 15);

    // Posisi Roda Depan berdasarkan sudut rake & panjang garpu
    let forkLength = 220;
    let angleRad = radians(rake);
    // Perhitungan trigonometri posisi sumbu roda depan
    let frontWheelX = 180 + sin(angleRad) * (forkLength * 0.6);
    let frontWheelY = -cos(angleRad) * (forkLength * 0.8) - 20;

    // Roda Depan
    push();
    translate(frontWheelX, frontWheelY);
    stroke(200);
    strokeWeight(4);
    fill(40);
    ellipse(0, 0, 70, 70);
    fill(200);
    ellipse(0, 0, 12, 12);
    pop();

    // --- 2. Rangka (Frame) Chopper ---
    stroke(customColor);
    strokeWeight(6);
    // Swingarm / Rangka Belakang ke Mesin
    line(0, 0, 60, -40);
    // Rangka Utama ke Leher Kemudi (Neck)
    let neckX = 70 + sin(angleRad) * 30;
    let neckY = -90;
    line(60, -40, neckX, neckY);
    line(0, 0, 60, -40);

    // --- 3. Mesin ---
    noStroke();
    fill(100);
    rect(40, -75, 55, 55, 8);
    fill(150);
    ellipse(67, -47, 30, 30); // Detail silinder mesin

    // --- 4. Garpu Depan (Fork) & Setang (Ape Hanger) ---
    stroke(220);
    strokeWeight(5);
    // Garpu dari neck ke roda depan
    line(neckX, neckY, frontWheelX, frontWheelY);

    // Batang Setang ke atas
    let handleTopX = neckX - (barH * 0.2);
    let handleTopY = neckY - barH;
    strokeWeight(6);
    line(neckX, neckY, handleTopX, handleTopY);
    
    // Pegangan Setang (Grip)
    strokeWeight(7);
    line(handleTopX - 25, handleTopY, handleTopX + 25, handleTopY);

    // --- 5. Tangki Bahan Bakar ---
    fill(customColor);
    noStroke();
    push();
    translate(neckX - 35, neckY + 15);
    if (tank === 'peanut') {
        ellipse(0, 0, 65, 35);
    } else if (tank === 'frisco') {
        rect(-30, -15, 65, 30, 5);
    } else if (tank === 'coffins') {
        quad(-25, -15, 25, -10, 30, 15, -30, 15);
    }
    pop();

    // --- 6. Jok (Seat) ---
    fill(40);
    noStroke();
    beginShape();
    vertex(40, -50);
    vertex(75, -50);
    vertex(65, -65);
    vertex(35, -60);
    endShape(CLOSE);

    pop();
}

// Fungsi untuk mengacak desain secara otomatis
function randomizeChopper() {
    rakeSlider.value = floor(random(35, 60));
    handlebarSlider.value = floor(random(30, 80));
    
    let tanks = ['peanut', 'frisco', 'coffins'];
    tankSelect.value = random(tanks);

    let randomColor = '#' + floor(random(0, 16777215)).toString(16).padStart(6, '0');
    colorPicker.value = randomColor;
}
