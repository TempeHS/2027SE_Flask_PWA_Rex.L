// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("static/js/serviceworker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

// Online/Offline detection
const offlineBanner = document.getElementById("offline-banner");

function updateOnlineStatus() {
  if (navigator.onLine) {
    offlineBanner.style.display = "none";
    console.log("App is online");
  } else {
    offlineBanner.style.display = "block";
    console.log("App is offline");
  }
}

window.addEventListener("load", updateOnlineStatus);
window.addEventListener("online", function () {
  updateOnlineStatus();
  console.log("Connection restored");
});
window.addEventListener("offline", function () {
  updateOnlineStatus();
  console.log("Connection lost");
});

// PWA Installation
let deferredPrompt;
const installButton = document.getElementById("install-button");

// Capture the install prompt event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default browser install prompt
  event.preventDefault();

  // Store the event so we can trigger it later
  deferredPrompt = event;

  // Show our custom install button
  installButton.style.display = "block";

  console.log("App is installable - showing install button");
});

// Handle install button click
installButton.addEventListener("click", async () => {
  if (!deferredPrompt) {
    console.log("Install prompt not available");
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user's response
  const { outcome } = await deferredPrompt.userChoice;

  console.log(`User response: ${outcome}`);

  if (outcome === "accepted") {
    console.log("User accepted the install prompt");
  } else {
    console.log("User dismissed the install prompt");
  }

  // Clear the deferred prompt
  deferredPrompt = null;

  // Hide the install button
  installButton.style.display = "none";
});

// Detect when app is successfully installed
window.addEventListener("appinstalled", () => {
  console.log("PWA was installed successfully");

  // Hide install button (app is now installed)
  installButton.style.display = "none";

  // Clear the deferred prompt
  deferredPrompt = null;
});
