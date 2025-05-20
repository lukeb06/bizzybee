from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_images():
    image1 = Image(
        url="https://www.huntsvillescoop.com/restaurants/img/japanesemain.jpg",
        businessId=1,
        is_featured=True,
        is_preview=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    image2 = Image(
<<<<<<< Updated upstream
        url="https://m.media-amazon.com/images/I/71TF6e3w12L._AC_UF894,1000_QL80_.jpg",
        businessId=2,
=======
        url="https://images.squarespace-cdn.com/content/v1/610b39f564052c4ac78f3f1d/77c2397f-84da-4503-8c83-a5035424cfa0/DSC06010.jpg",
        businessId=1,
        is_featured=False,
        is_preview=True,
>>>>>>> Stashed changes
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    image3 = Image(
<<<<<<< Updated upstream
        url="https://assets1.storebrands.com/images/v/max_width_1440/sb/2023-07/walmart.jpg",
        businessId=2,
=======
        url="https://esquirescoffee.co.uk/wp-content/uploads/2021/05/nafinia-putra-Kwdp-0pok-I-unsplash-1.jpg",
        businessId=2,
        is_featured=True,
        is_preview=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    image4 = Image(
        url="https://www.englishclasses.com/wp-content/uploads/2024/11/Cup-Of-Creamy-Coffee.png",
        businessId=2,
        is_featured=False,
        is_preview=True,
>>>>>>> Stashed changes
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