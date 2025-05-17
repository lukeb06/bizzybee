from .db import db, environment, SCHEMA
from datetime import datetime


class Business(db.Model):
    __tablename__ = "businesses"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    country = db.Column(db.String(50))
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500))
    type = db.Column(db.String(50), nullable=False)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)
    price_range = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # Relationship
    user = db.relationship("User", back_populates="businesses", uselist=False)
    reviews = db.relationship("Review", back_populates="businesses", uselist=True)
    images = db.relationship("Image", back_populates="businesses")

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "country": self.country,
            "address": self.address,
            "city": self.city,
            "type": self.type,
            "state": self.state,
            "zipcode": self.zipcode,
            "name": self.name,
            "description": self.description,
            "lat": self.lat,
            "lng": self.lng,
            "price_range": self.price_range,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
