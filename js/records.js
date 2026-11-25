
/* =====================================
   PROMETHEUS-X - INSPECTION RECORDS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("recordSearch");
    const statusFilter = document.getElementById("statusFilter");
    const tableBody = document.getElementById("recordsTableBody");

    if (!searchInput || !statusFilter || !tableBody) {
        return;
    }

    const records = Array.from(tableBody.querySelectorAll("tr"));

    function filterRecords() {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedStatus = statusFilter.value;

        let visibleCount = 0;

        records.forEach(function (row) {

            const rowText = row.textContent.toLowerCase();
            const rowStatus = row.dataset.status;

            const matchesSearch = rowText.includes(searchText);

            const matchesStatus =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;

            if (matchesSearch && matchesStatus) {
                row.style.display = "";
                visibleCount++;
            } else {
                row.style.display = "none";
            }

        });

        // Display a message when no records match
        let emptyRow = document.getElementById("noRecordsMessage");

        if (visibleCount === 0) {

            if (!emptyRow) {
                emptyRow = document.createElement("tr");
                emptyRow.id = "noRecordsMessage";

                const cell = document.createElement("td");
                cell.colSpan = 8;
                cell.textContent = "No matching inspection records found.";
                cell.style.textAlign = "center";
                cell.style.padding = "25px";
                cell.style.color = "#78879A";

                emptyRow.appendChild(cell);
                tableBody.appendChild(emptyRow);
            }

        } else if (emptyRow) {
            emptyRow.remove();
        }

    }

    // Search while typing
    searchInput.addEventListener("input", filterRecords);

    // Filter when status changes
    statusFilter.addEventListener("change", filterRecords);

    console.log("PROMETHEUS-X Inspection Records Loaded");

});
