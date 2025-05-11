from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1 = Review(
        userId=1,
        businessId=2,
        review="Great cutomer serivce with breathtaking scenic views",
        stars=5,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    review2 = Review(
        userId=2,
        businessId=1,
        review="Honestly, worst place to go with your family",
        stars=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add_all([review1,review2])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART INDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE from reviews"))
    db.session.commit()

    
