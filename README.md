# QRaft 🎯

> Simple, fast, and customizable QR code generator that runs entirely in your browser

## ✨ Features

- **Generate QR codes** from any text, URL, or email address
- **Customizable appearance**:
  - Adjustable size (100-400px)
  - Custom colors for foreground and background
  - Multiple error correction levels (Low/Medium/Quartile/High)
- **Dark/Light theme** with automatic persistence
- **Export options**:
  - Download as PNG image
  - Download as SVG file
- **Fully responsive** design for mobile and desktop
- **No server required** - everything runs locally in your browser
- **Privacy-focused** - your data never leaves your device

## 🚀 Getting Started

### Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start generating QR codes!

### Using a Web Server

For the best experience, serve the files using any static web server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 📖 How to Use

1. **Enter your content**: Type or paste any text, URL, or email address into the text area
2. **Customize (optional)**:
   - Adjust the size using the slider (100-400 pixels)
   - Change colors using the color pickers
   - Select error correction level based on your needs
3. **Generate**: Click "Generate QR Code" or press `Ctrl+Enter`
4. **Download**: Choose PNG or SVG format to save your QR code

### Error Correction Levels

- **Low (7%)**: Smallest file size, suitable for clean environments
- **Medium (15%)**: Balanced option (default)
- **Quartile (25%)**: Better error recovery
- **High (30%)**: Maximum error recovery, suitable for QR codes that might get damaged

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with CSS variables for theming
- **Vanilla JavaScript** - No framework dependencies
- **[qrcodejs](https://github.com/davidshimjs/qrcodejs)** - QR code generation library

## 📁 Project Structure

```
QRaft/
├── index.html    # Main HTML structure
├── styles.css    # Styling and themes
├── script.js     # Application logic
└── README.md     # Documentation
```

## 🌐 Browser Compatibility

QRaft works in all modern browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Customization

### Modifying Size Limits

Edit the size input range in `index.html`:
```html
<input type="range" id="sizeInput" min="100" max="400" value="250">
```

### Adding Color Presets

You can extend the color inputs in `script.js` to include preset color schemes.

### Changing Themes

Theme colors are defined as CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4f46e5;
    /* ... other variables */
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Made with ❤️ using vanilla web technologies