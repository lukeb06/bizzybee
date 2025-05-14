from flask import Blueprint, jsonify
from app.models import Review
from flask_login import login_required, current_user
from app.models.db import db

review_routes = Blueprint("review", __name__)


@review_routes.route("/business/<business_id>/reviews", methods=["GET"])
def reviews(business_id: int ):
    

    reviews = Review.query.filter(Review.businessId == business_id).all()
    return jsonify([r.to_dict() for r in reviews])


@review_routes.route("/<review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    
    if not review:
        return jsonify({"error": "Review not found"}), 404

    if review.userId != current_user.id:
        return jsonify({"error": "Cannot delete a review you did not leave"}), 401

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})
