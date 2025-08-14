// DOM Elements
const textInput = document.getElementById('textInput');
const sizeInput = document.getElementById('sizeInput');
const sizeValue = document.getElementById('sizeValue');
const marginInput = document.getElementById('marginInput');
const marginValue = document.getElementById('marginValue');
const darkColor = document.getElementById('darkColor');
const darkColorText = document.getElementById('darkColorText');
const lightColor = document.getElementById('lightColor');
const lightColorText = document.getElementById('lightColorText');
const errorCorrection = document.getElementById('errorCorrection');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const qrcodeContainer = document.getElementById('qrcode');
const downloadOptions = document.getElementById('downloadOptions');
const downloadPNG = document.getElementById('downloadPNG');
const downloadSVG = document.getElementById('downloadSVG');
const themeToggle = document.getElementById('themeToggle');

// State
let currentQRCode = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Set up event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Generate QR Code
    generateBtn.addEventListener('click', generateQRCode);
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            generateQRCode();
        }
    });

    // Clear
    clearBtn.addEventListener('click', clearAll);

    // Size slider
    sizeInput.addEventListener('input', (e) => {
        sizeValue.textContent = `${e.target.value}px`;
    });

    // Margin slider
    marginInput.addEventListener('input', (e) => {
        marginValue.textContent = e.target.value;
    });

    // Color inputs sync
    darkColor.addEventListener('input', (e) => {
        darkColorText.value = e.target.value;
    });

    darkColorText.addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            darkColor.value = e.target.value;
        }
    });

    lightColor.addEventListener('input', (e) => {
        lightColorText.value = e.target.value;
    });

    lightColorText.addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            lightColor.value = e.target.value;
        }
    });

    // Download buttons
    downloadPNG.addEventListener('click', () => downloadQRCode('png'));
    downloadSVG.addEventListener('click', () => downloadQRCode('svg'));

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
}

function generateQRCode() {
    const text = textInput.value.trim();
    
    if (!text) {
        showError('Please enter some text to generate a QR code');
        return;
    }

    clearError();
    
    // Clear previous QR code
    qrcodeContainer.innerHTML = '';
    
    try {
        // Create new QR code
        currentQRCode = new QRCode(qrcodeContainer, {
            text: text,
            width: parseInt(sizeInput.value),
            height: parseInt(sizeInput.value),
            colorDark: darkColor.value,
            colorLight: lightColor.value,
            correctLevel: QRCode.CorrectLevel[errorCorrection.value]
        });
        
        // Show download options
        downloadOptions.style.display = 'flex';
        
    } catch (error) {
        showError('Failed to generate QR code: ' + error.message);
    }
}

function downloadQRCode(format) {
    if (!currentQRCode) return;

    const filename = `qrcode_${Date.now()}`;
    
    // Get the canvas or image element from QRCode
    const canvas = qrcodeContainer.querySelector('canvas');
    const img = qrcodeContainer.querySelector('img');
    
    if (format === 'png') {
        if (canvas) {
            // Download from canvas
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${filename}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        } else if (img) {
            // Download from img
            const a = document.createElement('a');
            a.href = img.src;
            a.download = `${filename}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    } else if (format === 'svg') {
        // For SVG, we need to regenerate as SVG
        // Since qrcodejs doesn't support SVG export, we'll create a simple SVG from the canvas
        if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
    <image xlink:href="${dataUrl}" width="${canvas.width}" height="${canvas.height}"/>
</svg>`;
            
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.svg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
}

function clearAll() {
    textInput.value = '';
    qrcodeContainer.innerHTML = '';
    downloadOptions.style.display = 'none';
    currentQRCode = null;
    clearError();
    
    // Reset to defaults
    sizeInput.value = 250;
    sizeValue.textContent = '250px';
    marginInput.value = 4;
    marginValue.textContent = '4';
    darkColor.value = '#000000';
    darkColorText.value = '#000000';
    lightColor.value = '#ffffff';
    lightColorText.value = '#ffffff';
    errorCorrection.value = 'M';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function showError(message) {
    clearError();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    textInput.parentElement.appendChild(errorDiv);
}

function clearError() {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Auto-generate on page load if there's text in the input
window.addEventListener('load', () => {
    if (textInput.value.trim()) {
        generateQRCode();
    }
});