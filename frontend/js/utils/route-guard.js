/**
 * Route Guard
 * Protects routes based on authentication and authorization
 */

const RouteGuard = {
    /**
     * Check if page requires authentication
     * @param {string} page - current page name
     * @returns {boolean}
     */
    requiresAuth(page) {
        const publicPages = ['login.html', 'signup.html', 'index.html'];
        return !publicPages.includes(page);
    },
    
    /**
     * Check if page requires admin role
     * @param {string} page 
     * @returns {boolean}
     */
    requiresAdmin(page) {
        const adminPages = [
            'dashboard.html',
            'admin-users.html',
            'event-create.html',
            'event-edit.html',
            'announcement-create.html',
            'promo-create.html'
        ];
        return adminPages.includes(page);
    },
    
    /**
     * Initialize route guard for current page
     */
    init() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Check authentication requirement
        if (this.requiresAuth(currentPage)) {
            if (!AuthService.isAuthenticated()) {
                window.location.href = '/login.html';
                return;
            }
        }
        
        // Check admin requirement
        if (this.requiresAdmin(currentPage)) {
            if (!AuthService.isAdmin()) {
                UIHelpers.showToast('Access denied. Admin privileges required.', 'error');
                window.location.href = '/events.html';
                return;
            }
        }
        
        // Redirect authenticated users away from login/signup
        if ((currentPage === 'login.html' || currentPage === 'signup.html') && AuthService.isAuthenticated()) {
            window.location.href = '/events.html';
            return;
        }
    }
};

// Initialize route guard when DOM is ready
$(document).ready(() => {
    RouteGuard.init();
});

// Make RouteGuard available globally
window.RouteGuard = RouteGuard;
