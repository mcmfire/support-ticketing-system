from utils.extensions import socketio

def init_socket():
    @socketio.on('connect')
    def client_connect():
        print('[SERVER]: ', 'Client connected.')

    @socketio.on('disconnect')
    def client_disconnect():
        print('[SERVER]: ', 'Client disconnected.')

    @socketio.on('message')
    def client_message(message):
        print('[CLIENT]: ', message)

    @socketio.on('connect_error')
    def client_disconnect():
        print('[SERVER]: ', 'Cannot establish connect to the client.')