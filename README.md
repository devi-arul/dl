# College Practical Programs Website

A simple website to display and download college practical programs.

## Features

- Clean, responsive design
- Program cards with descriptions
- One-click download functionality
- Mobile-friendly interface
- Ready for GitHub + Vercel deployment

## Setup Instructions

### 1. Local Testing

1. Open `index.html` in your web browser
2. The website will display all available programs
3. Click any "Download" button to download program files

### 2. GitHub + Vercel Deployment

#### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Upload all files to your repository:
   ```
   your-repo/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── README.md
   └── programs/
       ├── hello_world.py
       ├── calculator.py
       ├── number_game.py
       ├── Uncertainity Curve prg6.ipynb
       └── ... (add more program files here)
   ```

#### Step 2: Update GitHub URL
1. Open `script.js`
2. Find this line:
   ```javascript
   const GITHUB_REPO_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO_NAME/main/programs/';
   ```
3. Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub details

#### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import your repository
4. Deploy (Vercel will automatically detect it's a static site)

### 3. Adding New Programs

To add a new program:

1. Add the program file to the `programs/` folder
2. Update `index.html` to add a new program card:
   ```html
   <div class="program-card">
       <div class="program-number">XX</div>
       <h3>Your Program Name</h3>
       <p>Description of your program</p>
       <button class="download-btn" onclick="downloadFile('your_file.py', 'Program XX')">
           <span class="download-icon">⬇</span>
           Download
       </button>
   </div>
   ```

## File Structure

- `index.html` - Main website page
- `styles.css` - Styling and responsive design
- `script.js` - Download functionality
- `programs/` - Folder containing all program files

## Technologies Used

- HTML5
- CSS3 (with Flexbox/Grid)
- Vanilla JavaScript
- GitHub (for file hosting)
- Vercel (for website hosting)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- Files are downloaded directly from GitHub raw content
- No server-side code required
- Works offline for local testing
- Automatically switches between local and GitHub URLs

Good luck with your practicals! 🚀