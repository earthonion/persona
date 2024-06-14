#!/bin/bash
cp persona.py /usr/bin/persona
mkdir -p /usr/share/persona
cp adjectives.txt /usr/share/persona
cp male-first-names.txt /usr/share/persona
cp entropy.py /usr/bin/entropy.py
cp last-names.txt /usr/share/persona
cp nouns.txt /usr/share/persona
cp female-first-names.txt /usr/share/persona
chmod +x /usr/bin/persona
echo "Installation complete. You can now run 'persona' from the terminal."

