from services.main import MainService

class MainController(MainService):
    @classmethod
    def serve_template(cls, path=None):
        response = cls.serve_client()

        return response