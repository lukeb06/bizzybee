
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
@login_required
def post_reviews(business_id: int):
    form = ReviewForm()
    if form.validate_on_submit():
        review = Review(
            userId=current_user.id,
            review=form.data['review'],
            businessId = business_id,
            stars=form.data['stars']
        )
        reviews=Review.query.filter(Review.userId==current_user.id, Review.businessId==business_id).all()
        if reviews:
            return {"errors": {"message": "User has already reviewed the business"}}, 401
        
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
