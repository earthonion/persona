#!/bin/bash
set -e
cd "$(dirname "$0")"

# Populate local data dir from python/ wordlists so `./persona` works in-tree.
mkdir -p data
cp ../python/nouns.txt            data/nouns.txt
cp ../python/adjectives.txt       data/adjectives.txt
cp ../python/female-first-names.txt data/female_first_names.txt
cp ../python/male-first-names.txt   data/male_first_names.txt
cp ../python/last-names.txt       data/lastnames.txt

g++ -O2 -o persona persona.cpp variables.cpp
echo "Built ./persona — run it from this directory, or use install.sh to install system-wide."
