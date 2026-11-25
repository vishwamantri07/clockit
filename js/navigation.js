
/* =====================================
   PROMETHEUS-X - NAVIGATION
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Get all sidebar navigation links
    const navigationLinks = document.querySelectorAll(".nav-link");

    // Get the current page address
    const currentPath = window.location.pathname;

    // Check every navigation link
    navigationLinks.forEach(function (link) {

        const linkPath = new URL(
            link.getAttribute("href"),
            window.location.href
        ).pathname;

        // Remove old active styling
        link.classList.remove("active");
        link.removeAttribute("aria-current");

        // Highlight the current page
        if (linkPath === currentPath) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }

    });

});
