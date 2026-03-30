const os = require("os");

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "localhost";
}

export default ({ config }) => {
    const localIp = getLocalIpAddress();

    return {
        ...config,
        extra: {
            // Adjust based on where the Expo app is running:
            API_URL_ANDROID_EMULATOR: `http://10.0.2.2:3000`,
            API_URL_IOS_SIMULATOR: `http://localhost:3000`,
            API_URL_DEVICE: `http://${localIp}:3000`,
        },
    };
};
