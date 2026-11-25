
/* =====================================
   PROMETHEUS-X - QUALITY ANALYTICS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Check whether Chart.js is loaded
    if (typeof Chart === "undefined") {
        console.error("Chart.js could not be loaded.");
        return;
    }


    // INSPECTION TREND CHART
    const trendCanvas = document.getElementById("inspectionTrendChart");

    if (trendCanvas) {

        new Chart(trendCanvas, {

            type: "line",

            data: {
                labels: [
                    "18 Nov",
                    "19 Nov",
                    "20 Nov",
                    "21 Nov",
                    "22 Nov",
                    "23 Nov",
                    "24 Nov"
                ],

                datasets: [
                    {
                        label: "Inspections",
                        data: [145, 168, 152, 190, 175, 205, 213],
                        borderColor: "#3978C5",
                        backgroundColor: "rgba(57, 120, 197, 0.12)",
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "top"
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        });

    }


    // QUALITY DISTRIBUTION CHART
    const qualityCanvas = document.getElementById("qualityChart");

    if (qualityCanvas) {

        new Chart(qualityCanvas, {

            type: "doughnut",

            data: {
                labels: [
                    "Normal Products",
                    "Anomalies",
                    "Pending Review"
                ],

                datasets: [
                    {
                        data: [1186, 42, 20],

                        backgroundColor: [
                            "#249B72",
                            "#E36B65",
                            "#E6A23C"
                        ],

                        borderWidth: 2,
                        borderColor: "#FFFFFF"
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                },

                cutout: "65%"
            }

        });

    }


    console.log("PROMETHEUS-X Analytics Loaded");

});
