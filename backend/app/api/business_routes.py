from flask import Blueprint, jsonify
from app.models import Business

business_routes = Blueprint("business", __name__)


@business_routes.route("/", methods=["GET"])
def businesses():
    """
    Get all businesses
    """

    businesses = Business.query.all()
    return jsonify([b.to_dict() for b in businesses])


@business_routes.route("/<id>", methods=["GET"])
def business(id: int):
    """
    Get a business by id
    """

    business = Business.query.get(id)
    return jsonify(business.to_dict())
