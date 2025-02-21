const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 256;
canvas.height = 224;

// Inicializar SNES9x WASM
let snes = new Snes9xWASM({
    canvas: canvas,
});

// Cargar la ROM seleccionada
document.getElementById('romInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const romData = new Uint8Array(reader.result);
            snes.loadROM(romData);
            snes.run();
        };
        reader.readAsArrayBuffer(file);
    }
});

// Mapeo de controles para SNES
const keyMap = {
    'ArrowUp': 'UP',
    'ArrowDown': 'DOWN',
    'ArrowLeft': 'LEFT',
    'ArrowRight': 'RIGHT',
    'x': 'A',
    'z': 'B',
    'a': 'X',
    's': 'Y',
    'Shift': 'L',
    'Control': 'R',
    'Enter': 'START',
    'Backspace': 'SELECT'
};

document.addEventListener('keydown', (event) => {
    if (keyMap[event.key]) {
        snes.pressButton(keyMap[event.key]);
    }
});

document.addEventListener('keyup', (event) => {
    if (keyMap[event.key]) {
        snes.releaseButton(keyMap[event.key]);
    }
});