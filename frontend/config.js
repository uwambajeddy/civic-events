/**
 * Application Configuration
 * Central configuration for API endpoints and app settings
 */

const CONFIG = {
    // Backend API base URL - Update this based on your backend server
    API_BASE_URL: 'http://localhost:4000/api',
    
    // Storage keys
    STORAGE_KEYS: {
        TOKEN: 'civic_events_token',
        USER: 'civic_events_user',
        REMEMBER_ME: 'civic_events_remember'
    },
    
    // Upload endpoints
    UPLOADS_BASE_URL: 'http://localhost:4000/uploads',
    
    // Pagination
    DEFAULT_PAGE_SIZE: 10,
    
    // Password requirements
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    PASSWORD_REQUIREMENTS: 'At least 8 characters with uppercase, lowercase, number, and special character',
    
    // Roles
    ROLES: {
        ADMIN: 'admin',
        USER: 'user'
    },
    
    // File upload limits (in bytes)
    MAX_FILE_SIZE: {
        IMAGE: 5 * 1024 * 1024, // 5MB
        AUDIO: 10 * 1024 * 1024, // 10MB
        VIDEO: 50 * 1024 * 1024 // 50MB
    },
    
    // Accepted file types
    ACCEPTED_FILE_TYPES: {
        IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        AUDIO: ['audio/mpeg', 'audio/mp3', 'audio/wav'],
        VIDEO: ['video/mp4', 'video/webm', 'video/ogg']
    }
};

// Make config available globally
window.CONFIG = CONFIG;
