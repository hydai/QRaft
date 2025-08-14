# CLAUDE.md - AI Assistant Documentation for QRaft

## Project Overview

QRaft is a client-side QR code generator built with vanilla JavaScript, HTML, and CSS. It runs entirely in the browser without any server dependencies, making it privacy-focused and easy to deploy. The application uses the qrcodejs library for QR code generation and implements a clean, responsive UI with dark/light theme support.

## Architecture

### Design Principles
- **No Framework Dependencies**: Pure vanilla JavaScript for maximum compatibility
- **Client-Side Only**: All processing happens in the browser
- **Responsive First**: Mobile-friendly design that scales to desktop
- **Progressive Enhancement**: Core functionality works without JavaScript enabled browsers showing a message

### File Structure

```
QRaft/
├── index.html       # Main HTML structure with semantic markup
├── styles.css       # CSS with custom properties for theming
├── script.js        # Application logic and event handlers
├── README.md        # User-facing documentation
└── CLAUDE.md        # This file - AI assistant documentation
```

## Key Implementation Details

### State Management
The application maintains minimal state:
- `currentQRCode`: Reference to the active QRCode instance
- Theme preference stored in `localStorage`
- All other state derived from DOM elements

### Event Flow
1. User input triggers validation
2. QR code generation creates new QRCode instance
3. Canvas/image element inserted into DOM
4. Download options become visible
5. Export functions extract data from canvas/image

### Core Functions

#### `generateQRCode()`
- **Purpose**: Main QR code generation logic
- **Input**: Reads from DOM elements (text, size, colors, error correction)
- **Process**: Creates new QRCode instance with qrcodejs library
- **Output**: Renders QR code to DOM, shows download options
- **Error Handling**: Try-catch block with user-friendly error messages

#### `downloadQRCode(format)`
- **Purpose**: Export QR code as PNG or SVG
- **PNG Export**: Uses canvas.toBlob() or image src
- **SVG Export**: Creates SVG wrapper around PNG data (not true vector)
- **File Naming**: Uses timestamp for unique filenames

#### `toggleTheme()`
- **Purpose**: Switch between light and dark themes
- **Implementation**: Toggles data-theme attribute on document root
- **Persistence**: Saves preference to localStorage

#### `clearAll()`
- **Purpose**: Reset application to initial state
- **Actions**: Clears input, removes QR code, resets all controls

### Error Handling Strategy
- Input validation before QR generation
- Try-catch blocks around QR code creation
- User-friendly error messages displayed in UI
- Console errors suppressed in production

## Development Guidelines

### Code Style
- Use const/let, never var
- Descriptive function and variable names
- Comment complex logic
- Consistent indentation (2 spaces)

### Adding New Features
1. Maintain vanilla JavaScript approach
2. Test across all supported browsers
3. Ensure responsive design isn't broken
4. Update both README.md and CLAUDE.md

### Testing Checklist
- [ ] Generate QR codes with various text lengths
- [ ] Test all customization options
- [ ] Verify download functionality
- [ ] Check theme persistence
- [ ] Test responsive breakpoints
- [ ] Validate error messages
- [ ] Cross-browser testing

## Customization Points

### Size Limits
Located in `index.html`:
```html
min="100" max="400" step="10"
```
Changing requires updating validation in JavaScript

### Color Options
Currently uses HTML5 color inputs. To add presets:
1. Add preset buttons in HTML
2. Create click handlers in `setupEventListeners()`
3. Update color inputs programmatically

### Export Formats
Current limitation: SVG export embeds PNG data. For true vector SVG:
1. Consider alternative QR libraries (like qr-code-styling)
2. Implement custom SVG generation from QR matrix

## Performance Considerations

### Current Limitations
- QR generation is synchronous (blocks UI)
- Large QR codes (400px+) may cause brief freeze
- No web worker implementation

### Optimization Opportunities
1. Implement web workers for QR generation
2. Add debouncing to real-time generation
3. Lazy load qrcodejs library
4. Implement virtual scrolling for batch generation

## Future Enhancement Ideas

### High Priority
1. **Logo Embedding**: Add image in QR code center
2. **Batch Generation**: Multiple QR codes from CSV/list
3. **URL Shortening**: Integrate with shortening services
4. **True SVG Export**: Generate vector graphics

### Medium Priority
1. **QR Code Templates**: Preset designs for common uses
2. **History**: Recent QR codes with local storage
3. **Share Function**: Direct sharing to social media
4. **Print Optimization**: CSS for better printing

### Low Priority
1. **Analytics**: Anonymous usage statistics
2. **PWA Support**: Offline functionality
3. **Keyboard Shortcuts**: Power user features
4. **API Mode**: URL parameters for generation

## Known Issues & Limitations

### Current Bugs
- None reported

### Technical Limitations
1. **SVG Export**: Not true vector, embeds raster image
2. **Margin Setting**: UI exists but not connected to generation
3. **File Size**: Large QR codes create large PNG files
4. **Validation**: No QR code content validation

### Browser Quirks
- Safari: Color picker may have different UI
- Firefox: Download might not trigger with certain extensions
- Mobile: SVG download may not work on some devices

## Security Considerations

### Current Implementation
- No external API calls
- No data persistence beyond theme
- No analytics or tracking
- Content never leaves browser

### Potential Concerns
1. Large input could cause memory issues
2. No input sanitization (not needed for QR)
3. No rate limiting (client-side only)

## Debugging Tips

### Common Issues
1. **QR not generating**: Check console for qrcodejs errors
2. **Download not working**: Verify blob URL creation
3. **Theme not persisting**: Check localStorage access
4. **Responsive issues**: Inspect CSS grid behavior

### Debug Mode
Add to script.js for verbose logging:
```javascript
const DEBUG = true;
function log(...args) {
  if (DEBUG) console.log('[QRaft]', ...args);
}
```

## Dependencies

### Current
- **qrcodejs v1.0.0**: QR code generation
  - CDN: cdnjs.cloudflare.com
  - License: MIT
  - Size: ~40KB minified

### Alternatives Considered
- **qr-code-styling**: Better customization but larger size
- **qrious**: Canvas-only, smaller but fewer features
- **node-qrcode**: Would require bundler

## Deployment Notes

### Static Hosting
Works on any static host:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Local file system

### Performance Tips
1. Enable gzip compression
2. Add cache headers for assets
3. Consider CDN for library
4. Minify CSS/JS for production

## Contact & Support

For AI assistants working on this project:
1. Maintain the vanilla JavaScript approach
2. Preserve the simple, no-build-tool philosophy
3. Keep user privacy as top priority
4. Test thoroughly before committing changes

---

*Last updated: Initial project creation*
*QRaft version: 1.0.0*