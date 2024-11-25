from datetime import datetime
from .. import db

class Movie(db.Model):
    __tablename__ = 'movies'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    release_year = db.Column(db.Integer)
    duration = db.Column(db.Integer)
    genre = db.Column(db.String(100))
    director = db.Column(db.String(100))
    synopsis = db.Column(db.Text)
    trailer_url = db.Column(db.String(200))
    rating = db.Column(db.Numeric(3, 1))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relaciones
    favorites = db.relationship('Favorite', backref='movie', lazy=True)
    watchlist = db.relationship('Watchlist', backref='movie', lazy=True)
    reviews = db.relationship('Review', backref='movie', lazy=True)
    related_movies = db.relationship(
        'RelatedMovie',
        primaryjoin="or_(Movie.id==RelatedMovie.movie_id, Movie.id==RelatedMovie.related_movie_id)"
    )