#!/bin/bash
set -e
cd "$(dirname "$0")"

if ! command -v g++ >/dev/null 2>&1; then
    echo "Error: g++ not found. Install with: sudo apt install g++"
    exit 1
fi

BINDIR="/usr/bin"
DATADIR="/usr/share/persona"

SUDO=""
if [ "$(id -u)" -ne 0 ]; then
    SUDO="sudo"
fi

echo "Building persona..."
g++ -O2 -o persona persona.cpp variables.cpp

echo "Installing to $BINDIR and $DATADIR..."
$SUDO install -d "$DATADIR"
$SUDO install -m 0644 ../python/nouns.txt              "$DATADIR/nouns.txt"
$SUDO install -m 0644 ../python/adjectives.txt         "$DATADIR/adjectives.txt"
$SUDO install -m 0644 ../python/female-first-names.txt "$DATADIR/female_first_names.txt"
$SUDO install -m 0644 ../python/male-first-names.txt   "$DATADIR/male_first_names.txt"
$SUDO install -m 0644 ../python/last-names.txt         "$DATADIR/lastnames.txt"
$SUDO install -m 0755 persona "$BINDIR/persona"

echo "Installed. Run: persona"
