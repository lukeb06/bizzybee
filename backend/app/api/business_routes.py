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
    # Search/ Filter businesses
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

    # Get all businesses with reviews and images
    businesses = Business.query.options(
        db.joinedload(Business.images), db.subqueryload(Business.reviews)
    ).all()

    response = []
    for b in businesses:
        preview = next(
            (img for img in b.images if getattr(img, "is_preview", False)), None
        )
        featured = next(
            (img for img in b.images if getattr(img, "is_featured", False)), None
        )
        review_count = len(b.reviews)
        avg_rating = (
            round(sum([r.stars for r in b.reviews]) / review_count, 1)
            if review_count > 0
            else None
        )

        response.append(
            {
                "id": b.id,
                "name": b.name,
                "category": b.category,
                "address": b.address,
                "city": b.city,
                "state": b.state,
                "price_range": b.price_range,
                "preview_image": preview.url if preview else None,
                "featured_image": featured.url if featured else None,
                "average_rating": avg_rating,
                "review_count": review_count,
            }
        )
    return jsonify(response)


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

    # data = request.get_json()
    # blocked
    form["csrf_token"].data = request.cookies["csrf_token"]
    business = Business(
        owner_id=current_user.id,
        name=data.get("name"),
        country=data.get("country"),
        address=data.get("address"),
        city=data.get("city"),
        state=data.get("state"),
        zipcode=data.get("zipcode"),
        category=data.get("category"),
        description=data.get("description"),
        price_range=data.get("price_range"),
        lat=data.get("lat"),
        lng=data.get("lng"),
    )
    db.session.add(business)
    db.session.commit()

    business_id = business.id

    # add featured image
    featured_image = Image(
        business_id=business_id, url=data.get("featured_image"), is_featured=True
    )

    db.session.add(featured_image)
    db.session.commit()

    # add preview image
    preview_image = Image(
        business_id=business_id, url=data.get("preview_image"), is_preview=True
    )

    db.session.add(preview_image)
    db.session.commit()

    # add other images
    image_urls = data.get("image_urls", [])
    for url in image_urls:
        image = Image(
            business_id=business_id, url=url, is_featured=False, is_preview=False
        )
        db.session.add(image)

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
    business.category = data.get("category", business.category)
    business.description = data.get("description", business.description)
    business.price_range = data.get("price_range", business.price_range)
    business.lat = data.get("lat", business.lat)
    business.lng = data.get("lng", business.lng)

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
