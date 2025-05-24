from flask import Blueprint, request, jsonify
from app.models import Image, db
from flask_login import login_required, current_user
image_routes = Blueprint("image", __name__, url_prefix="/images")


@image_routes.route("/business/<business_id>", methods=["GET"])
def images(business_id: int ):
    

    images = Image.query.filter(Image.business_id == business_id).all()
    return jsonify([i.to_dict() for i in images])


# add an image to a business

@image_routes.route("/business/<business_id>", method=["POST"])
@login_required
def add_image(business_id):
    data = request.get_json()
    image_url = data.get("url")

    if not image_url:
        return jsonify({"error": "Image URL is required"}), 404
    
    new_image = Image(business_id=business_id, url=image_url)
    db.session.add(new_image)
    db.session.commit()

    return jsonify(new_image.to_dict()), 201



# delete an image 

@image_routes.route("/<image_id>", methods=["DELETE"])
@login_required
def delete_image(image_id):
    image = image.query.get(image_id)

    if not image:
        return jsonify({"error": "Image not found"}), 404
    
    if image.owner_id != current_user.id:
        return {"error": {"message": "unauthorized"}}, 404
    
    db.session.delete(image)
    db.session.commit()

    return jsonify({"message": "Image deleted successfully"}), 200

