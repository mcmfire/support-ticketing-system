from datetime import datetime

class Task:
    def __init__(self, reporter, department, contact, title, description):
        self.reporter = reporter
        self.department = department
        self.position = ""
        self.contact = contact
        self.title = title
        self.description = description
        self.date_created = datetime.utcnow().strftime("%B %d, %Y | %I:%M%p")
        self.upvotes = 0
        self.is_responded = False
        