
/* =====================================
   PROMETHEUS-X - DASHBOARD DATA
===================================== */

// Temporary demonstration data
const dashboardData = {
    totalTested: 1248,
    totalPassed: 1186,
    totalAnomalies: 42,
    pendingReview: 20
};


// Update dashboard statistics
function updateDashboard() {

    const totalTested = document.getElementById("totalTested");
    const totalPassed = document.getElementById("totalPassed");
    const totalAnomalies = document.getElementById("totalAnomalies");
    const pendingReview = document.getElementById("pendingReview");

    if (totalTested) {
        totalTested.textContent =
            dashboardData.totalTested.toLocaleString("en-IN");
    }

    if (totalPassed) {
        totalPassed.textContent =
            dashboardData.totalPassed.toLocaleString("en-IN");
    }

    if (totalAnomalies) {
        totalAnomalies.textContent =
            dashboardData.totalAnomalies.toLocaleString("en-IN");
    }

    if (pendingReview) {
        pendingReview.textContent =
            dashboardData.pendingReview.toLocaleString("en-IN");
    }
}


// Calculate pass percentage
function calculatePassPercentage() {

    const percentage =
        (dashboardData.totalPassed / dashboardData.totalTested) * 100;

    return percentage.toFixed(1);
}


// Run when dashboard loads
document.addEventListener("DOMContentLoaded", function () {

    updateDashboard();

    console.log("PROMETHEUS-X Dashboard Loaded");

    console.log(
        "Pass Percentage:",
        calculatePassPercentage() + "%"
    );

});
