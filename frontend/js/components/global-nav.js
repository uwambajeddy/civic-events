/**
 * Enhanced Global Navigation Components
 * Modern, responsive header with improved UX and animations
 */

const GlobalNav = {
    /**
     * Render header navigation
     */
    renderHeader() {
        const user = AuthService.getUser();
        const isAdmin = AuthService.isAdmin();
        
        const header = `
            <header class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
                <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <!-- Left Section: Logo and Mobile Menu -->
                        <div class="flex items-center space-x-3">
                            <!-- Mobile menu button -->
                            <button 
                                id="mobile-menu-btn" 
                                class="lg:hidden text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            
                            <!-- Logo -->
                            <a href="events.html" class="flex items-center space-x-2 group">
                                <div class="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 112 0v3a1 1 0 11-2 0v-3zm1-6a1 1 0 100 2 1 1 0 000-2z"/>
                                    </svg>
                                </div>
                                <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hidden sm:block">
                                    CivicEvents<span class="text-blue-600">+</span>
                                </span>
                            </a>
                        </div>
                        
                        <!-- Center Section: Desktop Navigation Links -->
                        <div class="hidden lg:flex items-center space-x-1">
                            <a href="events.html" class="nav-link px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50">
                                Events
                            </a>
                            <a href="announcements.html" class="nav-link px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50">
                                Announcements
                            </a>
                            <a href="promos.html" class="nav-link px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50">
                                Promos
                            </a>
                            ${isAdmin ? `
                                <a href="dashboard.html" class="nav-link px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 flex items-center space-x-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                    </svg>
                                    <span>Dashboard</span>
                                </a>
                            ` : ''}
                        </div>
                        
                        <!-- Right Section: Search, Notifications, Profile -->
                        <div class="flex items-center space-x-2 sm:space-x-3">
                            <!-- Search Button (Mobile/Tablet) -->
                            <button 
                                id="search-toggle-btn" 
                                class="lg:hidden text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                                aria-label="Toggle search"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                            
                            <!-- Desktop Search -->
                            <div class="hidden lg:block search-bar">
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        id="global-search" 
                                        placeholder="Search events, announcements..." 
                                        class="w-64 xl:w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                                        aria-label="Search"
                                    >
                                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <div id="search-results" class="search-results"></div>
                            </div>
                            
                            <!-- Notifications Bell -->
                            <button 
                                id="notifications-btn" 
                                class="relative text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                                aria-label="Notifications"
                            >
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                                <span id="notification-count" class="notification-badge hidden">0</span>
                            </button>
                            
                            <!-- Profile Dropdown -->
                            <div class="relative profile-dropdown">
                                <button 
                                    id="profile-btn" 
                                    class="flex items-center space-x-2 hover:bg-blue-50 px-2 py-2 rounded-lg transition-all duration-200"
                                    aria-label="Profile menu"
                                    aria-haspopup="true"
                                >
                                    <div class="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                                        ${user ? user.full_name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <svg class="w-4 h-4 text-gray-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div id="profile-menu" class="dropdown-menu">
                                    <div class="p-4 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-white">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                ${user ? user.full_name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <div>
                                                <p class="font-semibold text-gray-900">${user ? user.full_name : 'User'}</p>
                                                <p class="text-sm text-gray-600">${user ? user.email : ''}</p>
                                                ${isAdmin ? '<span class="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">Admin</span>' : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="py-2">
                                        <li>
                                            <a href="profile.html" class="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                </svg>
                                                <span>My Profile</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="my-registrations.html" class="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                                </svg>
                                                <span>My Registrations</span>
                                            </a>
                                        </li>
                                        ${isAdmin ? `
                                            <li>
                                                <a href="dashboard.html" class="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                                    </svg>
                                                    <span>Admin Dashboard</span>
                                                </a>
                                            </li>
                                        ` : ''}
                                        <li class="border-t border-gray-200 mt-2 pt-2">
                                            <button id="logout-btn" class="flex items-center space-x-3 w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition-all duration-200">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                                </svg>
                                                <span>Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile Search Bar (Hidden by default) -->
                    <div id="mobile-search-bar" class="lg:hidden py-3 border-t border-gray-200 hidden">
                        <div class="relative">
                            <input 
                                type="text" 
                                id="mobile-search" 
                                placeholder="Search events, announcements..." 
                                class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                            >
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                </nav>
                
                <!-- Mobile Navigation Menu -->
                <div id="mobile-menu" class="lg:hidden border-t border-gray-200 bg-white shadow-lg hidden">
                    <div class="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
                        <a href="events.html" class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-3 rounded-lg transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>Events</span>
                        </a>
                        <a href="announcements.html" class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-3 rounded-lg transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                            </svg>
                            <span>Announcements</span>
                        </a>
                        <a href="promos.html" class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-3 rounded-lg transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                            </svg>
                            <span>Promos</span>
                        </a>
                        ${isAdmin ? `
                            <a href="dashboard.html" class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-3 rounded-lg transition-all duration-200">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                                <span>Dashboard</span>
                            </a>
                        ` : ''}
                        
                        <div class="border-t border-gray-200 my-3"></div>
                        
                        <a href="profile.html" class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-3 rounded-lg transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>Profile</span>
                        </a>
                        <a href="my-registrations.html" class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-3 rounded-lg transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            <span>My Registrations</span>
                        </a>
                        
                        <button id="mobile-logout-btn" class="flex items-center space-x-3 w-full text-left text-red-600 hover:bg-red-50 font-medium px-4 py-3 rounded-lg transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>
        `;
        
        $('body').prepend(header);
        this.initHeaderEvents();
    },
    
    /**
     * Initialize header event listeners
     */
    initHeaderEvents() {
        // Mobile menu toggle with icon swap
        $('#mobile-menu-btn').on('click', function() {
            $('#mobile-menu').toggleClass('hidden');
            $('#menu-icon').toggleClass('hidden');
            $('#close-icon').toggleClass('hidden');
            $('body').toggleClass('overflow-hidden');
        });
        
        // Mobile search toggle
        $('#search-toggle-btn').on('click', function() {
            $('#mobile-search-bar').toggleClass('hidden');
            if (!$('#mobile-search-bar').hasClass('hidden')) {
                $('#mobile-search').focus();
            }
        });
        
        // Profile dropdown toggle
        $('#profile-btn').on('click', function(e) {
            e.stopPropagation();
            $('#profile-menu').toggleClass('show');
        });
        
        // Close dropdown when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.profile-dropdown').length) {
                $('#profile-menu').removeClass('show');
            }
        });
        
        // Logout buttons
        $('#logout-btn, #mobile-logout-btn').on('click', function() {
            AuthService.logout();
        });
        
        // Notifications button
        $('#notifications-btn').on('click', function() {
            GlobalNav.toggleNotificationDrawer();
        });
        
        // Close mobile menu when clicking on links
        $('#mobile-menu a').on('click', function() {
            $('#mobile-menu').addClass('hidden');
            $('#menu-icon').removeClass('hidden');
            $('#close-icon').addClass('hidden');
            $('body').removeClass('overflow-hidden');
        });
        
        // Active nav link highlighting
        const currentPage = window.location.pathname.split('/').pop();
        $(`.nav-link[href="${currentPage}"]`).addClass('text-blue-600 bg-blue-50');
        
        // Load unread notification count
        this.loadNotificationCount();
    },
    
    /**
     * Load unread notification count
     */
    async loadNotificationCount() {
        try {
            const response = await ApiService.get('/notifications');
            if (response && response.data) {
                const notifications = response.data;
                const totalCount = notifications.length;
                const unreadCount = notifications.filter(n => !n.is_read).length;
                const displayCount = totalCount > 99 ? '99+' : totalCount;

                if (totalCount > 0) {
                    $('#notification-count').text(displayCount).removeClass('hidden');
                } else {
                    $('#notification-count').addClass('hidden');
                }

                const ariaLabel = unreadCount > 0
                    ? `Notifications (${unreadCount} unread)`
                    : `Notifications (${totalCount})`;
                $('#notifications-btn').attr('aria-label', ariaLabel);
            }
        } catch (error) {
            console.error('Error loading notification count:', error);
        }
    },
    
    /**
     * Render notification drawer
     */
    renderNotificationDrawer() {
        const drawer = `
            <!-- Notification Overlay -->
            <div id="notification-overlay" class="notification-overlay"></div>
            
            <!-- Notification Drawer -->
            <div id="notification-drawer" class="notification-drawer">
                <div class="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white sticky top-0 z-10">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg sm:text-xl font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <button id="close-notifications" class="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div id="notification-list" class="p-4 sm:p-5">
                    <!-- Notifications will be loaded here -->
                </div>
            </div>
        `;
        
        $('body').append(drawer);
        this.initNotificationDrawerEvents();
    },
    
    /**
     * Initialize notification drawer events
     */
    initNotificationDrawerEvents() {
        $('#close-notifications, #notification-overlay').on('click', function() {
            GlobalNav.closeNotificationDrawer();
        });
    },
    
    /**
     * Toggle notification drawer
     */
    toggleNotificationDrawer() {
        const drawer = $('#notification-drawer');
        const overlay = $('#notification-overlay');
        
        if (drawer.hasClass('open')) {
            this.closeNotificationDrawer();
        } else {
            drawer.addClass('open');
            overlay.addClass('active');
            $('body').addClass('overflow-hidden');
            this.loadNotifications();
        }
    },
    
    /**
     * Close notification drawer
     */
    closeNotificationDrawer() {
        $('#notification-drawer').removeClass('open');
        $('#notification-overlay').removeClass('active');
        $('body').removeClass('overflow-hidden');
    },
    
    /**
     * Load notifications
     */
    async loadNotifications() {
        const container = $('#notification-list');
        UIHelpers.showLoading('#notification-list');
        
        try {
            const response = await ApiService.get('/notifications');
            
            if (!response || !response.data || response.data.length === 0) {
                UIHelpers.showEmptyState('#notification-list', 'No notifications yet', '🔔');
                return;
            }
            
            const notifications = response.data.slice(0, 20); // Show latest 20
            let html = '<div class="space-y-2">';
            
            notifications.forEach(notif => {
                const isUnread = !notif.is_read;
                html += `
                    <div class="notification-item border border-gray-200 rounded-lg p-4 ${isUnread ? 'bg-blue-50 border-blue-200' : 'bg-white'} hover:shadow-md cursor-pointer transition-all duration-200" data-id="${notif.id}">
                        <div class="flex items-start space-x-3">
                            ${isUnread ? `
                                <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                            ` : '<div class="w-2"></div>'}
                            <div class="flex-1 min-w-0">
                                <div class="flex items-start justify-between">
                                    <h4 class="font-semibold text-gray-900 text-sm sm:text-base">${UIHelpers.escapeHtml(notif.title)}</h4>
                                    ${isUnread ? '<span class="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full flex-shrink-0">New</span>' : ''}
                                </div>
                                <p class="text-gray-600 text-sm mt-1 line-clamp-2">${UIHelpers.escapeHtml(notif.message || '')}</p>
                                <div class="flex items-center mt-2 text-xs text-gray-400">
                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    ${UIHelpers.formatRelativeTime(notif.created_at)}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            container.html(html);
            
            // Add click handlers
            $('.notification-item').on('click', function() {
                const notifId = $(this).data('id');
                GlobalNav.markNotificationAsRead(notifId);
            });
            
        } catch (error) {
            container.html(`
                <div class="text-center py-12">
                    <svg class="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-red-600 font-medium">Failed to load notifications</p>
                    <button onclick="GlobalNav.loadNotifications()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Try Again
                    </button>
                </div>
            `);
        }
    },
    
    /**
     * Mark notification as read
     */
    async markNotificationAsRead(notifId) {
        try {
            await ApiService.put(`/notifications/${notifId}/read`);
            this.loadNotificationCount();
            this.loadNotifications();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    },
    
    /**
     * Render footer
     */
    renderFooter() {
        const footer = `
            <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 mt-auto">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div class="sm:col-span-2 lg:col-span-1">
                            <div class="flex items-center space-x-2 mb-4">
                                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 112 0v3a1 1 0 11-2 0v-3zm1-6a1 1 0 100 2 1 1 0 000-2z"/>
                                    </svg>
                                </div>
                                <h3 class="text-xl font-bold">CivicEvents<span class="text-blue-400">+</span></h3>
                            </div>
                            <p class="text-gray-400 leading-relaxed">
                                Connecting communities through events and meaningful engagement.
                            </p>
                            <div class="flex space-x-4 mt-6">
                                <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="text-lg font-semibold mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                                Quick Links
                            </h3>
                            <ul class="space-y-2.5">
                                <li>
                                    <a href="events.html" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                        → Events
                                    </a>
                                </li>
                                <li>
                                    <a href="announcements.html" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                        → Announcements
                                    </a>
                                </li>
                                <li>
                                    <a href="promos.html" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                        → Promos
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-lg font-semibold mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Support
                            </h3>
                            <ul class="space-y-2.5">
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                        → Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                        → Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                        → Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-lg font-semibold mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                Contact
                            </h3>
                            <ul class="space-y-2.5 text-gray-400">
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>info@civicevents.com</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <span>(555) 123-4567</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span>Kigali, Rwanda</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-700 pt-8">
                        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <p class="text-gray-400 text-sm text-center sm:text-left">
                                &copy; 2025 CivicEvents+. All rights reserved.
                            </p>
                            <div class="flex items-center space-x-6 text-sm text-gray-400">
                                <a href="#" class="hover:text-white transition-colors">Privacy</a>
                                <span>•</span>
                                <a href="#" class="hover:text-white transition-colors">Terms</a>
                                <span>•</span>
                                <a href="#" class="hover:text-white transition-colors">Cookies</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        
        $('body').append(footer);
    },
    
    /**
     * Initialize all global components
     */
    init() {
        // Only render if user is authenticated
        if (AuthService.isAuthenticated()) {
            this.renderHeader();
            this.renderNotificationDrawer();
            this.renderFooter();
        }
    }
};

// Auto-initialize when DOM is ready
$(document).ready(() => {
    if (AuthService.isAuthenticated()) {
        GlobalNav.init();
    }
});

// Make GlobalNav available globally
window.GlobalNav = GlobalNav;