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

List = [USA_changes, Russia_changes, North_Korea_changes, Iraq_changes, China_changes, Greece_changes, France_changes, Germany_changes]



def money_change(country):
    country_name = country['name2']
    country_money = country['spent_money']
    all_state['countries'][country_name]['balance'] -= country_money

def ecology_change(country):
    country_ecocnange = country['ecologylvl']
    all_state['ecologylvl'] += country_ecocnange

def nuclear_tech_change(country):
    country_name = country['name2']
    country_nuclear_tech = country['nuclear_tech_develop']
    match country_nuclear_tech:
        case 1:
            if all_state['countries'][country_name]['isHaveNuclearTech'] == False:
                all_state['countries'][country_name]['isHaveNuclearTech'] = True
        case 0: sosi = 'soso'

def bombs_change(country):
    country_name = country['name2']
    country_bombs = country['created_bombs']
    all_state['countries'][country_name]['bombs'] += country_bombs

def transfer_change(country):
    country_name = country['name2']
    country_transfer = list(country['money_transfer'].keys())
    for i in country_transfer:
        country_money_transfer = country['money_transfer'][i]
        all_state['countries'][i]['balance'] += country_money_transfer

def sanctions_change(country):
    country_name = country['name2']
    country_sanctions = country['sanctions']
    for lox in country_sanctions:
        all_state['countries'][lox]['sanctionsFrom'].append(country_name)
    
    
#all_state['countries'][country_name]['balance'] -= len(all_state['countries'][country_name]['sanctionsFrom'])*20

def develop_change(country):
    country_name = country['name2']
    city_list = list(country['cities'].keys())
    for city in city_list:
        if country['cities'][city]['city_develop'] == 1:
            all_state['countries'][country_name]['cities'][city]['growth'] += 10
        all_state['countries'][country_name]['cities'][city]['liveLVL'] = (all_state['ecologylvl']/100) * all_state['countries'][country_name]['cities'][city]['growth']


for country in List:
    money_change(country)
    ecology_change(country)
    nuclear_tech_change(country)
    bombs_change(country)
    transfer_change(country)
    sanctions_change(country)
    develop_change(country)


print(all_state)