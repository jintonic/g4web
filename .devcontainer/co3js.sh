#!/bin/bash
# try shallow clone three.js
git submodule update --init --recommend-shallow vendor/threejs
# save preferences in .git/config
git config submodule."vendor/threejs".sparseCheckout true
git config submodule."vendor/threejs".shallow true
# only include things needed by editor
cd vendor/threejs
git sparse-checkout set --no-cone '/*' '!/*/' '/build/' '/editor/' '/examples/' '!/examples/*' '!/examples/*/' '/examples/jsm/' '/examples/models/' '!/examples/models/*/' '/examples/models/ldraw/'
