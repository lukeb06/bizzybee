from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,  ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    stars = IntegerField('stars', validators=[DataRequired()])
  
