from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,  ValidationError, length
from app.models import Review




class ReviewForm(FlaskForm):

    review = StringField('review', validators=[DataRequired(),  length(30, 1000)])
    stars = IntegerField('stars', validators=[DataRequired()])
  
