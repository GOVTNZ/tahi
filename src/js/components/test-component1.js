/**
 * @author dan.west@chrometoaster.com
 * @requires jquery.js
 * @summary A sample custom js module using the Revealing Module Pattern
 * This is good practice for a number of reasons, here is a good article https://toddmotto.com/mastering-the-module-pattern.
 *
*/

// Create namespace for module
var TestComponent1 = (function () {
    'use strict';

    // define your object variables here

    var s;


    // Define private methods here. These are not available outside this closure

    // Remember to prefix wih underscore for readability
    var _privateMethod = function () {
        // do something private
        // console.log(s.text1);
    };

    var _anotherPrivateMethod = function () {
        // do something else private
        // console.log(s.text2);
    };

    // Define public methods like this (no underscore)
    var init = function () {
        // assign exposed settings object literal to settings variable
        s = this.settings;

        // Call private method
        _privateMethod();

        // Call another private method
        _anotherPrivateMethod();
    };


    // ----------------------
    // Observe events
    // ----------------------
    // Listen to the below events and triger a function

    pubsubEvent.on('boilerplateEvent_myFirstEvent', _privateMethod);

    // Event is emmited like this
    // boilerplateEvent.emit('boilerplateEvent_myFirstEvent', {name of parameter to pass with the event});

    // Expose objects here
    return {
        // Expose settings as object literal if required
        settings: {
            text1: 'logged 1',
            text2: 'logged 2',
        },

        // Expose below methods as object literals. They are now available outside this closure
        init: init,
    };
})();
