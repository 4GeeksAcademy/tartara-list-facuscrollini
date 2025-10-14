from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List

db = SQLAlchemy()


class User(db.Model):
    
    __tablename__="user"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True) 

    friendship_requests_from : Mapped[List["FriendshipRequest"]] = relationship("FriendshipRequest", foreign_keys="FriendshipRequest.user_from_id", back_populates="user_from", cascade="all, delete-orphan")
    friendship_requests_to: Mapped[List["FriendshipRequest"]] = relationship("FriendshipRequest", foreign_keys="FriendshipRequest.user_to_id", back_populates="user_to", cascade="all, delete-orphan")



    friends_from: Mapped[List["Friendship"]] = relationship("Friendship", foreign_keys="Friendship.user_from_id", back_populates="user_from", cascade="all, delete-orphan")
    friends_to: Mapped[List["Friendship"]] = relationship("Friendship", foreign_keys="Friendship.user_to_id", back_populates="user_to", cascade="all, delete-orphan")


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "user_name": self.user_name,
            "friendships_request_sended": [request.request_to() for request in self.friendship_requests_from],
            "friendships_request_recieved": [request.request_from() for request in self.friendship_requests_to],
            # do not serialize the password, its a security breach
        }
    
    def __repr__(self):
        return self.user_name

class Mission(db.Model):
    
    __tablename__="todo"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False, default="No description")
    is_active : Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    user_id : Mapped[int] = mapped_column(ForeignKey("user.id"))
    
    user : Mapped["User"] = relationship(backref="missions")
    
    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "is_active": self.is_active
        }
    


class Friendship(db.Model):

    __tablename__="friendship"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_to_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user_from_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    user_to: Mapped['User'] = relationship("User", foreign_keys=[user_to_id], backref="friendship_from")
    user_from: Mapped['User'] = relationship("User", foreign_keys=[user_from_id], backref="friendship_to")
    friendship_missions : Mapped[List['FriendshipMission']] = relationship("FriendshipMission",cascade="all, delete-orphan", backref="friendship")

    def serialize(self):
        return {
            "id": self.id,
            "user_to_id": self.user_to_id,
            "user_from_id": self.user_from_id,
            "user_to": self.user_to.user_name,
            "user_from": self.user_from.user_name,
            "friendship_missions": [mission.serialize() for mission in self.friendship_missions]

        }


class FriendshipMission(db.Model):

    __tablename__="friendship_todo"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False, default="No description")
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    
    friendship_id: Mapped[int] = mapped_column(ForeignKey("friendship.id"))


    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "decription": self.description,
            "is_active": self.is_active
        }
    
    def __repr__(self):
        return self.title


class FriendshipRequest(db.Model):

    __tablename__ = "friendship_request"

    id: Mapped[int] = mapped_column(primary_key=True)

    state : Mapped[str] = mapped_column(String(150), nullable=False, default="sended")

    user_from_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user_to_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    

    user_from: Mapped["User"] = relationship("User", foreign_keys=[user_from_id], back_populates="friendship_requests_from")
    user_to: Mapped["User"] = relationship("User", foreign_keys=[user_to_id], back_populates="friendship_requests_to")
    

    def request_to(self):
        return self.user_to.user_name
    
    def request_from(self):
        return self.user_from.user_name
    


   
