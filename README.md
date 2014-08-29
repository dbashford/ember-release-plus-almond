ember-release-plus-almond
================

This project illustrates how the `1.7` release build of ember doesn't seem to be bundling with almond.  However, the last `1.7` beta and the first `1.8` beta both work.

## To get started with this..

* `npm install -g mimosa`
* `git clone https://github.com/dbashford/ember-release-plus-almond`
* `cd ember-release-plus-almond`

## Unbundled Works

* `mimosa watch -s` (short for `--server`)
* Launch http://localhost:3000

All this does is `console.log` the Ember object from inside the `app.js` file.

## Bundled with 1.7 beta works

* Go into `main.js` and uncomment the line containing `ember.beta` and comment the line containing `ember.release`.
* `mimosa build -op` (short for `--optimize --package`)
* `cd dist`
* `node app.js`
* Launch http://localhost:3000

This mimosa command runs the r.js optimizer and bundles the small app with almond. This successfully logs the Ember object.

## Bundled with 1.7 release does not work

* Go into `main.js` and comment the line containing `ember.beta` and uncomment the line containing `ember.release`.
* `mimosa build -op` (short for `--optimize --package`)
* `cd dist`
* `node app.js`
* Launch http://localhost:3000

When loading in the browser you get `Uncaught Error: app missing ember` from almond.

# Important Notes

* Bundling with both `1.7 beta 5` and `1.8 beta 1` both work.
* To properly bundle post `1.6`, the fix below was necessary.

# To get > 1.6 to work bundled

The following is what allows post-`1.6` ember to be bundled at all.

One of many changes between `1.6` and `1.7` was the inclusion of `define('ember', ...)` and a `requireModule("ember")` in the code.  This causes issues.  Require.js doesn't understand that the `define('ember', ...)` in the `ember.js` codebase is one it should not be paying attention to. If you have defined `ember` in your own codebase, these two things will clash.

You can see the [change I made to effect a fix](https://github.com/dbashford/ember-canary-plus-almond/commit/c0a494d5f4bb17d155bf64ff8305b844f3c7aa3a#diff-d3e32a8bff1fe1e269b30fc403dfeafeL41139) right here.

Changes to the ember source:

* Change `define('ember', ...)` to `define('ember-int', ...)`
* Change `requireModule("ember")` to `requireModule("ember-int")`

These two changes clear up any confusion between ember's define and my own define of `ember`.