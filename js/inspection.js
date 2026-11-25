
/* =====================================
   PROMETHEUS-X - LIVE INSPECTION
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const productImage = document.getElementById("productImage");
    const imagePreview = document.getElementById("imagePreview");
    const imageStatus = document.getElementById("imageStatus");
    const inspectButton = document.getElementById("inspectButton");

    let selectedImage = null;
    let currentImageURL = null;


    // IMAGE UPLOAD AND PREVIEW
    if (productImage) {

        productImage.addEventListener("change", function () {

            const file = productImage.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image file.");
                productImage.value = "";
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert("Image size must be less than 10 MB.");
                productImage.value = "";
                return;
            }

            selectedImage = file;

            if (currentImageURL) {
                URL.revokeObjectURL(currentImageURL);
            }

            currentImageURL = URL.createObjectURL(file);

            imagePreview.innerHTML = "";

            const previewImage = document.createElement("img");
            previewImage.src = currentImageURL;
            previewImage.alt = "Uploaded product image";

            imagePreview.appendChild(previewImage);

            imageStatus.textContent = "Image uploaded successfully";
            imageStatus.style.color = "#249B72";

            // Reset old result when a new image is selected
            document.getElementById("resultPlaceholder").hidden = false;
            document.getElementById("resultDetails").hidden = true;

            console.log("Selected image:", file.name);
        });
    }


    // START INSPECTION
    if (inspectButton) {

        inspectButton.addEventListener("click", function () {

            const productId = document.getElementById("productId").value.trim();
            const productCategory = document.getElementById("productCategory").value;
            const batchId = document.getElementById("batchId").value.trim();

            if (!productId) {
                alert("Please enter the Product ID.");
                return;
            }

            if (!productCategory) {
                alert("Please select a Product Category.");
                return;
            }

            if (!batchId) {
                alert("Please enter the Batch ID.");
                return;
            }

            if (!selectedImage) {
                alert("Please upload a product image.");
                return;
            }


            // DEMO RESULT ONLY
            inspectButton.disabled = true;
            inspectButton.textContent = "Processing Demo...";

            setTimeout(function () {

                // Display demo results
                document.getElementById("resultPlaceholder").hidden = true;

                const resultDetails = document.getElementById("resultDetails");
                resultDetails.hidden = false;

                document.getElementById("resultStatus").textContent =
                    "Anomaly Detected (Demo)";

                document.getElementById("resultSeverity").textContent =
                    "Medium (Demo)";

                document.getElementById("resultConfidence").textContent =
                    "94.5% (Demo)";

                document.getElementById("resultScore").textContent =
                    "0.78 (Demo)";

                inspectButton.disabled = false;
                inspectButton.textContent = "Start Inspection";

                console.log("Demo inspection completed:", {
                    productId,
                    productCategory,
                    batchId,
                    imageName: selectedImage.name
                });

            }, 1200);

        });
    }

});
