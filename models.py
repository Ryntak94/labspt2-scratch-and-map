from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, CheckConstraint, ForeignKey, ARRAY, Boolean, TEXT
from flask_marshmallow import Marshmallow
from marshmallow import fields, Schema

db = SQLAlchemy()
ma = Marshmallow()

class users(db.Model):
    id = db.Column(Integer, autoincrement=True, primary_key=True)
    username = db.Column(String, unique=True,  nullable=False)
    password = db.Column(String, nullable=False)
    first_name = db.Column(String, nullable=False)
    last_name = db.Column(String, nullable=False)
    age = db.Column(Integer, CheckConstraint( 'age>=14' ), nullable=False)
    nationality = db.Column(String, nullable=False)
    picture_url = db.Column(String)
    email = db.Column(String, unique=True, nullable=False)
    role = db.Column(String, nullable=False)
    auto_scratch = db.Column(Boolean, default=False)


    def __init__(self, username, password, first_name, last_name, age, nationality, picture_url, email, role, auto_scratch):
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.nationality = nationality
        self.picture_url = picture_url
        self.email = email
        self.role = role
        self.auto_scratch = auto_scratch

    def __repr__(self):
        return '<{}>' % self.__name__

class UserSchema(ma.Schema):
    class Meta:
        fields = ('username', 'email', 'first_name', 'last_name', 'age', 'nationality', 'picture_url', 'role', 'auto_scratch')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class friends_with(db.Model):
    id = db.Column(Integer, autoincrement=True, primary_key=True)
    user_1 = db.Column(Integer, ForeignKey(users.id), nullable=False)
    user_2 = db.Column(Integer, ForeignKey(users.id), nullable=False)
    status = db.Column(String, nullable=False)

    def __init__(self, user_1, user_2, first_name, status):
        self.user_1 = user_1
        self.user_2 = user_2
        self.first_name = first_name
        self.status = status
        # user_1 = relationship("users", foreign_keys=[user_1_id], backref=backref("send_connections"))
        # user_2 = relationship("users", foreign_keys=[user_2_id], backref=backref("receive_connections")
    def __repr__(self):
        return '<{}>' % self.__name__


class countries(db.Model):
    id = db.Column(Integer, autoincrement=True, primary_key=True)
    country_name = db.Column(String, nullable=False)
    flag = db.Column(String, nullable=False)
    country_img = db.Column(String, nullable=False)

    def __init__(self, country_name, flag, country_img):
        self.country_name = country_name
        self.flag = flag
        self.country_img = country_img


    def __repr__(self):
        return '<{}>' % self.__name__

class CountrySchema(ma.Schema):
    class Meta:
        fields = ('country_name', 'flag', 'country_img')

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

class users_countries_join(db.Model):
    id = db.Column(Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(Integer, ForeignKey(users.id), nullable=False)
    country_id = db.Column(Integer, ForeignKey(countries.id), nullable=False)
    status = db.Column(String, nullable=False)
    notes = db.Column(TEXT, nullable=True)

    def __init__(self, user_id, country_id, status, notes):
        self.user_id = user_id
        self.country_id = country_id
        self.status = status
        self.notes = notes


    def __repr__(self):
        return '<{}>' % self.__name__

class UserCountrySchema(ma.Schema):
    class Meta:
        fields = ('user_id', 'country_id', 'status', 'notes')

user_country_schema = UserCountrySchema()
user_countries_schema = UserCountrySchema(many=True)
