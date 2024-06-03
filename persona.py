#!/usr/bin/env python3
import random
import string
import sys
import entropy

def male_firstname():
    f = open('male-first-names.txt', 'r')
    names= f.read().split()
    return random.choice(names).capitalize()
    
def female_firstname():
    f = open('female-first-name!.txt', 'r')
    names= f.read().split()
    return random.choice(names).capitalize()
    
def lastname():
    f= open('last-names.txt', 'r')
    names= f.read().split()
    return random.choice(names).capitalize()
    
    
def first_name(gender = None):
    if not gender and random.randint(0,1) > 0 or gender == 'm':
        return male_firstname()
    return female_firstname()
    
def email_address():
    emails = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'duck.com']
    
    n = random.randint(0,999)
    return f'{first_name()}.{lastname()}{n}@{random.choice(emails)}'.lower()
 
 
def username():
	noun = random.choice(open('nouns.txt', 'r').read().split()).capitalize()
	adjective = random.choice(open('adjectives.txt', 'r').read().split()).capitalize()
	num = random.choice([str(random.randint(0,9999)),''])
	return adjective+noun+num
	
	
def anon_email(user=None):
	user = password(8, False) if not user else user
	domains = ['sharklasers.com',
						'grr.la',
						'guerrillamail.info',
						'guerrillamail.biz',
						'guerrillamail.com',
						'guerrillamail.de',
						'guerrillamail.net',
						'guerrillamail.org',
						'guerrillamailblock.com',
						'pokemail.net',
						'spam4.me']
	return f'{user}@{random.choice(domains)}'
	
	
def password(length, symbols = True):
    pw = ''
    letters = string.ascii_letters+string.digits +  string.punctuation if symbols else string.ascii_letters+string.digits
    
    #symbols =
    pw = ''.join(random.choice(letters) for x in range(length))
    
    return pw
    
    
def persona():
    sex = random.choice('mf')
    name = f'{first_name(sex)} {lastname()}'
    print(f'Name: {name}')
    print(f'Gender: {sex.upper()}')
    print(f'Username: {username()}')
    print(f'Anon Email: {anon_email()}')
    pswd = password(random.randrange(10,32),False)
    print(f'Password : {pswd} (entropy: {entropy.entropy(pswd):.2f})')
    #print(f'Password: {password(18, False)}')
    num_str = 3
    print(f'\n{num_str} random strings:\n')
    for s in range(num_str):
    	pw = password(random.randint(12, 50), random.choice([0,1]))
    	print(f'(entropy: {entropy.entropy(pw):.2f} bits) {pw}')
    	
    
    
if __name__ == '__main__':
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    for x in range(n):
    	persona()
    	print('-'*20)
