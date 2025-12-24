export const MapHTML = (user: {
  latitude: number;
  longitude: number;
}, driver: { latitude: number; longitude: number; } | null) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <style>
    html, body, #map {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    .leaflet-control-zoom {
      right: 10px !important;
      bottom: 40px !important;
    }
  </style>
</head>

<body>
  <div id="map"></div>

  <script>
    const userPos = [${user.latitude}, ${user.longitude}];

    const map = L.map("map", {
      zoomControl: true
    }).setView(userPos, 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map);

    const markerIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [38, 38],
      iconAnchor: [19, 38]
    });

    const marker = L.marker(userPos, {
      draggable: true,
      icon: markerIcon
    }).addTo(map);

    function sendCoords(latlng) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "user",
          latitude: latlng.lat,
          longitude: latlng.lng
        })
      );
    }

    marker.on("dragend", (e) => {
      sendCoords(e.target.getLatLng());
    });

    map.on("click", (e) => {
      marker.setLatLng(e.latlng);
      sendCoords(e.latlng);
    });
  </script>
</body>
</html>
`;
