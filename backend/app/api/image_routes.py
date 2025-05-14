from flask import Blueprint, jsonify
from app.models import Image, db


image_routes = Blueprint("image", __name__)


@image_routes.route("/business/<business_id>/images", methods=["GET"])
def images(business_id: int ):
    

    images = Image.query.filter(Image.businessId == business_id).all()
    return jsonify([i.to_dict() for i in images])