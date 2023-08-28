from services.main import MainService

class MainController(MainService):
    @classmethod
    def serve_template(cls, path=None):
        response = cls.serve_page()

        return response
    
    @classmethod
    def serve_static(cls, path=None):
        response = cls.serve_bundle()

        return response