import requests

apiKey = {'apiKey': 'SAMPLE-KEY'}
authUrl = 'https://SAMPLESITE.chorus-mk.thirdlight.com/rest/v1/auth/loginWithKey'
sessionId = ''
r = requests.post(authUrl, json=apiKey)
data = r.json()
sessionId = data['sessionId']


# get folder 

r = requests.get('https://SAMPLESITE.chorus-mk.thirdlight.com/rest/v1/folders/SAMPLE-GUID', headers={'X-Chorus-Session': sessionId})

print(r.json())