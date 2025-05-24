from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, length
from app.models import Review

# a custom filter function that will check if stars is 1 - 5


def validate_stars(form, field):
    if field.data < 1 or field.data > 5:
        raise ValidationError("Stars rating must be between 1 and 5.")

class ReviewForm(FlaskForm):

    review = StringField("review", validators=[DataRequired(), length(30, 1000)])
    stars = IntegerField("stars", validators=[DataRequired(), validate_stars])
