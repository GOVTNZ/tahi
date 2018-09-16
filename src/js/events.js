/**
 * @author dan.west@chrometoaster.com
 *
 * @summary events (publish subscribe) pattern
 * Allows modules to subscribe to globally scoped events - This provides  a layer of app wide communication
 *
*/

// jshint strict:false
var pubsubEvent = {
    pubsubEvent: {},
    on: function (eventName, fn) {
        this.pubsubEvent[eventName] = this.pubsubEvent[eventName] || [];
        this.pubsubEvent[eventName].push(fn);
    },

    off: function (eventName, fn) {
        if (this.pubsubEvent[eventName]) {
            for (var i = 0; i < this.pubsubEvent[eventName].length; i++) {
                if (this.pubsubEvent[eventName][i] === fn) {
                    this.pubsubEvent[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },

    emit: function (eventName, data) {
        if (this.pubsubEvent[eventName]) {
            this.pubsubEvent[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    },
};
