
from flask import Blueprint, jsonify, request
from app.models import Review, db
from app.forms import ReviewForm



from flask_login import login_required, current_user



review_routes = Blueprint("review", __name__, url_prefix="/reviews")


@review_routes.route("/business/<business_id>", methods=["GET"])
def reviews(business_id: int ):
    

    reviews = Review.query.filter(Review.businessId == business_id).all()
    return jsonify([r.to_dict() for r in reviews])

@review_routes.route("/business/<business_id>", methods=["POST"])
def post_reviews(business_id: int):
    form = ReviewForm()
    if form.validate_on_submit():
        review = Review(
            review=form.data['review'],
            businessId = business_id,
            stars=form.data['stars']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return form.errors, 401


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

@review_routes.route("<review_id>", methods=["PUT"])
@login_required
def edit_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return jsonify({"error": "Review not found"}), 404

    if review.userId != current_user.id:
        return jsonify({"error": "Cannot edit a review you did not leave"}), 401
    

    data = request.get_json()

    if (not isinstance(data["review"], str) or data["review"] == "" or len(data["review"]) > 1000): 
        return jsonify({"error": "Review must be at least 1 character and less than 1000 characters"}), 400
        
    if (not isinstance(data["stars"], int) or data["stars"] < 1 or data["stars"] > 5):
        return jsonify({"error": "Star ratings must be a number from 1 to 5"}), 400


    
    review.review = data.get("review", review.review)
    review.stars = data.get("stars", review.stars)

    db.session.commit()
    return jsonify(review.todict())


