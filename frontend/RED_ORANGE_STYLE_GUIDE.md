# Red-Orange Color Scheme Style Guide

## 🎨 Color Palette

The red-orange color palette has been added to your Tailwind configuration:

```javascript
'red-orange': {
  '50': '#fff1f1',   // Very light - for subtle backgrounds
  '100': '#ffdfdf',  // Light - for hover states
  '200': '#ffc5c5',  // Medium light - for gradients
  '300': '#ff9d9d',  // Medium - for borders
  '400': '#ff6465',  // Medium dark - for secondary elements
  '500': '#ff3031',  // Main brand color - for primary buttons
  '600': '#ed1516',  // Dark - for hover states
  '700': '#c80d0e',  // Darker - for active states
  '800': '#a50f10',  // Very dark - for footer gradients
  '900': '#881415',  // Darkest - for footer gradients
  '950': '#4b0404',  // Ultra dark - for footer gradients
},
```

## 🏗️ Header Styling

### Background Gradient
```css
/* CSS */
background: linear-gradient(
  to right,
  #ffc5c5,   /* red-orange-200 */
  #ff6465,   /* red-orange-400 */
  #ff3031    /* red-orange-500 */
);
```

```html
<!-- Tailwind Classes -->
<header class="bg-gradient-to-r from-red-orange-200 via-red-orange-400 to-red-orange-500">
```

Or use the predefined class:
```html
<header class="gradient-primary">
```

### Text Colors
- **Logo & Headings**: `text-red-orange-900` or `text-red-orange-950`
- **Subtext**: `text-red-orange-800`

### Button Styles
```html
<!-- Primary Button -->
<button class="bg-red-orange-500 hover:bg-red-orange-600 text-white">
  Click Me
</button>

<!-- Secondary Button -->
<button class="bg-red-orange-200 hover:bg-red-orange-300 text-red-orange-900">
  Secondary
</button>

<!-- With Glow Effect -->
<button class="bg-red-orange-500 hover:bg-red-orange-600 text-white glow-red-orange">
  Glowing Button
</button>
```

## 🦶 Footer Styling

### Background Gradient
```css
/* CSS */
background: linear-gradient(
  to right,
  #a50f10,   /* red-orange-800 */
  #881415,   /* red-orange-900 */
  #4b0404    /* red-orange-950 */
);
```

```html
<!-- Tailwind Classes -->
<footer class="bg-gradient-to-r from-red-orange-800 via-red-orange-900 to-red-orange-950">
```

Or use the predefined class:
```html
<footer class="gradient-footer">
```

### Text Colors
- **Main Text**: `text-red-orange-100` or `text-red-orange-200`
- **Links**: `text-red-orange-200 hover:text-red-orange-300`
- **Headings**: `text-red-orange-50`

## 🎯 Custom CSS Classes Available

### Gradients
- `.gradient-primary` - Light to medium red-orange gradient (for headers)
- `.gradient-secondary` - Medium to dark red-orange gradient
- `.gradient-footer` - Dark gradient for footers
- `.text-gradient` - Red-orange text gradient effect

### Effects
- `.glow-red-orange` - Adds a red-orange glow shadow effect
- `.hover-lift` - Scale and shadow on hover
- `.card-hover` - Card lift animation with shadow

## 🌟 Usage Examples

### Card Component
```html
<div class="bg-white border border-red-orange-200 rounded-lg p-6 card-hover">
  <h3 class="text-red-orange-900 font-bold text-xl mb-2">Card Title</h3>
  <p class="text-red-orange-700">Card description text</p>
  <button class="mt-4 bg-red-orange-500 hover:bg-red-orange-600 text-white px-4 py-2 rounded glow-red-orange">
    Action Button
  </button>
</div>
```

### Navigation Bar
```html
<nav class="gradient-primary">
  <div class="container mx-auto px-4 py-3">
    <div class="flex items-center justify-between">
      <h1 class="text-red-orange-950 font-bold text-2xl">Logo</h1>
      <ul class="flex space-x-6">
        <li><a href="#" class="text-red-orange-900 hover:text-red-orange-950">Home</a></li>
        <li><a href="#" class="text-red-orange-900 hover:text-red-orange-950">About</a></li>
        <li><a href="#" class="text-red-orange-900 hover:text-red-orange-950">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>
```

### Footer
```html
<footer class="gradient-footer">
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 class="text-red-orange-50 font-bold text-lg mb-3">Company</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-red-orange-200 hover:text-red-orange-300">About Us</a></li>
          <li><a href="#" class="text-red-orange-200 hover:text-red-orange-300">Careers</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-red-orange-800 mt-6 pt-4">
      <p class="text-red-orange-200 text-center">&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </div>
</footer>
```

## 🎨 Color Combinations

### Good Combinations
- **Background**: `bg-red-orange-50` with **Text**: `text-red-orange-900`
- **Background**: `bg-red-orange-500` with **Text**: `text-white`
- **Background**: `bg-red-orange-900` with **Text**: `text-red-orange-100`

### Accessibility Notes
- Always ensure sufficient contrast between text and background colors
- Use `text-red-orange-950` on light backgrounds for maximum readability
- Use `text-red-orange-50` or `text-white` on dark red-orange backgrounds

## 🚀 Implementation Tips

1. **Start with the main elements**: Update your header and footer first using the gradient classes
2. **Update buttons**: Replace existing button colors with red-orange variants
3. **Accent colors**: Use red-orange for borders, icons, and accent elements
4. **Gradual transition**: You can implement this gradually, component by component

## 🔧 Development Commands

After making these changes, rebuild your CSS:

```bash
npm run build
# or
npm run dev
```

The red-orange color scheme is now fully integrated into your Tailwind configuration and ready to use throughout your application!
