self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "view-video") {
    console.log("VIEW VIDEO");
    clients.openWindow("https://www.microhealthllc.com/");
  } else if (event.action == "snooze") {
    console.log("SNOOZE");
  } else {
    console.log("BUTTONS NOT CLICKED");
  }
});
