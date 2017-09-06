Configuration
=============

Supershit uses [superconf](https://npmjs.org/packages/superconf) to handle configurations.  
Configurations getting load from `config/${process.env.NODE_ENV}.json`. The default environment is `development`. A configuration can be either a `.json` `.cson` or  a `.yml` file.

## Usage

```js
const supershit = require('supershit')

// load config from config files
const config = supershit.config()
```

## Methods

### `config([customConfig]) object` - Get current configuration

Loads a config from `$PROJECT_DIR/config/`. The optional `customConf` parameter overwrites predefined configurations. It returns a configuration object.
