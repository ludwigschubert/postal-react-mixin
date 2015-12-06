/**
 * Copyright 2015-2016, Ludwig Shcubert.
 * All rights reserved.
 *
 * @providesModule postalReactMixin
 * @typechecks static-only
 */

'use strict';

var postal = require('postal');

module.exports = {

  _defaultPostalChannel: 'postalReactMixinChannel',

  /**
  * Exposed methods
  */

  subscribe: function( topic, callback ) {
    this._postalSubscriptions[topic] = postal.subscribe({
        channel: this.channel || this._defaultPostalChannel,
        topic: topic,
        callback: callback
    }).context(this);
  },

  publish: function( topic, data ) {
    postal.publish({
      channel: this.channel || this._defaultPostalChannel,
      topic: topic,
      data: data
    });
  },

  /**
   * React component lifecycle methods
   */

  componentWillMount: function() {
    if (!this.hasOwnProperty("_postalSubscriptions")) {
        this._postalSubscriptions = {};
    }
    for (var topic in this.subscriptions) {
      if (this.subscriptions.hasOwnProperty(topic)) {
        var callback = this.subscriptions[topic];
        this.subscribe(topic, callback);
      }
    }
  },

  componentWillUnmount: function() {
    this._unsubscribe();
  },

  /**
  * Internal methods
  */

  _unsubscribe: function() {
    for (var topic in this._postalSubscriptions) {
      if (this._postalSubscriptions.hasOwnProperty(topic)) {
        this._postalSubscriptions[topic].unsubscribe();
      }
    }
    this._postalSubscriptions = {};
  }

};