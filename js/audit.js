
/* =====================================
   PROMETHEUS-X - AUDIT TRAIL
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("auditSearch");
    const actionFilter = document.getElementById("auditActionFilter");
    const dateFilter = document.getElementById("auditDateFilter");
    const exportButton = document.getElementById("exportAuditBtn");
    const tableBody = document.getElementById("auditTableBody");

    if (!searchInput || !actionFilter || !dateFilter || !tableBody) {
        return;
    }

    const rows = Array.from(tableBody.querySelectorAll("tr"));

    function filterAuditRecords() {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedAction = actionFilter.value;
        const selectedDate = dateFilter.value;

        let visibleCount = 0;

        rows.forEach(function (row) {

            const rowText = row.textContent.toLowerCase();
            const rowAction = row.dataset.action;

            const dateCell = row.cells[3];
            const rowDate = dateCell ? new Date(dateCell.textContent) : null;

            const matchesSearch = rowText.includes(searchText);

            const matchesAction =
                selectedAction === "all" ||
                rowAction === selectedAction;

            let matchesDate = true;

            if (selectedDate && rowDate && !isNaN(rowDate.getTime())) {
                const formattedDate = [
                    rowDate.getFullYear(),
                    String(rowDate.getMonth() + 1).padStart(2, "0"),
                    String(rowDate.getDate()).padStart(2, "0")
                ].join("-");

                matchesDate = formattedDate === selectedDate;
            }

            const shouldShow =
                matchesSearch && matchesAction && matchesDate;

            row.style.display = shouldShow ? "" : "none";

            if (shouldShow) {
                visibleCount++;
            }
        });

        let emptyRow = tableBody.querySelector(".audit-empty-row");

        if (visibleCount === 0) {
            if (!emptyRow) {
                emptyRow = document.createElement("tr");
                emptyRow.className = "audit-empty-row";

                const cell = document.createElement("td");
                cell.colSpan = 6;
                cell.textContent = "No matching audit records found.";
                cell.style.textAlign = "center";
                cell.style.padding = "25px";

                emptyRow.appendChild(cell);
                tableBody.appendChild(emptyRow);
            }
        } else if (emptyRow) {
            emptyRow.remove();
        }
    }

    searchInput.addEventListener("input", filterAuditRecords);
    actionFilter.addEventListener("change", filterAuditRecords);
    dateFilter.addEventListener("change", filterAuditRecords);

    if (exportButton) {
        exportButton.addEventListener("click", function () {
            window.print();
        });
    }

    console.log("PROMETHEUS-X Audit Trail Loaded");
});
