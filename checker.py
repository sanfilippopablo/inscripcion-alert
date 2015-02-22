import sysacad_api, socket, time

base_url = 'http://www.alumnos.frro.utn.edu.ar/'
s = sysacad_api.SysacadSession(base_url)
s.login('40261', '')

client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
client.connect('alert.sock')

# Read errorpage
with open('errorpage.html', 'r') as the_file:
    errorpage = the_file.read().decode('utf-8')

while True:
    # Get actual HTML
    response_text = s.session.get(base_url + 'materiasCursado.asp?refrescar').text

    if response_text != errorpage:
        client.send('cambios')
        exit()
    else:
        client.send('sin-cambios')

    time.sleep(5)
