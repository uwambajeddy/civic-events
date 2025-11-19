/**
 * API Service
 * Centralized service for making API calls with authentication and error handling
 */

const ApiService = {
    /**
     * Make an authenticated API request
     * @param {string} endpoint - API endpoint (without base URL)
     * @param {object} options - Fetch options
     * @returns {Promise}
     */
    async request(endpoint, options = {}) {
        const url = `${CONFIG.API_BASE_URL}${endpoint}`;
        
        // Add authentication header
        const headers = {
            ...options.headers,
            ...AuthService.getAuthHeader()
        };
        
        // Add Content-Type for JSON requests (unless it's FormData)
        if (options.body && !(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        
        const config = {
            ...options,
            headers
        };
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            // Handle 401 Unauthorized - token expired or invalid
            if (response.status === 401) {
                UIHelpers.showToast('Session expired. Please login again.', 'error');
                AuthService.logout();
                return;
            }
            
            // Handle 403 Forbidden
            if (response.status === 403) {
                throw new Error('You do not have permission to perform this action');
            }
            
            if (!response.ok) {
                throw new Error(data.message || `Request failed with status ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    },
    
    /**
     * GET request
     */
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },
    
    /**
     * POST request
     */
    async post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: body instanceof FormData ? body : JSON.stringify(body)
        });
    },
    
    /**
     * PUT request
     */
    async put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: body instanceof FormData ? body : JSON.stringify(body)
        });
    },
    
    /**
     * PATCH request
     */
    async patch(endpoint, body = null) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : null
        });
    },
    
    /**
     * DELETE request
     */
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
};

// Make ApiService available globally
window.ApiService = ApiService;
