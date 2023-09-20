from flask import session, request
from flask_socketio import emit, join_room, leave_room
from utils.extensions import socketio

def init_socket():
    users = {}

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
            username = session['user']['username']
            name = session['user']['first_name'] + " " + session['user']['last_name']
            join_room(room)
            users[request.sid] = {"user_id": user_id, "username": username, "name": name}
    
    @socketio.on('leave_room')
    def client_leave(room):
        if request.sid in users:
            leave_room(room)
            users.pop(request.sid)
    
    @socketio.on('room_members')
    def room_members(room):
        members = socketio.server.manager.get_participants(room=room, namespace='/')
        emit('room_members', [users[member[0]] for member in members], broadcast=True)

    @socketio.on('add_task')
    def client_task(task):
        emit('add_task', task, broadcast=True)

    @socketio.on('connect_error')
    def client_disconnect():
        print('[SERVER]: ', 'Cannot establish connect to the client.')