import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }, // allow all origins for local network testing
});

// Devices store: deviceId -> { lat, lng, updatedAt }
const devices = {};
// Map socket.id -> deviceId
const socketToDevice = {};

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Receive location updates
    socket.on("updateLocation", (data) => {
        devices[data.deviceId] = {
            lat: data.lat,
            lng: data.lng,
            updatedAt: Date.now(),
        };

        socketToDevice[socket.id] = data.deviceId;
        io.emit("locations", devices);
    });

    // Remove device on disconnect
    socket.on("disconnect", () => {
        const deviceId = socketToDevice[socket.id];
        if (deviceId) {
            console.log(`❌ Device disconnected: ${deviceId}`);
            delete devices[deviceId];
            delete socketToDevice[socket.id];
            io.emit("locations", devices);
        }
    });
});

// Periodic cleanup for idle devices (optional)
setInterval(() => {
    const now = Date.now();
    let updated = false;
    Object.keys(devices).forEach((deviceId) => {
        if (now - devices[deviceId].updatedAt > 10000) {
            // 10 sec idle
            console.log(`⌛ Removing idle device: ${deviceId}`);
            delete devices[deviceId];
            updated = true;
        }
    });
    if (updated) io.emit("locations", devices);
}, 5000);

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
