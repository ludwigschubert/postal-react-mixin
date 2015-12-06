/**
 * Copyright 2015-2016, Ludwig Shcubert.
 * All rights reserved.
 *
 * @providesModule PostalReactMixin
 * @typechecks static-only
 */

'use strict';

import Postal from 'postal';

const PostalReactMixin = {

  _defaultPostalChannel: 'PostalReactMixinChannel',

  /**
  * Exposed methods
  */

  subscribe: function( topic, callback ) {
    this._postalSubscriptions[topic] = Postal.subscribe({
        channel: this.channel || this._defaultPostalChannel,
        topic: topic,
        callback: callback
    }).context(this);
  },

  publish: function( topic, data ) {
    Postal.publish({
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
    for (const topic in this.subscriptions) {
      if (this.subscriptions.hasOwnProperty(topic)) {
        const callback = this.subscriptions[topic];
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
    for (const topic in this._postalSubscriptions) {
      if (this._postalSubscriptions.hasOwnProperty(topic)) {
        this._postalSubscriptions[topic].unsubscribe();
      }
    }
    this._postalSubscriptions = {};
  }

};

module.exports = PostalReactMixin;