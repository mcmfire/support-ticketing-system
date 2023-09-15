from flask import session, request
from flask_socketio import emit, join_room, leave_room
from utils.extensions import socketio

def init_socket():
    usernames = {}

    @socketio.on('connect')
    def client_connect():
        print('[SERVER]: ', 'Client connected.')

    @socketio.on('disconnect')
    def client_disconnect():
        emit('room_members', 'admin_room', broadcast=True)

    @socketio.on('join_room')
    def client_join(room):
        if 'user' in session:
            user_id = session['user']['_id']
            name = session['user']['first_name'] + " " + session['user']['last_name']
            join_room(room)
            usernames[request.sid] = {"user_id": user_id, "name": name}
    
    @socketio.on('leave_room')
    def client_leave(room):
        if request.sid in usernames:
            leave_room(room)
            usernames.pop(request.sid)
    
    @socketio.on('room_members')
    def room_members(room):
        members = socketio.server.manager.get_participants(room=room, namespace='/')
        emit('room_members', [usernames[member[0]] for member in members], broadcast=True)

    @socketio.on('task')
    def client_task(task):
        emit('task', task, broadcast=True)

    @socketio.on('connect_error')
    def client_disconnect():
        print('[SERVER]: ', 'Cannot establish connect to the client.')