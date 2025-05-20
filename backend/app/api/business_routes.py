from flask import Blueprint, jsonify, request
from app.models import Business, Review, Image
from flask_login import login_required, current_user
from app.models.db import db

business_routes = Blueprint("business", __name__, url_prefix="/business")


@business_routes.route("/", methods=["GET"])
def businesses():
    """
    Get all businesses
    """
    query = Business.query
    
    name = request.args.get("name")
    if name:
        query = query.filter(Business.name.like(f"%{name}%"))

    category = request.args.get("category")
    if category:
        query = query.filter(Business.category.like(f"%{category}%"))
    
    max_price = request.args.get("max_price", type=float)
    if max_price is not None:
        query = query.filter(Business.price <= max_price)

    businesses = query.all()
    if (name or category or max_price) and not businesses:
        return jsonify({"message": "No businesses found matching your search."}), 404

    return jsonify([business.to_dict() for business in businesses])


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


@business_routes.route("/<id>", methods=["PUT"])
@login_required
def update_business(id):
    """
    Update a business
    """
    business = Business.query.get(id)
    
    if not business:
        return {"errors": {"message": "Business not found"}}, 404
    
    if business.owner_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401
    
    data = request.get_json()
    business.name = data.get("name", business.name)
    business.country = data.get("country", business.country)
    business.address = data.get("address", business.address)
    business.city = data.get("city", business.city)
    business.state = data.get("state", business.state)
    business.zipcode = data.get("zipcode", business.zipcode)
    business.type = data.get("type", business.type)
    business.description=data.get("description",business.description)
    business.price_range = data.get("price_range", business.price_range)
    business.lat=data.get("lat",business.lat)
    business.lng=data.get("lng",business.lng)

    db.session.commit()
    return jsonify(business.todict())


@business_routes.route("/<id>", methods=["DELETE"])
@login_required
def delete_business(id):
    """
    Delete a business
    """
    business = Business.query.get(id)

    if not business:
        return {"errors": {"message": "Business not found"}}, 404
    
    if business.owner_id != current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401
    
    db.session.delete(business)
    db.session.commit()
    return {"message": "Successfully deleted"}