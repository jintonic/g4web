Geant4 Web UI

## For Developers

[threejs] is included as a submodule in the `vendor/threejs` directory. This is preferred over manually adding [threejs] files to the repository, because it allows us to keep the repository size small. The following commands were used to initialize the submodule:

```bash
# shallow clone three.js (~370MB still...)
git submodule add --depth 1 https://github.com/mrdoob/three.js.git vendor/threejs
# modify .git/config
git config submodule."vendor/threejs".sparseCheckout true
git config submodule."vendor/threejs".shallow true
# modify .gitmodules
git config -f .gitmodules submodule."vendor/threejs".sparseCheckout true
git config -f .gitmodules submodule."vendor/threejs".shallow true
git submodule update --init --depth 1 vendor/threejs
cd vendor/threejs
# only include build, editor, examples, examples/jsm, examples/models from threejs
git sparse-checkout set --no-cone '/*' '!/*/' '/build/' '/editor/' '/examples/' '!/examples/*' '!/examples/*/' '/examples/jsm/' '/examples/models/'
```

The same setting is also applied to the submodule in the devcontainer through the [.devcontainer/co3js.sh](.devcontainer/co3js.sh) script and the `postCreateCommand` in the [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json) file.

[threejs]: https://github.com/mrdoob/three.js
