function toggleSubOptions() {
    const courseDropdown = document.getElementById("course");
    const selectedCourse = courseDropdown.value;

    // Hide all sub-options first
    document.querySelectorAll(".sub-options").forEach(selectBox => {
        selectBox.style.display = "none";
    });

    // Show only the relevant sub-options dropdown
    if (selectedCourse) {
        document.getElementById(`${selectedCourse}-options`).style.display = "block";
    }
}

// Attach event listener to all sub-options dropdowns dynamically
document.querySelectorAll(".sub-options").forEach(selectBox => {
    selectBox.addEventListener("change", function() {
        selectCombo(this.value);
    });
});

function selectCombo(option) {
    const selectedText = document.getElementById("selected-combo");
    selectedText.innerHTML = `Selected: ${option}`;
}
