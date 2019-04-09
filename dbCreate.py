from server import *
from models import *

with app.app_context():
    db.create_all()
