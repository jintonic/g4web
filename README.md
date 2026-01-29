Geant4 Web UI

## For Developers

[threejs][] is included as a submodule in the `vendor/threejs` directory to avoid manually adding 10s of MB files in [threejs][]`/{editor,build,examples}` folders to this repository. The following commands were used to initialize the submodule:

```bash
# 1. shallow clone three.js (~370MB still...) into .git/modules/vendor/threejs
# a working copy is created in vendor/threejs
# .gitmodules is created to record the url and working copy path of the submodule
git submodule add --depth 1 https://github.com/mrdoob/three.js.git vendor/threejs
# 2. populate vendor/threejs
# --init: copy settings in .gitmodules (shared) to .git/config (local)
git submodule update --init
# 3. set sparse checkout and shallow clone in .git/config
git config submodule."vendor/threejs".sparseCheckout true
git config submodule."vendor/threejs".shallow true
# only include things needed by editor
cd vendor/threejs
git sparse-checkout set --no-cone '/*' '!/*/' '/build/' '/editor/' '/examples/' '!/examples/*' '!/examples/*/' '/examples/jsm/' '/examples/models/' '!/examples/models/*/' '/examples/models/ldraw/'
```

The stable release of [threejs][] is the tip of its `master` branch, which is buried deep by new commits in the `dev` branch, and cannot be reached by a shallow clone. If we replace `--depth 1` with `-b master`, we will be forced to download the entire history of [threejs][] (> 1GB). `--depth 1` shallow clones the tip of the `dev` branch, which may not be stable. We just hope that the [editor][] part is stable enough.

To populate `vendor/threejs` in a newly cloned repository in another machine, skip step 1 and change step 2 to:

```bash
# --recommend-shallow: fetch only the history needed to reach the recorded commit
git submodule update --init --recommend-shallow
```

The rest steps are the same.

The same setting is also applied to the submodule in the devcontainer through the [.devcontainer/co3js.sh](.devcontainer/co3js.sh) script and the `postCreateCommand` in the [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json) file.

[threejs]: https://github.com/mrdoob/three.js
[editor]: https://github.com/mrdoob/three.js/tree/dev/editor