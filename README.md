# My Drive 


A modern, full-stack web application for personal file storage and management. Built as a learning project to demonstrate web development concepts including user authentication, file uploads, theming, and responsive design.

## Features

### Core Functionality
- **User Authentication**: Secure login/signup with session management
- **File Upload System**: Support for multiple file types:
  - **Photos**: JPG, PNG, GIF images
  - **Videos**: MP4, AVI, MOV videos
  - **Documents**: PDF, DOC, DOCX, TXT, XLS, PPT files
  - 🎵 **Audio**: MP3, WAV, FLAC audio files
- **File Management**: Upload and delete files with confirmation
- **User Data Isolation**: Each user has their own secure file storage space
- **Dynamic File Display**: Real-time loading and display of user files

### User Experience
- **Theme Toggle**: Dark/Light mode with persistent settings
- **Profile Pictures**: Custom profile picture upload and display
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean, intuitive dashboard with categorized file sections

### Technical Features
- **Session Management**: Secure user sessions with Express sessions
- **File Storage**: User-specific directories with organized file management
- **Database Integration**: MySQL database for user data and settings
- **API Endpoints**: RESTful API for all operations
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database connectivity
- **Express Session** - Session management
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with theme support
- **Vanilla JavaScript** - Interactive functionality
- **Fetch API** - HTTP requests

### Database
- **MySQL** - Relational database
- **User Tables**: Authentication and profile data
- **File Metadata**: Upload tracking and organization

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MySQL Server** (v8.0 or higher)
- **Git** (for cloning the repository)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "My Drive"
```

### 2. Database Setup
```bash
# Import the database schema
mysql -u root -p < database/auth_db.sql

# Note: Enter your MySQL root password when prompted
```

### 3. Install Dependencies
```bash
# Install backend dependencies
npm install
```

### 4. Start the Server
```bash
# Start the backend server
node server.js
```

### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:5000
```

##  Project Structure

```
My Drive/
├── server.js                 # Main backend server
├── package.json             # Backend dependencies
├── database/
│   └── auth_db.sql          # Database schema
├── public/                  # Frontend files
│   ├── index.html           # Login page
│   ├── home.html            # Dashboard
│   ├── photos.html          # Photo gallery
│   ├── Videos.html          # Video player
│   ├── document.html        # Document viewer
│   ├── audio.html           # Audio player
│   ├── setting.html         # Settings page
│   ├── style.css            # Main stylesheet
│   ├── *.js                 # JavaScript files
│   └── images/              # Static assets
├── uploads/                 # User file storage (auto-generated)
└── README.md               # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /signup` - User registration
- `POST /logout` - User logout
- `GET /me` - Get current user info

### File Management
- `POST /upload` - Upload files
- `GET /files` - Get user's files
- `DELETE /files/:filename` - Delete a specific file
- `GET /uploads/:userId/:filename` - Serve uploaded files

### Settings
- `PUT /settings` - Update user settings (theme, profile picture)

## 🎨 Usage Guide

### Getting Started
1. **Register**: Create a new account with email and password
2. **Login**: Access your personal dashboard
3. **Upload Files**: Use the "Add" buttons in each category
4. **Customize**: Change theme and profile picture in Settings

### File Categories
- **Photos**: View uploaded images in a gallery format
- **Videos**: Play uploaded videos with HTML5 player
- **Documents**: Download or view uploaded documents
- **Audio**: Play uploaded audio files

### Settings
- **Theme Toggle**: Switch between light and dark modes
- **Profile Picture**: Upload a custom profile image
- **All settings are automatically saved**

## 🔒 Security Features

- **Session-based Authentication**: Secure user sessions
- **User Isolation**: Files are stored in separate directories
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
- Ensure MySQL server is running
- Check database credentials in `server.js`
- Verify `auth_db.sql` was imported correctly

**File Upload Issues**
- Check `uploads/` directory permissions
- Ensure file types are supported
- Verify user session is active

**Theme/Settings Not Saving**
- Check browser console for errors
- Ensure user is logged in
- Verify database connection

**404 Errors**
- Confirm server is running on port 5000
- Check browser URL is correct
- Clear browser cache

### Development Mode
```bash
# Run with debugging
DEBUG=* node server.js
```

## 🤝 Contributing

This is a learning project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

## 🙏 Acknowledgments

- Built as a learning project to demonstrate full-stack web development
- Inspired by modern cloud storage applications
- Uses open-source technologies and best practices

---

**Happy coding! 🚀**
