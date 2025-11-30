# NYC Street Camera - Retro Photo Booth

A stunning web application that recreates the vintage New York street photography experience. Upload or capture photos and transform them into beautiful newspaper-style prints inspired by the iconic "New York Street Press" format.

![NYC Street Camera](https://img.shields.io/badge/Next.js-16-black) ![React Three Fiber](https://img.shields.io/badge/Three.js-3D-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan)

## ✨ Features

- **3D Interactive Polaroid Camera** - A beautifully rendered Polaroid Now camera you can interact with
- **Photo Capture** - Use your webcam or upload existing photos
- **Vintage Newspaper Template** - Your photos are styled in the "New York Street Press" format
- **Export Options** - Download as PNG, JPEG, or print directly
- **Responsive Design** - Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clear some disk space** (if you encountered space issues)

2. **Install dependencies:**
   ```bash
   cd /Users/panthshah/Downloads/retro-camera
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful helpers for React Three Fiber
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **html-to-image** - DOM to image conversion

## 📁 Project Structure

```
retro-camera/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & custom fonts
│   │   ├── layout.tsx       # Root layout with fonts
│   │   └── page.tsx         # Main page component
│   └── components/
│       ├── PolaroidCamera.tsx    # 3D camera component
│       ├── NewspaperTemplate.tsx # Newspaper output template
│       ├── PhotoCapture.tsx      # Camera/upload modal
│       └── ExportButton.tsx      # Export functionality
├── package.json
└── next.config.ts
```

## 🎮 How to Use

1. **Take a Photo**: Click the red shutter button on the 3D Polaroid camera, or click "Take Photo or Upload"
2. **Capture or Upload**: Use your webcam (with countdown) or upload an existing photo
3. **View Your Print**: See your photo transformed into a vintage newspaper format
4. **Export**: Download as PNG/JPEG or print directly

## 🎨 Customization

### Changing the Newspaper Content
Edit `src/components/NewspaperTemplate.tsx` to customize:
- Headlines and articles
- Layout and columns
- Illustrations and decorations

### Modifying the 3D Camera
Edit `src/components/PolaroidCamera.tsx` to:
- Change camera colors
- Add new interactive elements
- Modify animations

## 📄 License

MIT License - Feel free to use this for personal or commercial projects!

## 🙏 Acknowledgments

Inspired by the talented street photographers of New York City who bring joy to tourists and locals alike with their vintage newspaper photo prints.

---

Made with ❤️ in New York
