from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_images():
    image1 = Image(
        url="https://www.huntsvillescoop.com/restaurants/img/japanesemain.jpg",
        business_id=1,
        is_featured=True,
        is_preview=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    image2 = Image(
        url="https://images.squarespace-cdn.com/content/v1/610b39f564052c4ac78f3f1d/77c2397f-84da-4503-8c83-a5035424cfa0/DSC06010.jpg",
        business_id=1,
        is_featured=False,
        is_preview=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    image3 = Image(
        url="https://esquirescoffee.co.uk/wp-content/uploads/2021/05/nafinia-putra-Kwdp-0pok-I-unsplash-1.jpg",
        business_id=2,
        is_featured=True,
        is_preview=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    image4 = Image(
        url="https://www.englishclasses.com/wp-content/uploads/2024/11/Cup-Of-Creamy-Coffee.png",
        business_id=2,
        is_featured=False,
        is_preview=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
        db.session.execute(text("ALTER SEQUENCE images_id_seq RESTART WITH 1"))

    db.session.commit()