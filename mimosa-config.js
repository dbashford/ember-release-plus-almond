exports.config = {
  "modules": [
    "copy",
    "server",
    "jshint",
    "require",
    "minify-js",
    "minify-css",
    "live-reload",
    "bower",
    "less",
    "web-package",
    "handlebars-on-window",
    "fix-rjs-ember@0.3.0"
  ],
  "require":{
    "optimize": {
      "overrides": {
        "optimize": "none"
      }
    }
  }
}