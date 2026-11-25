
/* =====================================
   PROMETHEUS-X - EMPLOYEE MANAGEMENT
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("employeeSearch");
    const roleFilter = document.getElementById("employeeRoleFilter");
    const statusFilter = document.getElementById("employeeStatusFilter");
    const tableBody = document.getElementById("employeeTableBody");

    if (!searchInput || !roleFilter || !statusFilter || !tableBody) {
        return;
    }

    const employeeRows = Array.from(tableBody.querySelectorAll("tr"));

    function filterEmployees() {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedRole = roleFilter.value;
        const selectedStatus = statusFilter.value;

        let visibleCount = 0;

        employeeRows.forEach(function (row) {

            const rowText = row.textContent.toLowerCase();
            const employeeRole = row.dataset.role;
            const employeeStatus = row.dataset.status;

            const matchesSearch = rowText.includes(searchText);

            const matchesRole =
                selectedRole === "all" ||
                employeeRole === selectedRole;

            const matchesStatus =
                selectedStatus === "all" ||
                employeeStatus === selectedStatus;

            const shouldShow =
                matchesSearch && matchesRole && matchesStatus;

            row.style.display = shouldShow ? "" : "none";

            if (shouldShow) {
                visibleCount++;
            }
        });

        let emptyRow = tableBody.querySelector(".employee-empty-row");

        if (visibleCount === 0) {

            if (!emptyRow) {
                emptyRow = document.createElement("tr");
                emptyRow.className = "employee-empty-row";

                const cell = document.createElement("td");
                cell.colSpan = 6;
                cell.textContent = "No matching employees found.";
                cell.style.textAlign = "center";
                cell.style.padding = "25px";

                emptyRow.appendChild(cell);
                tableBody.appendChild(emptyRow);
            }

        } else if (emptyRow) {
            emptyRow.remove();
        }
    }

    searchInput.addEventListener("input", filterEmployees);
    roleFilter.addEventListener("change", filterEmployees);
    statusFilter.addEventListener("change", filterEmployees);

    console.log("PROMETHEUS-X Employee Management Loaded");
});
