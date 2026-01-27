# specify only major version of node to allow for minor and patch updates
FROM mcr.microsoft.com/devcontainers/javascript-node:24

# Set the working directory inside the container
WORKDIR /workspace

# 3. Optimize for Monorepos: 
# Ensure the 'node' user has permissions to the workspace.
# This avoids "Permission Denied" errors when running 'npm install' or 'git' commands.
RUN chown -R node:node /workspace

# 4. [Optional] System-level dependencies:
# If your Geant4 logic ever needs to call C++ tools or specific 
# compression libraries, you would add them here.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends \
#     build-essential \
#     libglu1-mesa

# 5. Persistent Shell History:
# Keeps your terminal command history even if you rebuild the container.
ARG USERNAME=node
RUN mkdir -p /home/$USERNAME/.vscode-server/extensions \
    /home/$USERNAME/.history \
    && chown -R $USERNAME /home/$USERNAME/.vscode-server /home/$USERNAME/.history

# Use the 'node' user instead of 'root' for better security/compatibility
USER node