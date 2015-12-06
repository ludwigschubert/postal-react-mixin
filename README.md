# Postal.js + React

Seamlessly bringing [postal.js](https://github.com/postaljs/postal.js)'s message bus into 
your [React](http://facebook.github.io/react/) components.

[![Build Status](https://travis-ci.org/ludwigschubert/postal-react-mixin.svg?branch=master)](https://travis-ci.org/ludwigschubert/postal-react-mixin) 
[![npm version](https://badge.fury.io/js/postal-react-mixin.svg)](http://badge.fury.io/js/postal-react-mixin)

## Overview

PostalReactMixin is a [React](http://facebook.github.io/react/) component mixin 
that provides simplified usage of [postal.js](https://github.com/postaljs/postal.js). 
It lets React components specify their channel and subscriptions declaratively, 
and provides simplified acces to `subscribe(topic, callback)` and 
`publish(topic, data)` functions.

In the background, these subscriptions are managed in lifecycle methods.

This mixin is a thin wrapper around postal.js and allows for easy messaging between 
components. It was created as a reaction to the React documentation stating

> For communication between two components that don't have a parent-child relationship, 
> you can set up your own global event system.
> — [Facebook React Docs](http://facebook.github.io/react/tips/communicate-between-components.html)

Whether a global event system/message bus is a smart architectural choice for your 
particular application remains a decision to be made at your descretion.

## Example

To add PostalReactMixin to a component, you simply add it to your components mixins.
This adds a `subscribe(topic, callback)` and a `publish(topic, data)` method to your
component. You can also declare your component's subscriptions in an object:

```js
let MessageCreator = React.createClass({
  mixins: [PostalReactMixin],

  subscriptions: {
    // subscribe to the topic "messageSuggestion"
    messageSuggestion: function(data) {
      this.setState({ text: data.text });
    }
  },

  render: function() {
    return (
      <Input type="text" value={this.state.text)} />
    );
  }
});
```

This `MessageCreator` will now receive messages from other components that publish 
on the `messageSuggestion` topic:

```js

let MessageSuggestion = React.createClass({
  mixins: [PostalReactMixin],

  _someCallback: function() {
    this.publish('messageSuggestion', {
      text: "Hi, this is a message Suggestion!"
    });
  },
  
// ...
```

Whenever this component mounts, it will subscribe to the given topics.

## Getting Started

PostalReactMixin is available from [npm](https://www.npmjs.com/package/postal-react-mixin).

I recommend to use a tool like Webpack or Browserify to include the `'postal-react-mixin'` npm package
in your dependencies.

```js
import PostalReactMixin from 'postal-react-mixin';

// ...
```

## Contributing

I'm new to React and Javascript in general, so I welcome any comments or suggestions as Github Issues.
