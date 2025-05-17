from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_images():
    image1 = Image(
        url="https://www.huntsvillescoop.com/coffeemain.jpg",
        businessId=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    image2 = Image(
        url="https://m.media-amazon.com/images/I/71TF6e3w12L._AC_UF894,1000_QL80_.jpg",
        businessId=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    image3 = Image(
        url="https://assets1.storebrands.com/images/v/max_width_1440/sb/2023-07/walmart.jpg",
        businessId=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
        db.session.execute(text("ALTER SEQUENCE images_id_seq RESTART WITH 1"))

    db.session.commit()