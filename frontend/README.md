# CivicEvents+ Frontend

A modern, accessible, and responsive frontend application for the CivicEvents+ community platform. Built with HTML, Tailwind CSS, and jQuery.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [User Roles & Permissions](#user-roles--permissions)
- [Pages & Features](#pages--features)
- [Development](#development)
- [Security](#security)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)

## ✨ Features

### Authentication
- User signup with password strength validation
- Secure login with remember me option
- JWT token management (session/local storage)
- Auto-logout on token expiration
- Role-based access control (Admin vs Normal User)

### Events Management
- Browse and search events
- Filter by location and date
- Event registration and cancellation
- Event feedback with ratings
- Admin: Create, edit, delete events with image upload
- Image preview before upload

### Announcements
- Browse audio announcements
- HTML5 audio player with accessible controls
- Transcripts for accessibility
- Admin: Create and manage announcements with audio upload

### Promos (Video Content)
- Browse video promotions
- HTML5 video player with captions support
- Admin: Create and manage promos with video and caption upload

### Notifications
- Real-time notification drawer
- Unread notification badges
- In-app notification management
- Admin: Create broadcast notifications

### Admin Dashboard
- Statistics overview (events, users, registrations, etc.)
- User management (enable/disable users)
- Activity feed
- System analytics

### User Profile
- View and edit profile information
- My registrations page
- Feedback management

## 🛠 Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **jQuery 3.6.0** - DOM manipulation and AJAX
- **Vanilla JavaScript** - Core application logic

## 📦 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Backend API server running (see backend README)
- Local web server (optional but recommended):
  - Python: `python -m http.server 8000`
  - Node.js: `npx http-server`
  - VS Code: Live Server extension

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Configure Backend API

Edit `config.js` and update the API base URL:

```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:4000/api',  // Update this to match your backend
    UPLOADS_BASE_URL: 'http://localhost:4000/uploads',
    // ... other config
};
```

### 3. Start a Local Server

#### Using Python:
```bash
python -m http.server 8000
```

#### Using Node.js:
```bash
npx http-server -p 8000
```

#### Using VS Code:
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### 4. Access the Application

Open your browser and navigate to:
- `http://localhost:8000` (or the port you configured)

### 5. Test Accounts

After setting up the backend, you can create accounts:

**Admin Account:**
- Create via signup and manually update role in database to 'admin'

**Normal User Account:**
- Create via signup form

## 📁 Project Structure

```
frontend/
├── index.html              # Landing page
├── login.html             # Login page
├── signup.html            # Signup page
├── events.html            # Events list
├── event-detail.html      # Event detail page
├── event-create.html      # Create event (admin)
├── event-edit.html        # Edit event (admin)
├── announcements.html     # Announcements list
├── announcement-detail.html
├── announcement-create.html (admin)
├── promos.html            # Promos list
├── promo-detail.html
├── promo-create.html      (admin)
├── dashboard.html         # Admin dashboard
├── profile.html           # User profile
├── my-registrations.html  # User registrations
├── config.js              # Application configuration
├── css/
│   └── styles.css         # Custom styles
├── js/
│   ├── services/
│   │   ├── auth.service.js    # Authentication service
│   │   └── api.service.js     # API request service
│   ├── utils/
│   │   ├── ui-helpers.js      # UI utility functions
│   │   └── route-guard.js     # Route protection
│   └── components/
│       └── global-nav.js      # Header, footer, notifications
└── README.md
```

## ⚙️ Configuration

### config.js

```javascript
const CONFIG = {
    // Backend API Configuration
    API_BASE_URL: 'http://localhost:4000/api',
    UPLOADS_BASE_URL: 'http://localhost:4000/uploads',
    
    // Storage Configuration
    STORAGE_KEYS: {
        TOKEN: 'civic_events_token',
        USER: 'civic_events_user',
        REMEMBER_ME: 'civic_events_remember'
    },
    
    // Password Requirements
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    
    // File Upload Limits
    MAX_FILE_SIZE: {
        IMAGE: 5 * 1024 * 1024,  // 5MB
        AUDIO: 10 * 1024 * 1024, // 10MB
        VIDEO: 50 * 1024 * 1024  // 50MB
    }
};
```

### Environment-Specific Configuration

For production, update the URLs in `config.js`:

```javascript
API_BASE_URL: 'https://your-production-api.com/api',
UPLOADS_BASE_URL: 'https://your-production-api.com/uploads',
```

## 👥 User Roles & Permissions

### Admin Role
Admins can:
- ✅ Create, edit, and delete events
- ✅ Upload event images
- ✅ Create, edit, and delete announcements
- ✅ Upload audio files
- ✅ Create, edit, and delete promos
- ✅ Upload videos and captions
- ✅ View admin dashboard with statistics
- ✅ Manage users (enable/disable)
- ✅ Create broadcast notifications
- ✅ View all registrations and feedback
- ✅ Access all normal user features

### Normal User Role
Users can:
- ✅ View published events, announcements, and promos
- ✅ Register for events
- ✅ Cancel event registrations
- ✅ Submit event feedback
- ✅ View and edit their profile
- ✅ View their registrations
- ✅ Receive notifications

## 📄 Pages & Features

### Public Pages
- **index.html** - Landing page with platform overview
- **login.html** - User login
- **signup.html** - New user registration

### Protected Pages (Require Authentication)

#### Events
- **events.html** - Browse and search events
- **event-detail.html** - View event details, register, submit feedback
- **event-create.html** (Admin) - Create new event with image upload
- **event-edit.html** (Admin) - Edit existing event

#### Announcements
- **announcements.html** - Browse audio announcements
- **announcement-detail.html** - Listen to announcement with transcript
- **announcement-create.html** (Admin) - Create announcement with audio upload

#### Promos
- **promos.html** - Browse video promos
- **promo-detail.html** - Watch video with captions
- **promo-create.html** (Admin) - Create promo with video and captions

#### User Pages
- **profile.html** - View and edit profile
- **my-registrations.html** - View registered events
- **dashboard.html** (Admin) - Statistics and user management

## 🔧 Development

### Code Organization

**Services** (`js/services/`)
- Handle API communication
- Manage authentication state
- Centralize business logic

**Utilities** (`js/utils/`)
- UI helper functions
- Route guards
- Common operations

**Components** (`js/components/`)
- Reusable UI components
- Global navigation
- Notification drawer

### Adding a New Page

1. Create HTML file with required structure
2. Include necessary scripts:
   ```html
   <script src="config.js"></script>
   <script src="js/services/auth.service.js"></script>
   <script src="js/services/api.service.js"></script>
   <script src="js/utils/ui-helpers.js"></script>
   <script src="js/utils/route-guard.js"></script>
   <script src="js/components/global-nav.js"></script>
   ```
3. Add route guard if page requires authentication
4. Implement page-specific logic

### Making API Calls

```javascript
// GET request
const response = await ApiService.get('/events');

// POST request
const data = await ApiService.post('/events', { title: 'New Event' });

// File upload
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('title', 'Event Title');
const result = await ApiService.post('/events', formData);
```

### Showing Notifications

```javascript
// Success
UIHelpers.showToast('Operation successful!', 'success');

// Error
UIHelpers.showToast('Operation failed', 'error');

// Info
UIHelpers.showToast('Info message', 'info');

// Warning
UIHelpers.showToast('Warning message', 'warning');
```

## 🔒 Security

### Client-Side Security Measures

1. **Token Management**
   - Tokens stored in sessionStorage (session-only) or localStorage (persistent)
   - Automatic token validation
   - Auto-logout on expiration

2. **XSS Prevention**
   - All user input is escaped before rendering
   - `UIHelpers.escapeHtml()` used throughout

3. **CSRF Protection**
   - JWT tokens in Authorization header
   - No cookies used

4. **Role-Based UI Controls**
   - Admin-only features hidden from normal users
   - Backend enforces real security

### Important Notes

- Frontend security is for UX only
- Backend must validate all requests
- Never trust client-side validation
- Always check permissions on backend

## ♿ Accessibility

### Features
- Semantic HTML5 elements
- ARIA labels and attributes
- Keyboard navigation support
- Focus management
- Screen reader compatible
- Color contrast compliance
- Audio transcripts
- Video captions

### Testing
- Test with keyboard navigation (Tab, Enter, Escape)
- Use screen reader (NVDA, JAWS, VoiceOver)
- Check color contrast ratios
- Verify form labels and error messages

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled
- Check API_BASE_URL in config.js

### Login Issues
- Verify backend is running
- Check browser console for errors
- Clear browser storage and try again

### Image/Video Not Loading
- Check UPLOADS_BASE_URL configuration
- Verify files exist on backend
- Check browser console for 404 errors

### 401 Unauthorized
- Token may be expired - login again
- Check token in browser storage

## 📝 Notes for Video Demo

### Admin Actions to Demonstrate
1. Login as admin
2. Create event with image upload
3. Edit/delete event
4. Create announcement with audio
5. Create promo with video and captions
6. View dashboard statistics
7. Manage users (enable/disable)
8. Create broadcast notification

### Normal User Actions to Demonstrate
1. Login as normal user
2. Browse events
3. Register for event
4. Cancel registration
5. Submit event feedback
6. View profile
7. Edit profile
8. View notifications
9. Listen to announcement
10. Watch promo video

## 📧 Support

For issues or questions:
- Email: info@civicevents.com
- GitHub Issues: [repository-url]/issues

## 📄 License

Copyright © 2025 CivicEvents+. All rights reserved.