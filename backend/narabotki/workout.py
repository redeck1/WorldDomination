import json
# \
# state = """
# {
# "users": [{
#     "name": "Russia",
#     "bombs": 8,
#     "money": 1500,
#     "cities": [
#         {"name": "R_City1",
#         "IsAlive": true,
#         "Shield": true},
#         {"name": "R_City2",
#         "IsAlive": true,
#         "Shield": false},
#         {"name": "R_City3",
#         "IsAlive": true,
#         "Shield": false}]
# },{ "name": "USA",
#     "bombs": 16,
#     "money": 500,
#     "cities": [
#         {"name": "U_City1",
#         "IsAlive": true,
#         "Shield": true},
#         {"name": "U_City2",
#         "IsAlive": false,
#         "Shield": false},
#         {"name": "U_City3",
#         "IsAlive": true,
#         "Shield": true}]
# },{ "name": "Turkey",
#     "bombs": 2,
#     "money": 100,
#     "cities": [
#         {"name": "T_City1",
#         "IsAlive": false,
#         "Shield": false},
#         {"name": "T_City2",
#         "IsAlive": true,
#         "Shield": false},
#         {"name": "T_City3",
#         "IsAlive": true,
#         "Shield": true}]
# }],
# "ecology" : 80
# }"""


user = input('Выберите страну (Russia, USA, Turkey): ')

with open('state.json') as state:
    data = json.load(state)

print(data)

def ShowAll():
    print(data)

def ReturnRussia(data):
    print(data['users'][0]['name'])
    print('Бомбы: ' + str(data['users'][0]['bombs']))
    print('Бюджет: ' + str(data['users'][0]['money']))
    print('Экология: ' + str(data['ecology']))
    for item in data['users'][0]['cities']:
        nam = item['name']
        shi = item['Shield']
        if item["IsAlive"] == True:
            print(f'   {nam} Щит: {shi}')
        else: 
            print(f'   {nam} уничтожен')
    
    for country in data['users']:
        if country['name'] != 'Russia':
            cont = country['name']
            print(f'{cont}: ')
            for item2 in country['cities']:
                nam2 = item2['name']
                shi2 = item2['Shield']
                if item2["IsAlive"] == True:
                    print(f'   {nam2} Щит: {shi2}')
                else: print(f'   {nam2} уничтожен')

def ReturnUSA(data):
    print(data['users'][1]['name'])
    print('Бомбы: ' + str(data['users'][1]['bombs']))
    print('Бюджет: ' + str(data['users'][1]['money']))
    print('Экология: ' + str(data['ecology']))
    for item in data['users'][1]['cities']:
        nam = item['name']
        shi = item['Shield']
        if item["IsAlive"] == True:
            print(f'   {nam} Щит: {shi}')
        else: 
            print(f'   {nam} уничтожен')

    for country in data['users']:
        if country['name'] != 'USA':
            cont = country['name']
            print(f'{cont}: ')
            for item2 in country['cities']:
                nam2 = item2['name']
                shi2 = item2['Shield']
                if item2["IsAlive"] == True:
                    print(f'   {nam2} Щит: {shi2}')
                else: print(f'   {nam2} уничтожен')

def ReturnTurkey(data):
    print(data['users'][2]['name'])
    print('Бомбы: ' + str(data['users'][2]['bombs']))
    print('Бюджет: ' + str(data['users'][2]['money']))
    print('Экология: ' + str(data['ecology']))
    for item in data['users'][2]['cities']:
        nam = item['name']
        shi = item['Shield']
        if item["IsAlive"] == True:
            print(f'   {nam} Щит: {shi}')
        else: 
            print(f'   {nam} уничтожен')
    
    for country in data['users']:
        if country['name'] != 'Turkey':
            cont = country['name']
            print(f'{cont}: ')
            for item2 in country['cities']:
                nam2 = item2['name']
                shi2 = item2['Shield']
                if item2["IsAlive"] == True:
                    print(f'   {nam2} Щит: {shi2}')
                else: print(f'   {nam2} уничтожен')

def Post(user):
    data2 = {}
    data2['name'] = user
    data2['pay_money'] = 0
    data2['shields'] = []
    print(data2)
    key = 0
    mon = 0
    while key == 0:
        resp = input('Что ты хочешь натворить?\nУлучшить экологию (200$ "eco")\nПоставить щит на город (300$ "shield")\nКинуть бомбу (1 бомба "bomb")\nЗавершить ход ("end")\n')
        match resp:
            case 'end': key+=1
            case 'eco':
                i = 0
                while True:
                    if data['users'][i]['name'] == user:
                        mon = data['users'][i]['money']
                        break
                    i += 1
                if mon >= 200 + data2['pay_money']:
                    data2['pay_money'] += 200
                    data2['ecology'] = 10
                    print(data2)        
            case 'shield':
                city = input('Введите название своего города: ')
                if user == 'Russia':
                    mon = data['users'][0]['money']
                    if city != 'R_City1' and city != 'R_City2' and city != 'R_City3':
                        print('ГОРОД НЕ НАЙДЕН')
                    else: 
                        if mon>= data2['pay_money'] + 300 and city not in data2['shields']:
                            data2['shields'].append(city)
                            data2['pay_money'] += 300
                            print(data2)
                        else: print('Недостаточно денег либо на этот город уже поставили щит')
                elif user == 'USA':
                    mon = data['users'][1]['money']
                    if city != 'U_City1' and city != 'U_City2' and city != 'U_City3':
                        print('ГОРОД НЕ НАЙДЕН')
                    else: 
                        if mon>= data2['pay_money'] + 300 and city not in data2['shields']:
                            data2['shields'].append(city)
                            data2['pay_money'] += 300
                            print(data2)
                        else: print('Недостаточно денег либо на этот город уже поставили щит')
                elif user == 'Turkey':
                    mon = data['users'][2]['money']
                    if city != 'T_City1' and city != 'T_City2' and city != 'T_City3':
                        print('ГОРОД НЕ НАЙДЕН')
                    else: 
                        if mon>= data2['pay_money'] + 300 and city not in data2['shields']:
                            data2['shields'].append(city)
                            data2['pay_money'] += 300
                            print(data2)
                        else: print('Недостаточно денег либо на этот город уже поставили щит')
    return data2

match user:
    case 'Russia': print(ReturnRussia(data))
    case 'USA': print(ReturnUSA(data))
    case 'Turkey': print(ReturnTurkey(data))
    case _: print('User не распознан')



data2 = Post(user)



with open('state2.json', 'w') as f2:
    json.dump(data2, f2, indent=3)
