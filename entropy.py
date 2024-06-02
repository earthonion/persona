import math

def entropy(password):
    # Define possible characters in each character set
    lowercase = set('abcdefghijklmnopqrstuvwxyz')
    uppercase = set('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    digits = set('0123456789')
    # Define a broad set of special characters (commonly used ones)
    special_characters = set('`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?')
    
    # Determine the character sets used in the password
    sets_used = 0
    if any(char in lowercase for char in password):
        sets_used += 26  # Add the number of lowercase characters
    if any(char in uppercase for char in password):
        sets_used += 26  # Add the number of uppercase characters
    if any(char in digits for char in password):
        sets_used += 10  # Add the number of digits
    if any(char in special_characters for char in password):
        sets_used += len(special_characters)  # Add the number of special characters

    # Calculate entropy
    L = len(password)
    N = sets_used
    if N == 0:  # To handle the case where the password might be empty or uses no known characters
        return 0
    e = L * math.log2(N)
    
    return e

