import json


with open('all_state_round1.json', 'r', encoding='utf-8') as file:
    all_state = json.load(file)
    file.close()




with open('Russia_state_changes.json', 'r', encoding='utf-8') as file:
    Russia_changes = json.load(file)
    file.close()

with open('USA_state_changes.json', 'r', encoding='utf-8') as file:
    USA_changes = json.load(file)
    file.close()

with open('North_Korea_state_changes.json', 'r', encoding='utf-8') as file:
    North_Korea_changes = json.load(file)
    file.close()

with open('Iraq_state_changes.json', 'r', encoding='utf-8') as file:
    Iraq_changes = json.load(file)
    file.close()

with open('China_state_changes.json', 'r', encoding='utf-8') as file:
    China_changes = json.load(file)
    file.close()

with open('Greece_state_changes.json', 'r', encoding='utf-8') as file:
    Greece_changes = json.load(file)
    file.close()

with open('France_state_changes.json', 'r', encoding='utf-8') as file:
    France_changes = json.load(file)
    file.close()

with open('Germany_state_changes.json', 'r', encoding='utf-8') as file:
    Germany_changes = json.load(file)
    file.close()

print(Russia_changes)