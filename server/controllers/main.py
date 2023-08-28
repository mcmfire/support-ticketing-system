from services.main import MainService

class MainController(MainService):
    @classmethod
    def serve_template(cls, path):
        response = cls.serve_page(path)

        return response