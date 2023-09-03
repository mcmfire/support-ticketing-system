from utils.extensions import socketio

def init_socket():
    @socketio.on('connect')
    def client_connect():
        socketio.emit('message', 'Client connected.')
        print('Client connected.')

    @socketio.on('disconnect')
    def client_disconnect():
        socketio.emit('message', 'Client disconnected.')
        print('Client disconnected.')