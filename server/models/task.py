from datetime import datetime

class Task:
    def __init__(self, username, reporter, position, department, contact, title, description):
        self.username = username
        self.reporter = reporter
        self.department = department
        self.position = position
        self.contact = contact
        self.title = title
        self.description = description
        self.date_created = datetime.utcnow().strftime("%B %d, %Y | %I:%M%p")
        self.upvotes = 0
        self.is_responded = False
        