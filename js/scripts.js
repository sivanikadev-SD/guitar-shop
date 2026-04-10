/* ==================================
   MAIN SCRIPTS
   ================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle Functionality --- */
    const themeToggles = document.querySelectorAll('#themeToggle');
    const docEl = document.documentElement;
    let isDark = localStorage.getItem('theme') === 'dark';

    // Initialize Theme
    if (isDark) {
        docEl.setAttribute('data-theme', 'dark');
        updateIcons(true);
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            isDark = !isDark;
            if (isDark) {
                docEl.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                docEl.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
            updateIcons(isDark);
        });
    });

    function updateIcons(isDarkTheme) {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i:first-child');
            if (icon) {
                if (isDarkTheme) {
                    icon.classList.remove('ph-moon');
                    icon.classList.add('ph-sun');
                    if (toggle.innerText.includes('Dark Mode')) {
                        toggle.innerHTML = '<i class="ph ph-sun"></i> Light Mode';
                    }
                } else {
                    icon.classList.remove('ph-sun');
                    icon.classList.add('ph-moon');
                    if (toggle.innerText.includes('Light Mode')) {
                        toggle.innerHTML = '<i class="ph ph-moon"></i> Dark Mode';
                    }
                }
            }
        });
    }

    /* --- RTL Toggle Functionality --- */
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    let isRTL = localStorage.getItem('isRTL') === 'true';

    if (isRTL) {
        docEl.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            isRTL = !isRTL;
            if (isRTL) {
                docEl.setAttribute('dir', 'rtl');
                localStorage.setItem('isRTL', 'true');
            } else {
                docEl.setAttribute('dir', 'ltr');
                localStorage.setItem('isRTL', 'false');
            }
        });
    });

    /* --- Mobile Drawer --- */
    const drawer = document.getElementById('mobileDrawer');
    const drawerOverlay = drawer ? drawer.querySelector('.mobile-drawer__overlay') : null;
    const drawerClose = drawer ? drawer.querySelector('.mobile-drawer__close') : null;
    const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');

    function openDrawer() {
        if (!drawer) return;
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (!drawer) return;
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    }

    mobileMenuToggles.forEach(toggle => {
        toggle.addEventListener('click', openDrawer);
    });

    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

    // Close drawer when a nav link is tapped
    if (drawer) {
        drawer.querySelectorAll('.mobile-drawer__links a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        // Wire theme toggle inside drawer
        const drawerTheme = drawer.querySelector('.theme-toggle');
        if (drawerTheme) {
            drawerTheme.addEventListener('click', () => {
                isDark = !isDark;
                if (isDark) {
                    docEl.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    docEl.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                }
                updateIcons(isDark);
            });
        }

        // Wire RTL toggle inside drawer
        const drawerRTL = drawer.querySelector('.rtl-toggle');
        if (drawerRTL) {
            drawerRTL.addEventListener('click', () => {
                isRTL = !isRTL;
                docEl.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
                localStorage.setItem('isRTL', String(isRTL));
            });
        }
    }

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* --- Wood Filter functionality --- */
    const filterTabs = document.querySelectorAll('.filter-tab');
    const woodCards = document.querySelectorAll('.wood-card');

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                const filterValue = tab.getAttribute('data-filter');

                // Show/hide cards
                woodCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-tone') === filterValue) {
                        card.style.display = 'block';
                        // Simple reflow animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transition = 'opacity 0.3s ease';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* --- Scroll Animations (IntersectionObserver) --- */
    const slideUps = document.querySelectorAll('.card, .pricing-card, .gallery-item, .section-header, .split-text, .tracker-card, .wood-card');
    slideUps.forEach((el) => {
        el.classList.add('reveal-up');
    });

    const scaleUps = document.querySelectorAll('.split-image-wrapper, .hero-image');
    scaleUps.forEach(el => {
        if (!el.classList.contains('hero-image')) {
            el.classList.add('reveal-scale');
        }
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
        observer.observe(el);
    });

    /* --- Dashboard Sidebar Toggle --- */
    const dashMenuToggle = document.querySelector('.dash-menu-toggle');
    const dashSidebar = document.querySelector('.dashboard-layout .sidebar');
    
    if (dashMenuToggle && dashSidebar) {
        const dashOverlay = document.createElement('div');
        dashOverlay.className = 'dash-overlay';
        dashSidebar.parentNode.insertBefore(dashOverlay, dashSidebar);

        function openDashSidebar() {
            dashSidebar.classList.add('open');
            dashOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeDashSidebar() {
            dashSidebar.classList.remove('open');
            dashOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        dashMenuToggle.addEventListener('click', openDashSidebar);
        dashOverlay.addEventListener('click', closeDashSidebar);
        
        dashSidebar.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', closeDashSidebar);
        });
    }

    /* --- Logout Functionality with Toast --- */
    function showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        const icon = type === 'success' ? 'ph-check-circle' : 'ph-info';
        toast.innerHTML = `<i class="ph ${icon}"></i> <span>${message}</span>`;
        
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
                if (container.childNodes.length === 0 && container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            }, 300);
        }, 3000);
    }

    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Logged out successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    });
});
