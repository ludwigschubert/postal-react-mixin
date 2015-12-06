# Postal.js + React

Seamlessly bringing [postal.js](https://github.com/postaljs/postal.js)'s message bus into your React components.

[![Build Status](https://travis-ci.org/ludwigschubert/postal-react-mixin.svg?branch=master)](https://travis-ci.org/ludwigschubert/postal-react-mixin) [![npm version](https://badge.fury.io/js/postal-react-mixin.svg)](http://badge.fury.io/js/postal-react-mixin)

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
import PostalReactMixin from 'postal-react-mixin'

// ...
```

## Contributing

I'm new to React and Javascript in general, so I welcome any comments or suggestions as Github Issues.

## License

Copyright (c) 2015, Ludwig Schubert. All rights reserved.

You are hereby granted a non-exclusive, worldwide, royalty-free license to use, copy, modify, and distribute this software in source code or binary form for use in connection with the web services and APIs provided by Parse.

As with any software that integrates with the Parse platform, your use of this software is subject to the Parse Terms of Service [https://www.parse.com/about/terms]. This copyright notice shall be included in all copies or substantial portions of the software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.