
/* =====================================
   PROMETHEUS-X - SECURITY & ACCESS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const verificationForm = document.getElementById(
        "securityVerificationForm"
    );

    const employeeIdInput = document.getElementById(
        "securityEmployeeId"
    );

    const passwordInput = document.getElementById(
        "securityPassword"
    );

    const message = document.getElementById("securityMessage");

    if (!verificationForm) {
        return;
    }

    verificationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const employeeId = employeeIdInput.value.trim();
        const password = passwordInput.value;

        message.textContent = "";
        message.style.color = "var(--danger)";

        if (!employeeId || !password) {
            message.textContent =
                "Please enter your Employee ID and password.";
            return;
        }

        message.textContent =
            "Verification service is not connected yet. Please try again after backend integration.";

        passwordInput.value = "";

        console.log("Security verification form submitted.");
    });

    console.log("PROMETHEUS-X Security Page Loaded");
});
