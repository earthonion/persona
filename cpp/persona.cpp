#include <iostream>
#include "variables.h"
#include <random>
#include <ctime>


using namespace std;

string capitalize(const string& str, const locale& loc = locale()){
	if(str.empty()){
		return str;
	}

	string result = str;
	result[0] = toupper(result[0], loc);

	for (size_t i = 1;i< result.size(); ++i){
		result[i] = tolower(result[i], loc);
	}

	return result;
}

string rand_vector(const vector<string>& v, mt19937& rng){
	uniform_int_distribution<size_t> dist(0, v.size() - 1 );
	size_t randIndex = dist(rng);

	return v[randIndex];
}

size_t rand_binary(mt19937& rng){
	uniform_int_distribution<size_t> dist(0,1);
	size_t binary  = dist(rng);

	return binary;
}

string rand_str(const int& length, const bool& with_symbols = false){
	string alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	string symbols = "!@#$%^&*()_+{}[]|\\:;\"'<>,.?/~`";
	
	if(with_symbols){
		alphanumeric += symbols;
	}
	random_device rd;
	mt19937 generator(rd());
	uniform_int_distribution<> distribution(0, alphanumeric.size() - 1);
	
	string result = "";
	for(int i = 0; i < length; i++){
		result += alphanumeric[distribution(generator)];
	}

	return result;
}
int main(){

	mt19937 rng(time(0));
	string adj = rand_vector(adjectives, rng);
	string noun = rand_vector(nouns, rng);
	string mfname = rand_vector(male_first_names, rng);
	string ffname = rand_vector(female_first_names, rng);
	string lastname = rand_vector(lastnames, rng);

	vector<string> email_domains = {"grr.la","sharklasers.com",
		"guerrillamail.info", "guerrillamail.com", 
		"guerrillamail.biz", "guerrillamail.de", 
		"guerrillamail.net", "guerrillamail.org",
	"guerrillamailblock.com","pokemail.net", "spam4.me"};


	int gender = rand_binary(rng);
	string gender_char = "";
	locale loc;
	string fname = "";
	
	if(gender){
		fname = mfname;
		gender_char = "M";
	}
	else{
		fname = ffname;
		gender_char = "F";
	}


	cout << "First name: " + capitalize(fname, loc) << endl;
	cout << "Last name: " + capitalize(lastname, loc) << endl;
	cout << "Gender: " + gender_char << endl;
	cout << "Username: " + adj + noun << endl;
	cout << "Email: " + rand_str(10) + "@" + rand_vector(email_domains,rng) << endl;
	cout << "Password: " + rand_str(24, true)<< endl;
	
}
