from flask import Blueprint, jsonify
from app.models import Image, db


image_routes = Blueprint("image", __name__, url_prefix="/images")


@image_routes.route("/business/<business_id>", methods=["GET"])
def images(business_id: int ):
    

    images = Image.query.filter(Image.businessId == business_id).all()
    return jsonify([i.to_dict() for i in images])
