Geant4 Web UI

## For Developers

[threejs] is included as a submodule in the `vendor/threejs` directory. This is preferred over manually adding [threejs] files to the repository, because it allows us to keep the repository size small. The following commands were used to initialize the submodule:

```bash
# shallow clone three.js (~370MB still...) into .git/modules/vendor/threejs
# a working copy is created in vendor/threejs
# .gitmodules is created to record the url and working copy path of the submodule
git submodule add --depth 1 https://github.com/mrdoob/three.js.git vendor/threejs
# copy settings in .gitmodules to .git/config
git submodule init
# set sparse checkout and shallow clone in .git/config
git config submodule."vendor/threejs".sparseCheckout true 
git config submodule."vendor/threejs".shallow true
# switch to tag r182
cd vendor/threejs
git fetch origin refs/tags/r182:refs/tags/r182 --depth 1
git checkout r182
# only include build, editor, examples, examples/jsm, examples/models from threejs
git sparse-checkout set --no-cone '/*' '!/*/' '/build/' '/editor/' '/examples/' '!/examples/*' '!/examples/*/' '/examples/jsm/' '/examples/models/'
```

The same setting is also applied to the submodule in the devcontainer through the [.devcontainer/co3js.sh](.devcontainer/co3js.sh) script and the `postCreateCommand` in the [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json) file.

[threejs]: https://github.com/mrdoob/three.js
