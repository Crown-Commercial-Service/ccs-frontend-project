#!/bin/sh
set -e

source ./bin/generate-npm-tag.sh

# Check npm tag looks as expected
# https://npm.github.io/publishing-pkgs-docs/updating/using-tags.html#publishing-with-tags
echo "This will create the following tag:"
echo $NPM_TAG
echo " "

read -r -p "Does this look correct? [y/N] " continue_prompt

echo "Starting a release..."
echo " "
echo "This will:"
echo "- check that there is not already a Github tag published"
echo "- create a new Github tag"
echo "- push the Github tag to remote origin"
echo "- create a zip file of the 'dist/' directory locally"
echo " "

read -r -p "Do you want to continue? [y/N] " continue_prompt

if [[ $continue_prompt != 'y' ]]; then
    echo "Cancelling release, if this was a mistake, try again and use 'y' to continue."
    exit 0
fi

# Extract tag version from ./packages/ccs-frontend/package.json
ALL_PACKAGE_VERSION=$(npm run version --silent --workspace ccs-frontend)
TAG="v$ALL_PACKAGE_VERSION"

if [ $(git tag -l "$TAG") ]; then
    echo "⚠️ Tag $TAG already exists"
    exit 1
else
    echo "🗒 Tagging repo using tag version: $TAG ..."
    git tag $TAG -m "CCS Frontend release $TAG"
    git push --tags
    echo "🗒 Tag $TAG created and pushed to remote."

    echo "🗒 Creating a release artifact..."
    git archive -o ./release-$TAG.zip HEAD:dist
    echo "🗒 Artifact created. Now create a release on GitHub and attach this."
fi
