cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-mauron85-background-geolocation.backgroundGeolocation",
        "file": "plugins/cordova-plugin-mauron85-background-geolocation/www/backgroundGeolocation.js",
        "pluginId": "cordova-plugin-mauron85-background-geolocation",
        "clobbers": [
            "backgroundGeolocation"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-background-mode.BackgroundMode",
        "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
        "pluginId": "cordova-plugin-background-mode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "id": "cordova-plugin-autostart.AutoStart",
        "file": "plugins/cordova-plugin-autostart/www/auto-start.js",
        "pluginId": "cordova-plugin-autostart",
        "clobbers": [
            "cordova.plugins.autoStart"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-mauron85-background-geolocation": "2.2.5",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-background-mode": "0.7.2",
    "cordova-plugin-autostart": "2.0.1"
};
// BOTTOM OF METADATA
});