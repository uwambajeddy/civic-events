/**
 * UI Helper Functions
 * Reusable utility functions for UI operations
 */

const UIHelpers = {
    /**
     * Show toast notification
     * @param {string} message 
     * @param {string} type - 'success', 'error', 'info', 'warning'
     * @param {number} duration - in milliseconds
     */
    showToast(message, type = 'info', duration = 3000) {
        // Remove existing toasts
        $('.toast-notification').remove();
        
        const bgColors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };
        
        const toast = $(`
            <div class="toast-notification fixed top-4 right-4 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="$(this).parent().remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `);
        
        $('body').append(toast);
        
        setTimeout(() => {
            toast.fadeOut(300, function() {
                $(this).remove();
            });
        }, duration);
    },
    
    /**
     * Show loading spinner
     * @param {string} container - jQuery selector for container
     */
    showLoading(container) {
        const loader = `
            <div class="loading-spinner flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        `;
        $(container).html(loader);
    },
    
    /**
     * Show skeleton loader for cards
     * @param {string} container 
     * @param {number} count 
     */
    showSkeletonCards(container, count = 3) {
        const skeletons = Array(count).fill(null).map(() => `
            <div class="skeleton-card bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div class="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div class="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
        `).join('');
        
        $(container).html(skeletons);
    },
    
    /**
     * Show empty state
     * @param {string} container 
     * @param {string} message 
     * @param {string} icon 
     */
    showEmptyState(container, message, icon = '📭') {
        const emptyState = `
            <div class="empty-state text-center py-12">
                <div class="text-6xl mb-4">${icon}</div>
                <p class="text-gray-600 text-lg">${message}</p>
            </div>
        `;
        $(container).html(emptyState);
    },
    
    /**
     * Format date
     * @param {string} dateString 
     * @returns {string}
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    /**
     * Format date and time
     * @param {string} dateString 
     * @returns {string}
     */
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    /**
     * Format relative time (e.g., "2 hours ago")
     * @param {string} dateString 
     * @returns {string}
     */
    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return this.formatDate(dateString);
    },
    
    /**
     * Truncate text
     * @param {string} text 
     * @param {number} maxLength 
     * @returns {string}
     */
    truncateText(text, maxLength = 100) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    /**
     * Validate file upload
     * @param {File} file 
     * @param {string} type - 'IMAGE', 'AUDIO', 'VIDEO'
     * @returns {object} {isValid, message}
     */
    validateFile(file, type) {
        const result = { isValid: true, message: '' };
        
        if (!file) {
            result.isValid = false;
            result.message = 'Please select a file';
            return result;
        }
        
        // Check file size
        const maxSize = CONFIG.MAX_FILE_SIZE[type];
        if (file.size > maxSize) {
            result.isValid = false;
            result.message = `File size must be less than ${maxSize / (1024 * 1024)}MB`;
            return result;
        }
        
        // Check file type
        const acceptedTypes = CONFIG.ACCEPTED_FILE_TYPES[type];
        if (!acceptedTypes.includes(file.type)) {
            result.isValid = false;
            result.message = `Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`;
            return result;
        }
        
        return result;
    },
    
    /**
     * Show confirmation dialog
     * @param {string} message 
     * @returns {Promise<boolean>}
     */
    async confirmDialog(message) {
        return new Promise((resolve) => {
            const dialog = $(`
                <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <p class="text-gray-800 mb-6">${message}</p>
                        <div class="flex justify-end space-x-3">
                            <button class="cancel-btn px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                                Cancel
                            </button>
                            <button class="confirm-btn px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            `);
            
            $('body').append(dialog);
            
            dialog.find('.confirm-btn').on('click', () => {
                dialog.remove();
                resolve(true);
            });
            
            dialog.find('.cancel-btn').on('click', () => {
                dialog.remove();
                resolve(false);
            });
        });
    },
    
    /**
     * Create pagination controls
     * @param {number} currentPage 
     * @param {number} totalPages 
     * @param {function} onPageChange 
     * @returns {string} HTML
     */
    createPagination(currentPage, totalPages, onPageChange) {
        if (totalPages <= 1) return '';
        
        let html = '<div class="flex justify-center items-center space-x-2 mt-6">';
        
        // Previous button
        if (currentPage > 1) {
            html += `<button class="pagination-btn px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" data-page="${currentPage - 1}">Previous</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                html += `<button class="px-3 py-1 bg-blue-600 text-white rounded">${i}</button>`;
            } else if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                html += `<button class="pagination-btn px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" data-page="${i}">${i}</button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                html += `<span class="px-2">...</span>`;
            }
        }
        
        // Next button
        if (currentPage < totalPages) {
            html += `<button class="pagination-btn px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" data-page="${currentPage + 1}">Next</button>`;
        }
        
        html += '</div>';
        
        return html;
    },
    
    /**
     * Escape HTML to prevent XSS
     * @param {string} text 
     * @returns {string}
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
};

// Make UIHelpers available globally
window.UIHelpers = UIHelpers;
