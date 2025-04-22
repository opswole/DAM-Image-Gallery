from flask import Flask, render_template, flash
import requests

app = Flask(__name__)
app.secret_key = b'SECRET-KEY'

apiKey = {'apiKey' : 'SAMPLE-KEY'}
authUrl = 'https://SAMPLESITE.chorus-mk.thirdlight.com/rest/v1/auth/loginWithKey'
r = requests.post(authUrl, json = apiKey)
data = r.json()
sessionId = data['sessionId']

@app.route('/')
def index():
    r = requests.get('https://SAMPLESITE.chorus-mk.thirdlight.com/rest/v1/folders/aaaaaaaa-1111-1111-aaaa-aaaaaaaaaaaa', headers={'X-Chorus-Session': sessionId})
    flash(r.status_code)
    return render_template('index.html', data = r.json())

@app.route('/folder/<folder>')
def folder(folder):
    r = requests.get('https://SAMPLESITE.chorus-mk.thirdlight.com/rest/v1/folders/{0}/files'.format(folder), headers={'X-Chorus-Session': sessionId})
    flash(r.status_code)
    return render_template('folder.html', folder = folder, data = r.json())

@app.route('/file/<file>')
def file(file):
    r = requests.get('https://SAMPLESITE.chorus-mk.thirdlight.com/rest/v1/files/{0}'.format(file), headers={'X-Chorus-Session': sessionId})
    flash(r.status_code)
    return render_template('file.html', file = file, data = r.json())

if __name__ == '__main__':
    app.run(debug=True)