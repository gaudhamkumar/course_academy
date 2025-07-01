document.addEventListener('DOMContentLoaded', function () {
    const boxItems = document.querySelectorAll('.box-item');

    // --- Helper Functions to manage element states ---
    // These functions use the .active class to trigger CSS and manage display property for transitions

    function activateBox(box) {
        const paraTitle = box.querySelector('.para-title');
        const boxOverlay = box.querySelector('.box-overlay');

        box.classList.add('active'); // Add active class to box

        // Hide paraTitle
        if (paraTitle) {
            paraTitle.style.opacity = '0';
            paraTitle.style.visibility = 'hidden';
            // Wait for transition to complete before setting display: none
            paraTitle.addEventListener('transitionend', function transitionEndHandler() {
                // Ensure the box is still active before truly hiding display
                if (box.classList.contains('active')) {
                    paraTitle.style.display = 'none';
                }
                paraTitle.removeEventListener('transitionend', transitionEndHandler);
            }, { once: true });
        }

        // Show boxOverlay
        if (boxOverlay) {
            boxOverlay.style.display = 'flex'; // Make it part of the layout before animating
            // Use requestAnimationFrame for reliable transition start
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    boxOverlay.style.opacity = '0.8';
                    boxOverlay.style.visibility = 'visible';
                });
            });
        }
    }

    function deactivateBox(box) {
        const paraTitle = box.querySelector('.para-title');
        const boxOverlay = box.querySelector('.box-overlay');

        box.classList.remove('active'); // Remove active class from box

        // Hide boxOverlay
        if (boxOverlay) {
            boxOverlay.style.opacity = '0';
            boxOverlay.style.visibility = 'hidden';
            // Wait for transition to complete before setting display: none
            boxOverlay.addEventListener('transitionend', function transitionEndHandler() {
                // Ensure the box is still inactive before truly hiding display
                if (!box.classList.contains('active')) {
                    boxOverlay.style.display = 'none';
                }
                boxOverlay.removeEventListener('transitionend', transitionEndHandler);
            }, { once: true });
        }

        // Show paraTitle
        if (paraTitle) {
            paraTitle.style.display = 'flex'; // Make it part of the layout before animating
            // Use requestAnimationFrame for reliable transition start
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    paraTitle.style.opacity = '0.8';
                    paraTitle.style.visibility = 'visible';
                });
            });
        }
    }

    // --- Conditional Event Binding ---
    // Use window.matchMedia to detect device capabilities reliably
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    boxItems.forEach(box => {
        // Ensure overlay is display: none initially for all boxes for correct state management
        const boxOverlay = box.querySelector('.box-overlay');
        if (boxOverlay) {
            boxOverlay.style.display = 'none';
        }

        if (isTouchDevice) {
            // --- For Touch Devices (Phones, Tablets) ---
            // Use click to toggle the active state
            box.addEventListener('click', function (event) {
                // Prevent the click from propagating to the document listener below immediately
                event.stopPropagation();

                // If this box is already active, deactivate it
                if (this.classList.contains('active')) {
                    deactivateBox(this);
                } else {
                    // Deactivate all other boxes first for a single-open experience
                    boxItems.forEach(otherBox => {
                        if (otherBox !== this && otherBox.classList.contains('active')) {
                            deactivateBox(otherBox);
                        }
                    });
                    // Then activate this box
                    activateBox(this);
                }
            });

            // Optional: Click anywhere else on the document to close any active boxes
            document.addEventListener('click', function (event) {
                boxItems.forEach(box => {
                    // If a box is active AND the click was outside of this box
                    if (box.classList.contains('active') && !box.contains(event.target)) {
                        deactivateBox(box);
                    }
                });
            });

        } else {
            // --- For Mouse Devices (Laptops, Desktops) ---
            // Use mouseenter/mouseleave for the hover effect
            box.addEventListener('mouseenter', function () {
                activateBox(this);
            });

            box.addEventListener('mouseleave', function () {
                deactivateBox(this);
            });
        }
    });
});



document.querySelector(".read-more-btn").addEventListener("click", function () {
    const fullTextElements = document.querySelectorAll(".full-text");
    const btn = this;

    fullTextElements.forEach(el => {
        el.style.display = el.style.display === "none" || el.style.display === "" ? "block" : "none";
    });

    btn.textContent = btn.textContent.trim() === "Read More" ? "Read Less" : "Read More";
});
