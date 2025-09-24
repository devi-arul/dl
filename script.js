// Configuration - Update these URLs when you host on GitHub
const GITHUB_REPO_URL = 'https://raw.githubusercontent.com/Sohil3306/dv/master/programs/';

// Function to download files
async function downloadFile(filename, programName) {
    const button = event.target.closest('.download-btn');
    
    try {
        // Add loading state
        button.classList.add('loading');
        button.innerHTML = '<span>Downloading...</span>';
        
        // Construct the file URL
        const fileUrl = GITHUB_REPO_URL + filename;
        
        // For local development, use local files
        // Comment out this section when using GitHub
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            downloadFromLocal(filename, programName);
            return;
        }
        
        // Fetch the file from GitHub
        const response = await fetch(fileUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status}`);
        }
        
        // Get the file content
        const blob = await response.blob();
        
        // Create download link with forced download
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.target = '_blank'; // Ensure it doesn't open in same tab
        link.rel = 'noopener noreferrer';
        
        // Force download attribute
        link.setAttribute('download', filename);
        
        // Hide link and add to DOM
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
        
        // Clean up immediately
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        }, 100);
        
        // Show success message
        showMessage(`${programName} downloaded successfully!`, 'success');
        
    } catch (error) {
        console.error('Download failed:', error);
        showMessage(`Failed to download ${programName}. Please try again.`, 'error');
    } finally {
        // Reset button state
        button.classList.remove('loading');
        button.innerHTML = '<span class="download-icon">⬇</span>Download';
    }
}

// Function to download from local files (for development)
function downloadFromLocal(filename, programName) {
    const button = event.target.closest('.download-btn');
    
    // Create a hidden link element
    const link = document.createElement('a');
    link.href = `programs/${filename}`;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Force download attribute
    link.setAttribute('download', filename);
    
    // Hide link and add to DOM
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
    }, 100);
    
    // Reset button state
    button.classList.remove('loading');
    button.innerHTML = '<span class="download-icon">⬇</span>Download';
    
    showMessage(`${programName} download initiated!`, 'success');
}

// Function to show messages to user
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Add animation CSS if not already present
    if (!document.querySelector('#messageAnimation')) {
        const style = document.createElement('style');
        style.id = 'messageAnimation';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Add click handlers when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('College Practical Programs website loaded successfully!');
    
    // Add some interactive effects
    const cards = document.querySelectorAll('.program-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Instructions for GitHub setup (displayed in console)
console.log(`
🚀 GitHub Setup Instructions:
1. Create a new repository on GitHub
2. Create a 'programs' folder in your repo
3. Upload all your program files to the 'programs' folder
4. Update the GITHUB_REPO_URL variable above with your repo details
5. Replace YOUR_USERNAME and YOUR_REPO_NAME with actual values
6. Deploy to Vercel or any hosting service

Example URL format:
https://raw.githubusercontent.com/username/repo-name/main/programs/

📁 Folder structure should be:
your-repo/
├── index.html
├── styles.css
├── script.js
└── programs/
    ├── hello_world.py
    ├── calculator.py
    ├── Uncertainity Curve prg6.ipynb
    └── ... (other program files)
`);