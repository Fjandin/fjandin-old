#!/bin/bash

cd "$(dirname "$0")"
cd ../src

dirlist=$(find . -mindepth 1 -maxdepth 1 -type d)

for dir in $dirlist
do
    ( cd $dir; npm run 2npm )
    sleep 1
done
