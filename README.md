# Frontend Learning Hub 🚀

A modern, interactive learning site built with **React**, **Next.js**, and **Ant Design**. Features progress tracking, search functionality, note-taking, and dark/light themes for an optimal learning experience.

## ✨ Features

- **📚 Interactive Learning Content**: Display markdown-based learning materials with beautiful formatting
- **📈 Progress Tracking**: Check off completed skills and track your learning progress
- **🔍 Smart Search**: Search through all content to quickly find topics
- **📝 Note Taking**: Add personal notes and reminders for future reference
- **🌙 Dark/Light Theme**: Toggle between themes for comfortable reading
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🖨️ Print Friendly**: Clean print layouts for offline studying
- **💾 Local Storage**: All progress and notes are saved locally in your browser
- **⚡ Modern Tech Stack**: Built with React, Next.js, TypeScript, and Ant Design

## 🛠 Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **UI Library**: Ant Design 5
- **Styling**: CSS Modules + Ant Design theming
- **Markdown**: Marked.js with syntax highlighting
- **Deployment**: GitHub Pages (static export)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/learning-site.git
   cd learning-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm start
```

### Deploy to GitHub Pages

1. **Update next.config.js**
   ```javascript
   // Replace 'learning-site' with your repository name
   assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   ```

2. **Build and export**
   ```bash
   npm run export
   ```

3. **Deploy to GitHub Pages**
   - Push your code to GitHub
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/docs" folder (or use GitHub Actions)

### Alternative: Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Export
        run: npm run export

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 📁 Project Structure

```
learning-site/
├── pages/                 # Next.js pages
│   ├── _app.tsx          # App wrapper with theme provider
│   └── index.tsx         # Main learning hub page
├── public/               # Static files
│   ├── FrontendLearningRoadmap.md
│   └── ToBeSenior.md
├── styles/               # Global styles
│   └── globals.css
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## 🎨 Customization

### Adding New Learning Content

1. **Add markdown file to public folder**
   ```bash
   public/YourNewContent.md
   ```

2. **Update the menu items in pages/index.tsx**
   ```tsx
   const menuItems = [
     {
       key: 'learning-guides',
       label: 'Learning Guides',
       type: 'group',
       children: [
         // ... existing items
         {
           key: 'yournewcontent',
           icon: <BookOutlined />,
           label: 'Your New Content',
         },
       ],
     },
   ];
   ```

3. **Add case in loadContent function**
   ```tsx
   case 'yournewcontent':
     filename = 'YourNewContent.md';
     break;
   ```

### Customizing Theme

Modify the theme configuration in `pages/_app.tsx`:

```tsx
<ConfigProvider
  theme={{
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: '#your-primary-color',
      borderRadius: 8,
      // ... other tokens
    },
  }}
>
```

### Custom Styling

Add custom styles in `styles/globals.css` or create new CSS modules.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static files for deployment

## 🌐 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Build errors:**
- Make sure you have Node.js 18+ installed
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Check for TypeScript errors with `npm run lint`

**Deployment issues:**
- Verify your `next.config.js` has the correct repository name
- Make sure GitHub Pages is enabled in repository settings
- Check that all markdown files are in the `public` folder

**Content not loading:**
- Ensure markdown files are placed in the `public` directory
- Check browser console for fetch errors
- Verify file names match exactly in the code

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💬 Support

- 📝 [Create an issue](https://github.com/yourusername/learning-site/issues) for bugs or feature requests
- 📚 Check the [documentation](README.md) for setup help
- 💡 Join discussions in the [GitHub Discussions](https://github.com/yourusername/learning-site/discussions)

---

**Happy Learning! 🎉**

Built with ❤️ using React, Next.js, and Ant Design.

## 🔄 Migration from Vanilla Version

If you're migrating from the vanilla HTML/CSS/JS version:

1. Your markdown content will work exactly the same
2. All functionality is preserved (progress tracking, notes, search)
3. The new version offers better performance and maintainability
4. You can still deploy to GitHub Pages using static export

The learning experience remains identical while gaining the benefits of a modern React application! 