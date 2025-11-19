/**
 * Authentication Service
 * Handles all authentication-related operations including login, signup, token management
 */

const AuthService = {
    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;
        
        // Check if token is expired
        try {
            const payload = this.parseJWT(token);
            const currentTime = Date.now() / 1000;
            return payload.exp > currentTime;
        } catch (error) {
            console.error('Error parsing token:', error);
            return false;
        }
    },
    
    /**
     * Parse JWT token
     * @param {string} token 
     * @returns {object}
     */
    parseJWT(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            throw new Error('Invalid token');
        }
    },
    
    /**
     * Get stored token
     * @returns {string|null}
     */
    getToken() {
        // Check session storage first, then local storage
        return sessionStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN) || 
               localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    },
    
    /**
     * Store authentication token
     * @param {string} token 
     * @param {boolean} remember - If true, store in localStorage, else sessionStorage
     */
    setToken(token, remember = false) {
        if (remember) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, token);
            localStorage.setItem(CONFIG.STORAGE_KEYS.REMEMBER_ME, 'true');
        } else {
            sessionStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, token);
        }
    },
    
    /**
     * Get current user data
     * @returns {object|null}
     */
    getUser() {
        const userStr = sessionStorage.getItem(CONFIG.STORAGE_KEYS.USER) || 
                       localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        return userStr ? JSON.parse(userStr) : null;
    },
    
    /**
     * Store user data
     * @param {object} user 
     * @param {boolean} remember 
     */
    setUser(user, remember = false) {
        const userStr = JSON.stringify(user);
        if (remember) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER, userStr);
        } else {
            sessionStorage.setItem(CONFIG.STORAGE_KEYS.USER, userStr);
        }
    },
    
    /**
     * Check if current user is admin
     * @returns {boolean}
     */
    isAdmin() {
        const user = this.getUser();
        return user && user.role === CONFIG.ROLES.ADMIN;
    },
    
    /**
     * Sign up a new user
     * @param {object} userData - {full_name, email, password}
     * @returns {Promise}
     */
    async signup(userData) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }
        
        return data;
    },
    
    /**
     * Login user
     * @param {object} credentials - {email, password}
     * @param {boolean} remember 
     * @returns {Promise}
     */
    async login(credentials, remember = false) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        // Store token and user data
        this.setToken(data.data.token, remember);
        this.setUser(data.data.user, remember);
        
        return data;
    },
    
    /**
     * Logout user
     */
    logout() {
        // Clear all storage
        sessionStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
        sessionStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.REMEMBER_ME);
        
        // Redirect to login
        window.location.href = '/login.html';
    },
    
    /**
     * Validate password strength
     * @param {string} password 
     * @returns {object} {isValid, message, strength}
     */
    validatePassword(password) {
        const result = {
            isValid: false,
            message: '',
            strength: 0 // 0-4 (weak to very strong)
        };
        
        if (password.length < 8) {
            result.message = 'Password must be at least 8 characters';
            result.strength = 0;
            return result;
        }
        
        let strength = 0;
        
        // Check for lowercase
        if (/[a-z]/.test(password)) strength++;
        
        // Check for uppercase
        if (/[A-Z]/.test(password)) strength++;
        
        // Check for numbers
        if (/\d/.test(password)) strength++;
        
        // Check for special characters
        if (/[\W_]/.test(password)) strength++;
        
        result.strength = strength;
        
        if (strength < 4) {
            result.message = 'Password must include uppercase, lowercase, number, and special character';
            result.isValid = false;
        } else {
            result.message = 'Strong password';
            result.isValid = true;
        }
        
        return result;
    },
    
    /**
     * Get authorization header
     * @returns {object}
     */
    getAuthHeader() {
        const token = this.getToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
};

// Make AuthService available globally
window.AuthService = AuthService;
