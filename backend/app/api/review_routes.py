from flask import Blueprint, jsonify, request
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint("review", __name__)


@review_routes.route("/business/<business_id>/reviews", methods=["GET"])
def reviews(business_id: int ):
    

    reviews = Review.query.filter(Review.businessId == business_id).all()
    return jsonify([r.to_dict() for r in reviews])
@review_routes.route("/business/<business_id>/reviews", methods=["POST"])
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