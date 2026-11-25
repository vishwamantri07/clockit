
/* =====================================
   PROMETHEUS-X - SYSTEM SETTINGS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("systemSettingsForm");
    const message = document.getElementById("settingsMessage");

    const settingIds = [
        "companyName",
        "factoryLocation",
        "productionLine",
        "inspectionCategory",
        "anomalyThreshold",
        "imageResolution",
        "anomalyNotifications",
        "highSeverityNotifications",
        "systemNotifications",
        "sessionTimeout",
        "failedAttempts"
    ];

    // Load previously saved browser settings
    function loadSettings() {
        const savedSettings = localStorage.getItem("prometheus-system-settings");

        if (!savedSettings) return;

        const settings = JSON.parse(savedSettings);

        settingIds.forEach(function (id) {
            const field = document.getElementById(id);

            if (!field || settings[id] === undefined) return;

            if (field.type === "checkbox") {
                field.checked = settings[id];
            } else {
                field.value = settings[id];
            }
        });
    }

    // Save settings in browser storage
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const settings = {};

        settingIds.forEach(function (id) {
            const field = document.getElementById(id);

            if (field) {
                settings[id] = field.type === "checkbox"
                    ? field.checked
                    : field.value;
            }
        });

        localStorage.setItem(
            "prometheus-system-settings",
            JSON.stringify(settings)
        );

        message.textContent = "Settings saved successfully!";
    });

    // Reset settings to their HTML defaults
    form.addEventListener("reset", function () {
        localStorage.removeItem("prometheus-system-settings");
        message.textContent = "Settings reset to default values.";
    });

    loadSettings();

    console.log("PROMETHEUS-X System Settings Loaded");

});
