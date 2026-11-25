/* =====================================
   PROMETHEUS-X - ANOMALY ALERTS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("alertSearch");
    const severityFilter = document.getElementById("severityFilter");
    const statusFilter = document.getElementById("alertStatusFilter");
    const alertList = document.getElementById("alertList");

    if (!searchInput || !severityFilter || !statusFilter || !alertList) {
        return;
    }

    const alertCards = Array.from(
        alertList.querySelectorAll(".alert-card")
    );

    function filterAlerts() {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedSeverity = severityFilter.value;
        const selectedStatus = statusFilter.value;

        let visibleCount = 0;

        alertCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();
            const cardSeverity = card.dataset.severity;
            const cardStatus = card.dataset.status;

            const matchesSearch = cardText.includes(searchText);

            const matchesSeverity =
                selectedSeverity === "all" ||
                cardSeverity === selectedSeverity;

            const matchesStatus =
                selectedStatus === "all" ||
                cardStatus === selectedStatus;

            const shouldShow =
                matchesSearch && matchesSeverity && matchesStatus;

            card.style.display = shouldShow ? "flex" : "none";

            if (shouldShow) {
                visibleCount++;
            }
        });

        let emptyMessage = alertList.querySelector(".alert-empty");

        if (visibleCount === 0) {
            if (!emptyMessage) {
                emptyMessage = document.createElement("div");
                emptyMessage.className = "alert-empty";
                emptyMessage.textContent = "No matching alerts found.";
                alertList.appendChild(emptyMessage);
            }
        } else if (emptyMessage) {
            emptyMessage.remove();
        }
    }

    searchInput.addEventListener("input", filterAlerts);
    severityFilter.addEventListener("change", filterAlerts);
    statusFilter.addEventListener("change", filterAlerts);

    console.log("PROMETHEUS-X Anomaly Alerts Loaded");
});