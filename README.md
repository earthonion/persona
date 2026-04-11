# persona
An identity generator for making anon accounts online


## example output:

```
Name: Marc Calvino
Gender: M
Username: StraightSpectator
Anon Email: TJqruYEq@guerrillamailblock.com
Password : ZYkrL6P9GDDs (entropy: 71.45)

3 random strings:

(entropy: 256.03 bits) MHpJjBPmQuMa9XghQoNnvftwT4T4wZghDBpDRmh3uTl
(entropy: 95.27 bits) 31vEC9MRXiKrrGhT
(entropy: 226.26 bits) N6c8xqw33cZnmT1krQgL6HU7VbP5BimUZPSQVK
--------------------
```

## usage:
```
git clone https://github.com/earthonion/persona/
cd persona
chmod +x install.sh
sudo bash install.sh
```
then to generate 10 identities type: 

```
persona 10
```

for anon email go to https://guerrillamail.com and change the inbox ID to the one given in the output. eg. "TJqruYEq" from the example

*protip: check out https://quackr.io/ for anon phone numbers (like guerrilla mail)*

## C++ version:

the c++ version is faster. one-liner install:

```
git clone https://github.com/earthonion/persona/
cd persona/cpp
./install.sh
```

this builds it and installs `persona` to `/usr/bin/` with wordlists in `/usr/share/persona/`. then just run:

```
persona
```

to build without installing (runs from the source tree):

```
cd persona/cpp
./build.sh
./persona
```

## todo:

- use secrets for password generation
- organize code more

### note:

name files and nouns and adjective files were found on GitHub. ill have to remember which and give them credit. 
