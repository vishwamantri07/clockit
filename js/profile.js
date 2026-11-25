
/* =====================================
   PROMETHEUS-X - MY PROFILE
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("profileForm");
    const editButton = document.getElementById("editProfileBtn");
    const cancelButton = document.getElementById("cancelProfileBtn");
    const actions = document.getElementById("profileActions");
    const message = document.getElementById("profileMessage");

    const editableFields = [
        "fullName",
        "email",
        "phone"
    ];

    const profileFields = [
        "employeeId",
        "fullName",
        "email",
        "phone",
        "department",
        "jobRole"
    ];

    let originalValues = {};

    function getProfileData() {
        const data = {};

        profileFields.forEach(function (id) {
            data[id] = document.getElementById(id).value;
        });

        return data;
    }

    function saveOriginalValues() {
        originalValues = getProfileData();
    }

    function setEditMode(enabled) {
        editableFields.forEach(function (id) {
            document.getElementById(id).disabled = !enabled;
        });

        editButton.hidden = enabled;
        actions.hidden = !enabled;
    }

    // Load saved demonstration profile details
    function loadProfile() {
        const savedProfile = localStorage.getItem(
            "prometheus-user-profile"
        );

        if (savedProfile) {
            const profile = JSON.parse(savedProfile);

            profileFields.forEach(function (id) {
                if (profile[id] !== undefined) {
                    document.getElementById(id).value = profile[id];
                }
            });
        }

        updateProfileHeading();
        saveOriginalValues();
    }

    function updateProfileHeading() {
        const name = document.getElementById("fullName").value;
        const role = document.getElementById("jobRole").value;

        document.getElementById("profileName").textContent = name;
        document.getElementById("profileRole").textContent = role;

        const initials = name.trim()
            .split(/\s+/)
            .map(function (part) {
                return part.charAt(0);
            })
            .join("")
            .substring(0, 2)
            .toUpperCase();

        document.getElementById("profileAvatar").textContent =
            initials || "VM";
    }

    // Enable editing
    editButton.addEventListener("click", function () {
        message.textContent = "";
        saveOriginalValues();
        setEditMode(true);
    });

    // Save updated profile
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const profile = getProfileData();

        if (!profile.fullName.trim()) {
            message.textContent = "Please enter your full name.";
            return;
        }

        localStorage.setItem(
            "prometheus-user-profile",
            JSON.stringify(profile)
        );

        updateProfileHeading();
        saveOriginalValues();
        setEditMode(false);

        message.textContent = "Profile updated successfully!";
    });

    // Cancel editing and restore previous values
    cancelButton.addEventListener("click", function () {

        profileFields.forEach(function (id) {
            document.getElementById(id).value = originalValues[id];
        });

        updateProfileHeading();
        setEditMode(false);

        message.textContent = "Changes cancelled.";
    });

    loadProfile();

    console.log("PROMETHEUS-X My Profile Loaded");

});
