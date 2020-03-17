function findDeviceIndexExtAddr(e) {
    for (var t = 0; t < devList.length; t++)
        if (devList[t].ext_addr === e) return t;
    return -1
}

function findDeviceIndexShortAddr(e) {
    for (var t = 0; t < devList.length; t++)
        if (devList[t].short_addr === e) return t;
    return -1
}
var app = angular.module("myApp", ["ngTable", "ngRoute", "ngResource"]),
    devList = [];
app.controller("deviceController", ["NgTableParams", "$scope", "$http", "$timeout", function(e, t, a, s) {
    this.cols = [{
        field: "sensor",
        title: "Sensor",
        sortable: "sensor",
        show: !0
    }, {
        field: "data",
        title: "Value",
        sortable: "data",
        show: !0
    }, {
        field: "rssi",
        title: "RSSI",
        sortable: "rssi",
        show: !0
    }];
    var o, n;
    t.tableParams = {};
    var r = function() {
        a({
            method: "GET",
            url: "/devices"
        }).then(function(a) {
            var s, n = [],
                r = [],
                d = 0;
            if (console.log("[DEV Get] Success: " + a.status + a.statusText + " Data: " + JSON.stringify(a.data)), console.log("[DEV Get] Dev List: [" + devList.length + "]" + JSON.stringify(devList, null, 2)), devList.length > 0) {
                var l = findDeviceIndexExtAddr(a.data.ext_addr);
                if (console.log("[DEV Get] Index: " + l), l >= 0) {
                    if (devList[l].rssi = a.data.rssi, devList[l].active = !0, a.data.smart_objects.hasOwnProperty("temperature"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is Temperature"); a.data.smart_objects.temperature.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "temperature",
                            value: a.data.smart_objects.temperature[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("illuminance"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is Light"); a.data.smart_objects.illuminance.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "illuminance",
                            value: a.data.smart_objects.illuminance[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("humidity"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is Humidity"); a.data.smart_objects.humidity.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "humidity",
                            value: a.data.smart_objects.humidity[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("fan"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is a Fan"); a.data.smart_objects.fan.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "fan",
                            value: a.data.smart_objects.fan[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("doorlock"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is a Lock"); a.data.smart_objects.doorlock.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "doorlock",
                            value: a.data.smart_objects.doorlock[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("barometer"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is pressure"); a.data.smart_objects.barometer.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "barometer",
                            value: a.data.smart_objects.barometer[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("motion"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is motion"); a.data.smart_objects.motion.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "motion",
                            value: a.data.smart_objects.motion[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("voltage"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is voltage"); a.data.smart_objects.voltage.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "voltage",
                            value: a.data.smart_objects.voltage[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("halleffect"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is halleffect"); a.data.smart_objects.halleffect.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "halleffect",
                            value: a.data.smart_objects.halleffect[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("waterleak"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is waterleak"); a.data.smart_objects.waterleak.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "waterleak",
                            value: a.data.smart_objects.waterleak[s].sensorValue
                        }, d++, s++;
                    if (a.data.smart_objects.hasOwnProperty("generic"))
                        for (s = 0, console.log("[DEV Get] Index: [" + l + "] is Generic"); a.data.smart_objects.generic.hasOwnProperty(s);) devList[l].sensors[d] = {
                            type: "generic",
                            value: a.data.smart_objects.generic[s].sensorValue
                        }, d++, s++;
                    devList[l].sensors[d] = {
                        type: "LED",
                        value: 0
                    }, d++, s++;
                }
                for (console.log("[DEV Get] Dev List: " + JSON.stringify(devList, null, 2)), i = 0; i < devList.length; i++)
                    for (j = 0; j < devList[i].sensors.length; j++) {
                        var c = {
                            sensor: devList[i].sensors[j].type,
                            data: devList[i].sensors[j].value,
                            shortaddr: devList[i].short_addr,
                            rssi: devList[i].rssi
                        };
                        n.push(c)
                    }
                for (console.log("[DEV Get] Temp List: " + JSON.stringify(n, null, 2)), i = 0; i < n.length; i++){ o = n[i].data;
                switch(n[i].sensor){
                    case "temperature": n[i].data = o + "C";
                    break;
                    case "humidity": n[i].data = o + " %";
                    break;
                    case "illuminance": n[i].data = o + " Lumens";
                    break;
                    case "doorlock":n[i].data = "1" == o ? "Locked" : "Unlocked";
                    break;
                    case "barometer":n[i].data = o + " ";
                    break;
                    case "motion":n[i].data = "1" == o ? "Motion" : "No Motion";
                    break;
                    case "voltage":n[i].data = o + " mV";
                    break;
                    case "halleffect":n[i].data = "1" == o ? "Open" : "Closed";
                    break;
                    case "waterleak":n[i].data = "1" == o ? "Leak" : "No Leak";
                    break;
                    case "LED":n[i].data = "Toggle";
                    break;
                }}
                r = n, console.log("[DEV Get] simple List: " + JSON.stringify(r, null, 2)), t.tableParams = new e({
                    group: {
                        shortaddr: "desc"
                    }
                }, {
                    counts: [],
                    dataset: r,
                    groupOptions: {
                        isExpanded: !0
                    }
                }), t.tableParams.reload()
            }
        }, function(e) {
            console.log("[DEV Get] Failed: " + e.status + " " + e.statusText + " Data: " + JSON.stringify(e.data))
        }), s(r, 5e3)
    };
    t.toggle = function(e) {
        ("doorlock" == e.sensor && (t = "updateDoorLock")) ? ("Unlocked" == e.data ? n = 1 : n = 0) : ("fan" == e.sensor && (t = "updateFanSpeed") ? n=e.speed:(t="sendToggle")&&(n=1)), console.log("[Action Button POST] Posting: {dstAddr : " + e.shortaddr + ",devActionType:"+t+", value: " + n + "}"),
        a({ method: "POST",
            url: "/action",
            data: 'action={"dstAddr":"' + e.shortaddr +'","devActionType":"'+t+ '","value":"' + n + '"}',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
    }, s(r, 5e3)
}]), app.controller("nwkController", ["NgTableParams", "$scope", "$http", "$timeout", function(e, t, a, s) {
    t.tableParams = {};
    var o = [],
        n = function() {
            a({
                method: "GET",
                url: "/nwk"
            }).then(function(a) {
                console.log("[NWK Get] Success: " + a.status + a.statusText + "  Data: " + JSON.stringify(a.data)), o[0] = {
                    key: "name",
                    value: a.data.name
                }, o[1] = {
                    key: "Short Address",
                    value: a.data.short_addr
                }, o[2] = {
                    key: "Extendded Address",
                    value: a.data.ext_addr
                }, o[3] = {
                    key: "Channels",
                    value: a.data.channels
                }, o[4] = {
                    key: "Mode",
                    value: a.data.mode
                }, o[5] = {
                    key: "State",
                    value: a.data.state
                }, console.log("[NWK Get] SimpleList: " + JSON.stringify(o, null, 2)), console.log("[NWK Get] Dev List Length: " + a.data.devices.length);
                var s;
                for (i = 0; i < a.data.devices.length; i++) {
                    var n = findDeviceIndexShortAddr(a.data.devices[i].short_addr);
                    console.log("[NWK Get] Index: " + n), n < 0 && (s = {
                        short_addr: a.data.devices[i].short_addr,
                        ext_addr: a.data.devices[i].ext_addr,
                        rssi: 0,
                        active: !0,
                        sensors: []
                    }, devList.push(s))
                }
                console.log("[NWK Get] Dev List: " + JSON.stringify(devList, null, 2)), t.tableParams = new e({}, {
                    counts: [],
                    dataset: o
                }), t.tableParams.reload()
            }, function(e) {
                console.log("[NWK Get] Failed: " + e.status + e.statusText + "  Data: " + JSON.stringify(e.data))
            }), s(n, 9e3)
        };
    s(n, 5e3)
}]), app.controller("open", ["$scope", "$http", "$timeout", function(e, t, a) {
    e.value = "open", e.open = function() {
        e.value = "opening...", t({
            method: "POST",
            url: "/cmd",
            data: "cmd=true",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }
}]), app.controller("close", ["$scope", "$http", "$timeout", function(e, t, a) {
    e.value = "close", e.close = function() {
        e.value = "closing...", t({
            method: "POST",
            url: "/cmd",
            data: "cmd=false",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }
}]), app.controller("myCloudBtn", ["$scope", "$http", "$timeout", function(e, t, a) {
    e.save = function() {
        t({
            method: "POST",
            url: "/cloud",
            data: "org=" + e.orgId + "&type=" + e.deviceType + "&id=" + e.deviceId + "&password=" + e.password,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }
}]), app.controller("myDevStatusCtrl", ["$scope", "$http", "$timeout", function(e, t, a) {
    e.ipAddress = "000.000.000.000", e.wifiConnection = !1, e.mqttConnection = !1, e.wifiConnection ? (angular.element("#wifiCircle").removeClass("lightOff"), angular.element("#wifiCircle").addClass("lightOn")) : (angular.element("#wifiCircle").removeClass("lightOn"), angular.element("#wifiCircle").addClass("lightOff")), e.mqttConnection ? (angular.element("#mqttCircle").removeClass("lightOff"), angular.element("#mqttCircle").addClass("lightOn")) : (angular.element("#mqttCircle").removeClass("lightOn"), angular.element("#mqttCircle").addClass("lightOff"));
    var s = function() {
        t({
            method: "GET",
            url: "/cloud"
        }).then(function(t) {
            console.log("[Dev Status Get] Success: " + t.status + t.statusText + "  Data: " + JSON.stringify(t.data)), e.ipAddress = t.data.ipAddress, t.data.wifiConnection ? (angular.element("#wifiCircle").removeClass("lightOff"), angular.element("#wifiCircle").addClass("lightOn")) : (angular.element("#wifiCircle").removeClass("lightOn"), angular.element("#wifiCircle").addClass("lightOff")), t.data.mqttConnection ? (angular.element("#mqttCircle").removeClass("lightOff"), angular.element("#mqttCircle").addClass("lightOn")) : (angular.element("#mqttCircle").removeClass("lightOn"), angular.element("#mqttCircle").addClass("lightOff"))
        }, function(e) {
            console.log("[Dev Status Get]  Failed: " + e.status + e.statusText + "  Data: " + JSON.stringify(e.data))
        }), a(s, 5e3)
    };
    a(s, 5e3)
}]);