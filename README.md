# Realtime Device Tracking Web Application

A simple **realtime device tracking system** using **Node.js**, **Express**, **Socket.IO**, and **Leaflet.js**. This project allows multiple devices to share their location in real time on a map.

---

## Features

-   Track multiple devices in real time.
-   Display device locations on a **Leaflet map**.
-   Automatic marker update when devices move.
-   Remove disconnected or idle devices automatically.
-   Works on local network or over public IP (with CORS enabled).

---

## Technologies Used

-   **Backend**: Node.js, Express, Socket.IO
-   **Frontend**: HTML, Leaflet.js
-   **Real-time Communication**: WebSockets via Socket.IO
-   **Geo-location**: Browser `navigator.geolocation` API
-   **Server Port**: 3000 (configurable)

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/realtime-device-tracking.git
cd realtime-device-tracking
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node server.js
# or
nodemon server.js
```

4. Open your browser and navigate to:

```bash
http://localhost:3000
```

5. Open the same URL on multiple devices to test real-time tracking.

---

## Usage

-   Each device/tab generates a unique `deviceId`.
-   The client sends its location every 2 seconds.
-   The server broadcasts locations to all connected clients.
-   Leaflet.js displays markers for all active devices.
-   Idle devices (no update for 10 seconds) are automatically removed.

---

## Folder Structure

```bash
realtime-device-tracking/
│
├── public/
│   └── index.html      # Frontend map page
├── server.js           # Backend Node.js + Socket.IO server
├── package.json
└── README.md
```

---

## Notes

-   Browser will prompt for **location permission**. Make sure to allow it.
-   Use your **LAN IP** for accessing from other devices in the same network.
-   Replace random location simulation with `navigator.geolocation` to get real device coordinates.

---

## License

MIT License
