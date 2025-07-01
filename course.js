document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".course-container");

    if (container) {
        container.style.overflow = "hidden"; // Initially hidden

        container.addEventListener("click", () => {
            container.style.overflow = (container.style.overflow === "hidden") ? "auto" : "hidden";
        });
    } else {
        console.error("Course container not found!");
    }
});
