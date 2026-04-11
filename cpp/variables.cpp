#include "variables.h"
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <string>
#include <sys/stat.h>
#include <unistd.h>
#include <limits.h>
#include <libgen.h>

std::vector<std::string> female_first_names;
std::vector<std::string> male_first_names;
std::vector<std::string> adjectives;
std::vector<std::string> nouns;
std::vector<std::string> lastnames;

static std::string exe_dir() {
    char buf[PATH_MAX];
    ssize_t n = readlink("/proc/self/exe", buf, sizeof(buf) - 1);
    if (n <= 0) return ".";
    buf[n] = '\0';
    return std::string(dirname(buf));
}

static bool dir_has_data(const std::string& dir) {
    struct stat st;
    return stat((dir + "/nouns.txt").c_str(), &st) == 0;
}

static std::string find_data_dir() {
    if (const char* env = std::getenv("PERSONA_DATA")) {
        if (dir_has_data(env)) return env;
    }
    std::string candidates[] = {
        exe_dir() + "/data",
        "/usr/local/share/persona",
        "/usr/share/persona",
    };
    for (const auto& c : candidates) {
        if (dir_has_data(c)) return c;
    }
    return "";
}

static std::vector<std::string> load_words(const std::string& path) {
    std::vector<std::string> out;
    std::ifstream f(path);
    std::string word;
    while (f >> word) out.push_back(word);
    return out;
}

struct VarsInit {
    VarsInit() {
        std::string dir = find_data_dir();
        if (dir.empty()) {
            std::cerr << "persona: wordlist data not found. "
                         "Install to /usr/share/persona/ or set PERSONA_DATA.\n";
            std::exit(1);
        }
        std::string base = dir + "/";
        nouns              = load_words(base + "nouns.txt");
        adjectives         = load_words(base + "adjectives.txt");
        female_first_names = load_words(base + "female_first_names.txt");
        male_first_names   = load_words(base + "male_first_names.txt");
        lastnames          = load_words(base + "lastnames.txt");
        if (nouns.empty() || adjectives.empty() || female_first_names.empty()
            || male_first_names.empty() || lastnames.empty()) {
            std::cerr << "persona: wordlist data in " << dir << " is incomplete.\n";
            std::exit(1);
        }
    }
} _vars_init;
