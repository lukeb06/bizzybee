from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, TextAreaField, SelectField, IntegerField, FieldList
from wtforms.validators import DataRequired, ValidationError, Length, Email
from app.models import Business

# def validate_business_name(form, field):
#     if field.data < 2:
#         raise ValidationError("Business name must be at least 2 characters long.")


class BusinessForm(FlaskForm):
    name = StringField("Business Name", validators=[DataRequired(), Length(2, 100)])
    description = TextAreaField("Business Description", validators=[DataRequired(), Length(1, 1000)])
    country = StringField("Country", validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired()])
    zipcode = StringField("Zipcode", validators=[DataRequired()])
    category = StringField("Category", validators=[DataRequired()])
    price_range = IntegerField("Price Range", validators=[DataRequired()])
    featured_image = StringField("Feature Image", validators=[DataRequired()])
    preview_image = StringField("Preview Image", validators=[DataRequired()])
    image_urls = FieldList(
        StringField("Image URL", validators=[DataRequired()]),
        min_entries=1,
        label="Image URLs"
    )