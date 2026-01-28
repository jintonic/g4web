#!/bin/bash
# shallow clone three.js (~370MB still...)
git submodule update --init --depth 1 vendor/threejs

# enable sparse-checkout mode in the submodule
git -C vendor/threejs sparse-checkout init --no-cone

# write patterns directly to the info file
cat <<EOF > .git/modules/vendor/threejs/info/sparse-checkout
/*
!/*/
/build/
/editor/
/examples/
!/examples/*
!/examples/*/
/examples/jsm/
/examples/models/
EOF

# apply the changes (HEAD refers to the only commit obtained through shallow clone)
git -C vendor/threejs read-tree -mu HEAD
