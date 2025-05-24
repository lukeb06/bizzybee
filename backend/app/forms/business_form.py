from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError, length, Email
from app.models import Business

def validate_business_name(form, field):
    if field.data < 2:
        raise ValidationError("Business name must be at least 2 characters long.")

def validate_phone_number(form, field):
    if not field.data.isdigit():
        raise ValidationError("Phone number must contain only digits.")


class BusinessForm(FlaskForm):
    name = StringField("Business Name", validators=[DataRequired(), length(2, 100), validate_business_name])
    description = TextAreaField("Business Description", validators=[DataRequired(), length(1, 1000)])
    industry = SelectField("Industry", choices=[
        ("Technology"),
        ("Retail"),
        ("Finance"),
        ("Healthcare"),
        ("Cafe"),
        ("Fastfood"),
        ("Takeout")

    ], validators=[DataRequired()])
    email = StringField("Contact Email", validators=[DataRequired(), Email()])
    phone = StringField("Contact Phone", validators=[DataRequired(), length(10, 200), validate_phone_number])