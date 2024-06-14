inc = '#include "variables.h"'


nouns = open('nouns.txt','r').read()
adj = open('adjectives.txt','r').read()
ffn = open('female-first-names.txt','r').read()
mfn = open('male-first-names.txt','r').read()
ln = open('last-names.txt','r').read()

def mkv(var_name, wordlist):
    var = 'std::vector<std::string>'
    
    vector = f'{var_name} = {{'

    w = wordlist.split()
    for i,n in enumerate(w):
        if i < len(w):
            vector += f'"{n}",'
        else:
            vector += f'"{n}"'

    vector += "};"

    var_cpp = f'{var} {vector}'

    return var_cpp

f = open('variables.cpp', 'w+')

var_source = f'{inc}\n\n{mkv("nouns",nouns)}\n{mkv("adjectives", adj)}\n{mkv("female_first_names",ffn)}\n{mkv("male_first_names",mfn)}\n{mkv("lastnames",ln)}'

f.write(var_source)
