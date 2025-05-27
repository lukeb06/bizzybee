from app.models import db, Business, environment, SCHEMA
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
        country="USA",
        description="We offer variety of freshly made sushi, hibachi lunch and dinner, bento box, teriyaki, yakitori, noodles, cocktails, sake, beer, wine, and more conveniently. free parking for dinner.",
        lat=43.987,
        lng=54.344,
        price_range=2,
        created_at=datetime.utcnow(),
    )

    biz2 = Business(
        owner_id=2,
        name="Urban Coffee",
        address="456 Ocean St",
        city="Florida",
        state="FL",
        zipcode="12345",
        category="takeout",
        country="USA",
        description="Cafe serving premium organic brewed coffee (e.g., mushroom coffee), espresso and tea. Breakfast and lunch sandwiches served daily. Friendly staff providing superior customer service.",
        lat=43.987,
        lng=54.344,
        price_range=1,
        created_at=datetime.utcnow(),
    )
    biz3 = Business(
        owner_id=2,
        name="Hot Chicken",
        address="645 Main St",
        city="Austin",
        state="MA",
        zipcode="12345",
        category="delivery",
        country="USA",
        description="Hot Chix Boston is a Nashville Style Hot Chicken restaurant located in the heart of Inman Square. Our small team of restaurant people is dedicated to serving the most delicious and hottest fried chicken that we can respectfully make.",
        lat=43.987,
        lng=54.344,
        price_range=3,
        created_at=datetime.utcnow(),
    )

    db.session.add(biz1)
    db.session.add(biz2)
    db.session.add(biz3)
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM businesses"))
        db.session.execute(text("ALTER SEQUENCE businesses_id_seq RESTART WITH 1"))

    db.session.commit()
