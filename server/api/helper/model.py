class User():
    def __init__(self, account):
        self.userId = account[0]
        self.username = account[1]
        self.hashed_password = account[2]
        self.email = account[3]
        self.phone = account[4]
        self.type = account[5]
        self.joinedAt = account[6]

class Trip():
    def __init__(self, trip):
        self.driverId = trip[0]
        self.vehicleId = trip[1]
        self.tripId = trip[2]
        self.origin = trip[3]
        self.destination = trip[4]
        self.departTime = trip[5]
        self.price = trip[6]
        self.description = trip[7]