from app.models import db, User, Business, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Add businesses 
def seed_businesses():
    biz1 = Business(
        owner_id=1,
        name="Sakura Sushi",
        address="123 Main St",
        city="Boston",
        state="MA",
        zipcode="12345",
        category="restaurant",
        lat=43.987,
        lng=54.344,
        price_range=2,
        created_at=datetime.utcnow()
    )

    biz2 = Business(
        owner_id=1,
        name="Urban Coffee",
        address="456 Ocean St",
        city="Florida",
        state="FL",
        zipcode="12345",
        category="takeout",
        lat=43.987,
        lng=54.344,
        price_range=1,
        created_at=datetime.utcnow()
    )
    biz3 = Business(
        owner_id=2,
        name="Sakura Sushi",
        address="645 Main St",
        city="Austin",
        state="MA",
        zipcode="12345",
        type="restaurant",
        lat=43.987,
        lng=54.344,
        price_range=3,
        created_at=datetime.utcnow()
    )

    db.session.add(biz1)
    db.session.add(biz2)
    db.session.add(biz3)
    db.session.commit()
    

def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))
        db.session.execute(text("ALTER SEQUENCE businesses_id_seq RESTART WITH 1"))

    db.session.commit()