from flask import send_from_directory
import re
def serve_client(app):
    @app.route('/', defaults={"path": ""})
    @app.route('/<path:path>')
    def serve_routes(path):
        bundle_pattern = r".*\.bundle.js"

        if re.match(bundle_pattern, path):
            return send_from_directory('../client/dist', path)
        
        return send_from_directory('../client/dist', 'index.html')