from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Image(db.Model):
    __tablename__ = "images"
    
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(300), nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    is_featured = db.Column(db.Boolean, nullable=False)
    is_preview = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    #Relationship

    businesses = db.relationship("Business", back_populates="images", uselist=False)


    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "businessId": self.businessId,
            "is_feature": self.is_featured,
            "is_preview": self.is_preview,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }