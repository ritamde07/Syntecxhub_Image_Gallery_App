document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    // 1. Professional Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manage active states on buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter the gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 2. Lightbox Logic (Modularized for reuse)
    const openLightbox = (item) => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').innerText;
        
        lightboxImg.src = img.src;
        lightboxCaption.innerText = title;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        closeBtn.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // 3. Event Listeners for Gallery Items (Mouse & Keyboard)
    galleryItems.forEach(item => {
        // Mouse Click
        item.addEventListener('click', () => openLightbox(item));
        
        // Keyboard Navigation (Enter key)
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                openLightbox(item);
            }
        });
    });

    // 4. Closing the Lightbox
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-inner')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});