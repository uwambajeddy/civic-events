# Quick Start Guide - Testing CivicEvents+ Frontend

## 🚀 5-Minute Setup

### Step 1: Start Backend (If not running)
```bash
cd backend
npm install
npm start
# Backend should be running on http://localhost:4000
```

### Step 2: Start Frontend
```bash
cd frontend

# Option A: Using Python
python -m http.server 8000

# Option B: Using Node.js
npx http-server -p 8000

# Option C: Using VS Code Live Server
# Right-click index.html → Open with Live Server
```

### Step 3: Open Browser
Navigate to: `http://localhost:8000`

---

## 👤 Test Accounts

### Create Admin Account
1. Sign up normally at `/signup.html`
2. Go to backend database and update the user's role:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

### Create Normal User Account
Just sign up at `/signup.html` - no database changes needed!

---

## 🧪 Quick Test Scenarios

### Scenario 1: Normal User Journey (5 minutes)
1. ✅ **Sign Up**
   - Go to `/signup.html`
   - Fill form (password must have: uppercase, lowercase, number, special char, 8+ chars)
   - Click "Create Account"

2. ✅ **Browse Events**
   - Go to `/events.html`
   - Try search box
   - Use location filter
   - Use date filter

3. ✅ **Register for Event**
   - Click any event card
   - Click "Register for Event" button
   - Confirm registration

4. ✅ **View Registrations**
   - Click profile icon → "My Registrations"
   - See your registered event
   - Try "Upcoming", "Past", "All" tabs

5. ✅ **Submit Feedback**
   - Go back to event detail page
   - Scroll to feedback section
   - Click star rating (1-5 stars)
   - Write comment
   - Submit

6. ✅ **Manage Profile**
   - Click profile icon → "My Profile"
   - Edit your name
   - Update email
   - Click "Update Profile"

### Scenario 2: Admin Journey (10 minutes)
1. ✅ **Login as Admin**
   - Go to `/login.html`
   - Use admin credentials

2. ✅ **View Dashboard**
   - Click profile icon → "Dashboard"
   - See statistics (Total Events, Users, Registrations)
   - Scroll to User Management table
   - Try search box

3. ✅ **Create Event**
   - Go to `/events.html`
   - Click "Create Event" button (admin only)
   - Fill all fields:
     - Title: "Community Cleanup Day"
     - Description: "Join us for a community cleanup..."
     - Location: "Central Park"
     - Start Date: Tomorrow
     - End Date: Tomorrow (later time)
     - Upload image (optional)
     - Check "Publish immediately"
   - Click "Create Event"

4. ✅ **Edit Event**
   - Click on the event you just created
   - Click "Edit" button
   - Change title or description
   - Click "Update Event"

5. ✅ **Create Announcement**
   - Go to `/announcements.html`
   - Click "Create Announcement"
   - Fill form:
     - Title: "Important Community Update"
     - Description: "This is an important update..."
     - Upload audio file (MP3, max 10MB)
     - Add transcript text
     - Check "Publish immediately"
   - Click "Create Announcement"

6. ✅ **Create Promo**
   - Go to `/promos.html`
   - Click "Create Promo"
   - Fill form:
     - Title: "Summer Program 2025"
     - Description: "Check out our summer programs..."
     - Upload video (MP4, max 50MB)
     - Add caption text
     - Check "Publish immediately"
   - Click "Create Promo"

7. ✅ **Manage Users**
   - Go to `/dashboard.html`
   - Find a normal user in the table
   - Click "Disable" button
   - Confirm action
   - Click "Enable" to re-enable

---

## 🎨 Features to Demonstrate

### File Uploads
- **Event Images**: PNG/JPG up to 5MB
- **Announcement Audio**: MP3/WAV/OGG up to 10MB
- **Promo Videos**: MP4/WebM up to 50MB
- All uploads show preview before submission

### Search & Filter
- **Events**: Search by title, filter by location, filter by date
- **Announcements**: Search by title
- **Promos**: Search by title
- **Users** (Admin): Search by name or email

### Notifications
- Click bell icon in header
- View unread notifications
- Mark as read by clicking
- Badge shows unread count

### Audio Player Features
- Play/Pause
- Seek (drag progress bar)
- Volume control
- Download option
- Transcript display
- Keyboard controls (Space = play/pause)

### Video Player Features
- Play/Pause
- Seek (drag progress bar)
- Volume control
- Fullscreen
- Captions (CC button)
- Keyboard controls (F = fullscreen, arrows = seek)

### Accessibility Features
- Tab through all interactive elements
- Press Enter to activate buttons
- Escape to close modals
- ARIA labels for screen readers
- Captions for videos
- Transcripts for audio

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution**: 
- Make sure backend is running
- Check `config.js` has correct `API_BASE_URL`
- Backend must have CORS enabled

### Issue: 401 Unauthorized
**Solution**:
- Token expired - login again
- Clear browser storage: `localStorage.clear()` in console

### Issue: Images/Videos Not Loading
**Solution**:
- Check `config.js` has correct `UPLOADS_BASE_URL`
- Verify files exist in backend uploads folder
- Check browser console for 404 errors

### Issue: Cannot Create Admin Account
**Solution**:
- Sign up normally first
- Then update database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email';
```
- Logout and login again

### Issue: File Upload Failed
**Solution**:
- Check file size (Image: 5MB, Audio: 10MB, Video: 50MB)
- Check file type (Image: JPG/PNG, Audio: MP3/WAV, Video: MP4/WebM)
- Verify backend multer middleware is configured

---

## 📱 Responsive Testing

### Test on Different Screen Sizes

1. **Mobile (< 640px)**
   - Open Chrome DevTools (F12)
   - Click device toolbar icon (Ctrl+Shift+M)
   - Select "iPhone 12 Pro" or similar
   - Test all pages

2. **Tablet (640px - 1024px)**
   - Select "iPad" in DevTools
   - Verify grid layouts adjust properly

3. **Desktop (> 1024px)**
   - Normal browser window
   - Test full-width layouts

---

## ✅ Complete Test Checklist

### Authentication
- [ ] Sign up with valid data
- [ ] Sign up with invalid data (check validation)
- [ ] Login with correct credentials
- [ ] Login with wrong credentials
- [ ] "Remember me" checkbox works
- [ ] Logout works
- [ ] Protected pages redirect to login

### Events (User)
- [ ] Browse events list
- [ ] Search events
- [ ] Filter by location
- [ ] Filter by date
- [ ] View event details
- [ ] Register for event
- [ ] Cancel registration
- [ ] Submit feedback
- [ ] View other feedback

### Events (Admin)
- [ ] Create event
- [ ] Upload event image
- [ ] Edit event
- [ ] Delete event
- [ ] Publish/unpublish event
- [ ] View attendees list

### Announcements (User)
- [ ] Browse announcements
- [ ] Play audio
- [ ] View transcript
- [ ] Search announcements

### Announcements (Admin)
- [ ] Create announcement
- [ ] Upload audio file
- [ ] Delete announcement
- [ ] Publish/unpublish

### Promos (User)
- [ ] Browse promos
- [ ] Watch video
- [ ] View captions
- [ ] Search promos

### Promos (Admin)
- [ ] Create promo
- [ ] Upload video file
- [ ] Add captions
- [ ] Delete promo

### User Features
- [ ] View profile
- [ ] Edit profile (name, email)
- [ ] View my registrations
- [ ] Filter registrations (upcoming/past/all)
- [ ] Cancel registration from my-registrations

### Admin Features
- [ ] View dashboard statistics
- [ ] View user management table
- [ ] Search users
- [ ] Disable user account
- [ ] Enable user account

### UI/UX
- [ ] Toast notifications appear
- [ ] Loading states show
- [ ] Empty states display correctly
- [ ] Confirmation dialogs work
- [ ] Form validation messages clear
- [ ] File upload previews show
- [ ] Date formatting correct
- [ ] Pagination works (if applicable)

### Accessibility
- [ ] Tab navigation works
- [ ] Enter key activates buttons
- [ ] Escape closes modals
- [ ] Screen reader friendly (test with NVDA)
- [ ] Color contrast adequate
- [ ] Form labels present
- [ ] Error messages clear

---

## 🎬 Video Demo Script

### Opening (30 seconds)
"Welcome to CivicEvents+, a community engagement platform. Let me show you the key features for both normal users and administrators."

### Normal User Demo (3 minutes)
1. **Landing Page** - "This is the landing page with an overview of features"
2. **Sign Up** - "Users can create an account with strong password requirements"
3. **Events** - "Browse community events with search and filter options"
4. **Registration** - "Register for events with one click"
5. **Feedback** - "Submit ratings and feedback after attending"
6. **Profile** - "Manage personal information"
7. **Registrations** - "Track all event registrations"

### Admin Demo (5 minutes)
1. **Dashboard** - "Admins see statistics and can manage users"
2. **Create Event** - "Create events with image uploads"
3. **Edit Event** - "Update event details anytime"
4. **Create Announcement** - "Share audio announcements with transcripts"
5. **Create Promo** - "Upload promotional videos with captions"
6. **User Management** - "Enable or disable user accounts"
7. **Notifications** - "View all system notifications"

### Closing (30 seconds)
"CivicEvents+ provides a complete solution for community engagement with role-based permissions, multimedia support, and an accessible, responsive design."

---

## 🎯 Key Features to Highlight

1. ✨ **Complete CRUD Operations** - Create, Read, Update, Delete for all resources
2. 🔐 **Role-Based Access** - Admin vs Normal User permissions enforced
3. 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
4. ♿ **Accessible** - WCAG compliant with ARIA labels and keyboard navigation
5. 🎵 **Multimedia Support** - Images, audio, and video with previews
6. 🔔 **Notification System** - Real-time notifications with unread badges
7. ⚡ **Excellent UX** - Loading states, toasts, confirmations, validations
8. 🎨 **Modern UI** - Clean design with Tailwind CSS
9. 🔍 **Search & Filter** - Find content quickly
10. 💾 **File Validation** - Client-side validation before upload

---

## 💡 Tips for Best Demo

1. **Prepare Test Data** - Have events, announcements, and promos ready
2. **Use Two Browsers** - Show admin and user simultaneously
3. **Highlight File Uploads** - Show image preview, audio player, video player
4. **Demonstrate Search** - Show real-time filtering
5. **Show Responsiveness** - Resize browser or use phone
6. **Test Accessibility** - Tab through pages, use keyboard
7. **Show Error Handling** - Try invalid inputs to show validation
8. **Highlight Loading States** - Point out smooth transitions
9. **Demonstrate Notifications** - Show unread badge and drawer
10. **End with Stats** - Show dashboard statistics to prove data flow

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify backend is running (`http://localhost:4000`)
3. Clear browser storage and try again
4. Check `config.js` URLs match your backend
5. Review README.md for detailed troubleshooting

---

**Happy Testing! 🎉**

The frontend is production-ready and fully functional. All features have been implemented and tested. Enjoy demonstrating the CivicEvents+ platform!
