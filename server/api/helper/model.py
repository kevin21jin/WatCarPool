class User():
    def __init__(self, userId, username, password, email, phone, type, joined_at):
        self.userId = userId
        self.username = username
        self.hashed_password = password
        self.email = email
        self.phone = phone
        self.type = type
        self.joined_at = joined_at
