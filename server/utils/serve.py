from flask import send_from_directory

def serve_client(app):
    @app.route('/', defaults={"path": ""})
    @app.route('/<path:path>')
    def serve_routes(path):
        if path == 'bundle.js':
            return send_from_directory('../client/dist', 'bundle.js')
        
        return send_from_directory('../client/dist', 'index.html')