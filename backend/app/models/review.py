from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#Relationships

    user = db.relationship("User", back_populates="reviews", uselist=False)
    businesses = db.relationship("Business", back_populates="reviews", uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "businessId": self.businessId,
            "review": self.review,
            "stars": self.stars,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }