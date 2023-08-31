from services.panel import PanelService

class PanelController(PanelService):
    def __init__(self):
        super().__init__()

    def open_panel(self):
        response = self.load_panel()

        return response