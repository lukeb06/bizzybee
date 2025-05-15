from flask import Blueprint, jsonify, request
from app.models import Business
from flask_login import login_required, current_user
from app.models.db import db

business_routes = Blueprint("business", __name__, url_prefix="/business")


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


@business_routes.route("/", methods=["POST"])
@login_required
def create_business():
    """
    Create a business
    """

    data = request.get_json()
    business = Business(
        name=data.get("name"),
        country=data.get("country"),
        address=data.get("address"),
        city=data.get("city"),
        type=data.get("type"),
        state=data.get("state"),
        zipcode=data.get("zipcode"),
        price_range=data.get("price_range"),
        description=data.get("description"),
        lat=data.get("lat"),
        lng=data.get("lng"),
        owner_id=current_user.id,
    )
    db.session.add(business)
    db.session.commit()
    return jsonify(business.to_dict())
