/**
 * HTML Templates Generator
 * Provides templates for creating consistent HTML pages
 */

const HTMLTemplates = {
    /**
     * Get base HTML structure with all required scripts
     */
    getBaseTemplate(title, bodyContent, pageScripts = '') {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${title}">
    <title>${title} | CivicEvents+</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body class="bg-gray-50 flex flex-col min-h-screen">
    <!-- Header will be injected here by GlobalNav -->
    
    ${bodyContent}
    
    <!-- Footer will be injected here by GlobalNav -->
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- Configuration -->
    <script src="config.js"></script>
    
    <!-- Services -->
    <script src="js/services/auth.service.js"></script>
    <script src="js/services/api.service.js"></script>
    
    <!-- Utilities -->
    <script src="js/utils/ui-helpers.js"></script>
    <script src="js/utils/route-guard.js"></script>
    
    <!-- Components -->
    <script src="js/components/global-nav.js"></script>
    
    <!-- Page Script -->
    <script>
        ${pageScripts}
    </script>
</body>
</html>`;
    },
    
    /**
     * Get main content wrapper
     */
    getMainWrapper(content) {
        return `<main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            ${content}
        </main>`;
    },
    
    /**
     * Get page header
     */
    getPageHeader(title, subtitle, actionButtons = '') {
        return `<div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">${title}</h1>
                <p class="text-gray-600 mt-2">${subtitle}</p>
            </div>
            ${actionButtons ? `<div>${actionButtons}</div>` : ''}
        </div>`;
    },
    
    /**
     * Get form template
     */
    getFormTemplate(formId, fields, submitButtonText = 'Submit') {
        let fieldsHTML = '';
        
        fields.forEach(field => {
            fieldsHTML += `
                <div>
                    <label for="${field.id}" class="block text-sm font-medium text-gray-700 mb-2">
                        ${field.label} ${field.required ? '*' : ''}
                    </label>
                    ${this.getFieldHTML(field)}
                    <p class="text-red-500 text-sm mt-1 hidden" id="${field.id}_error"></p>
                </div>
            `;
        });
        
        return `<form id="${formId}" class="space-y-6">
            ${fieldsHTML}
            <div>
                <button 
                    type="submit" 
                    id="submitBtn"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ${submitButtonText}
                </button>
            </div>
        </form>`;
    },
    
    /**
     * Get field HTML based on type
     */
    getFieldHTML(field) {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'datetime-local':
                return `<input 
                    type="${field.type}" 
                    id="${field.id}" 
                    name="${field.name || field.id}"
                    ${field.required ? 'required' : ''}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="${field.placeholder || ''}"
                    ${field.value ? `value="${field.value}"` : ''}
                >`;
            
            case 'textarea':
                return `<textarea 
                    id="${field.id}" 
                    name="${field.name || field.id}"
                    rows="${field.rows || 4}"
                    ${field.required ? 'required' : ''}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="${field.placeholder || ''}"
                >${field.value || ''}</textarea>`;
            
            case 'select':
                let options = '';
                field.options.forEach(opt => {
                    options += `<option value="${opt.value}"${field.value === opt.value ? ' selected' : ''}>${opt.label}</option>`;
                });
                return `<select 
                    id="${field.id}" 
                    name="${field.name || field.id}"
                    ${field.required ? 'required' : ''}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >${options}</select>`;
            
            case 'file':
                return `<div class="file-input-wrapper">
                    <input type="file" id="${field.id}" name="${field.name || field.id}" accept="${field.accept || '*'}" ${field.required ? 'required' : ''}>
                    <label for="${field.id}" class="file-input-label">Choose File</label>
                    <span id="${field.id}_filename" class="ml-3 text-gray-600">No file chosen</span>
                    ${field.preview ? `<div id="${field.id}_preview" class="mt-4"></div>` : ''}
                </div>`;
            
            case 'checkbox':
                return `<div class="flex items-center">
                    <input 
                        type="checkbox" 
                        id="${field.id}" 
                        name="${field.name || field.id}"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        ${field.checked ? 'checked' : ''}
                    >
                    <label for="${field.id}" class="ml-2 block text-sm text-gray-700">
                        ${field.checkboxLabel || ''}
                    </label>
                </div>`;
            
            default:
                return '';
        }
    },
    
    /**
     * Get card grid template
     */
    getCardGrid(containerId) {
        return `<div id="${containerId}" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Cards will be loaded here -->
        </div>`;
    },
    
    /**
     * Get loading spinner
     */
    getLoadingSpinner() {
        return `<div class="loading-spinner flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>`;
    }
};

// Make HTMLTemplates available globally
window.HTMLTemplates = HTMLTemplates;
