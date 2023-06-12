# Vatom Spaces Plugin Intellisense :computer:

<p>
  <img src="https://img.shields.io/npm/v/vatom-spaces-plugins" alt="Version" />
  <img src="https://badgen.net/packagephobia/install/vatom-spaces-plugins" alt="NPM Size" />
  <img src="https://img.shields.io/github/languages/code-size/VatomInc/vatom-spaces-plugins?color=orange" alt="Repo Size" />
</p>

Provides intellisense in your editor when developing plugins for <a href="https://spaces.vatom.com"><img src="https://spaces.vatom.com/client/favicon.ico" width="14" height="14" /> Vatom Spaces</a>.

For additional information about the plugin development process, you can visit [:page_facing_up:our developer portal](https://developer.vatom.com/spaces/plugins-in-spaces/guide-create-plugin).

## Install :hammer:

To install this packages, you can run the command below:

```bash
npm install vatom-spaces-plugins --save
```

## Usage :cd:

This package exports two classes, `BasePlugin` and `BaseComponent`.

To use these classes, you can import them as follows:
```js
// ES6 import
import { BasePlugin, BaseComponent } from 'vatom-spaces-plugins'

// or CommonJS import
const VatomSpacesPlugins = require('vatom-spaces-plugins')
// use as `VatomSpacesPlugins.BasePlugin` and `VatomSpacesPlugins.BaseComponent`
```
