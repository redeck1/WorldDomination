import json


with open('all_state_round1.json', 'r', encoding='utf-8') as file:
    all_state = json.load(file)
    file.close()

print(all_state)