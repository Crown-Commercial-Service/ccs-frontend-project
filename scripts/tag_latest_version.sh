#!/bin/sh
set -e
echo "≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡"
echo "TAGGING LATEST VERSION"
echo "--------------------------------------------------------------------------------"
git checkout master
git pull origin master
version=v$(jq -r ".version" package/package.json)
changelog="https://github.com/Crown-Commercial-Service/ccs-frontend-project/blob/main/CHANGELOG.md#"
echo Version:\ \ $version
echo "================================================================================"
{
  git tag -a $version -m "CCS Frontend release $version" -m "[Changelog]($changelog$version)" && echo "New tag created!"
} || {
  echo "Tagging failed, probably because the tag already exists."
}

echo "--------------------------------------------------------------------------------"
