from flask import Blueprint, jsonify
from app.models import Review

review_routes = Blueprint("review", __name__)


@review_routes.route("/business/<business_id>/reviews", methods=["GET"])
def reviews(business_id: int ):
    

    reviews = Review.query.filter(Review.businessId == business_id).all()
    return jsonify([r.to_dict() for r in reviews])