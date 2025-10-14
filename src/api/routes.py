"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Friendship, Mission, FriendshipMission, FriendshipRequest
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import and_, or_
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# --------------------------------------------CRUD TOKEN-------------------------------------------------#

# -----------------------------TOKEN CREATION--------------------------#


@api.route('/auth/login', methods=['POST'])
def login():

    identificator = request.json.get("identificator", None)

    if not identificator:
        return jsonify({"error": "none email or user_name has been provided"}), 400

    password = request.json.get("password", None)

    if not password:
        return jsonify({"error": "none password has been provided"}), 400

    user = User.query.filter(or_(User.email == identificator, User.user_name ==
                             identificator), User.password == password).first()

    if not user:
        return jsonify({"error": "bad login information"}), 400

    access_token = create_access_token(identity=str(user.id))

    return jsonify({"token": access_token, "user_id": user.id}), 200

# -----------------------------TOKEN VERIFICATION--------------------------#


@api.route('/auth/protected', methods=['GET'])
@jwt_required()
def protected_access():

    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "user not found"}), 404

    if not user.is_active:
        return jsonify({"error": "user is inactive"}), 403

    return jsonify({"id": user.id, "user_name": user.user_name}), 200


# CRUD USERS-------------------------------------------------------------------------------------------------------------||

# ----------------GET ALL USERS----------------------------------#
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()

    if not users:
        return jsonify({"error": "no users has been founded"}), 400

    return jsonify([user.serialize() for user in users]), 200


# ----------------GET SPECIFIC USER----------------------------------#

@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "please use a correct user id, no user founded with the gived one "})
    return jsonify(user.serialize())


# ------------------------------CREATE USER-----------------------#

@api.route('/user', methods=['POST'])
def create_user():

    recieved = request.get_json()
    user_name = recieved.get("user_name")
    email = recieved.get("email")
    password = recieved.get("password")

    if not user_name or not email:
        return jsonify({"message": "user_name and email are obligatory"}), 400
    if not password:
        return jsonify({"message": "password are obligatory"}), 400

    user = User(user_name=user_name, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": f"{user_name} user created"}), 200

# --------------------------DELETE USER----------------------------#


@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "please send a correct id user to delete"})
    user_name = user.user_name
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"{user_name} user deleted successfully"})


# --------------------------EDIT USER------------------------------#
@api.route('/user/<int:id>', methods=['PATCH'])
def edit_user(id):

    user = User.query.get(id)

    data = request.get_json()
    if not data:
        return {"error": "please send information to update "}

    for key, value in data.items():

        user_founded = User.query.filter(getattr(User, key) == value).first()

        if user_founded and user_founded.id != id:
            return jsonify({"error": "user_name o email already exist, try using another one"}), 400

        if hasattr(user, key):
            setattr(user, key, value)

    db.session.commit()

    return jsonify(user.serialize()), 200


# ------------------------------------------------------FIN CRUD USERS----------------------------------------------------------------------------#

# ------------------------------------------------------FRIEND CRUD--------------------------------------------------------------------------------#

# -----------------------GET USER FRIENDSHIPS---------------------------#
@api.route('user/friendships/', methods=['GET'])
def get_frienship():

    data = request.get_json()

    if not data:
        return jsonify({"error": "please send a body with the user_id information"}), 400

    user_id = data["user_id"]

    if not user_id:
        return jsonify({"error": "please send a user_id information on the body"}), 400

    friendships = Friendship.query.filter(
        (Friendship.user_from_id == user_id) | (Friendship.user_to_id == user_id)).all()

    if not friendships:
        return jsonify({"error": "none friendships founded for the given user_id"}), 400

    return jsonify({"friendships": [friendship.serialize() for friendship in friendships]}), 200


# -------------------------GET USER FRIENDSHIP -----------------------------#
@api.route('user/friendship', methods=['GET'])
def get_friendship():

    data = request.get_json()

    if not data:
        return jsonify({"error": "please send a body with the user_to_id and user_from_id information"}), 400

    user_to_id = data['user_to_id']
    user_from_id = data['user_from_id']

    if not user_to_id or not user_from_id:
        return jsonify({"error": "please send the user_to_id and user_from_id to find the friendship correctly"}), 400

    friendship = Friendship.query.filter(and_(
        Friendship.user_from_id == user_from_id, Friendship.user_to_id == user_to_id)).first()

    if not friendship:
        return jsonify({"error": "none friendship has been founded with both provided id's"}), 400

    user_from = User.query.get(user_from_id)

    if not user_from:
        return jsonify({"error": "none user has been founded with the provided user_from_id"}), 400

    user_to = User.query.get(user_to_id)

    if not user_to:
        return jsonify({"error": "none user has been founded with the provided user_to_id"}), 400

    return jsonify({"friendship_members": [user_from.user_name, user_to.user_name], "friendship_id": friendship.id}), 200


# --------------------------CREATE USER FRIENDSHIP--------------------------------------#
# @api.route('user/friendship', methods=['POST'])
# def create_friendship():

#     data = request.get_json()

#     if not data:
#         return jsonify({"error": "send a body with info to create a friendship"}), 400

#     user_from_id = data["user_from_id"]
#     user_to_id = data["user_to_id"]

#     if not user_from_id or not user_to_id:
#         return jsonify({"error": "please send the user_to_id and user_from_id to find the friendship correctly"}), 400

#     user_from = User.query.get(user_from_id)

#     if not user_from:
#         return jsonify({"error": "none user has been founded with the provided user_from_id"}), 400

#     user_to = User.query.get(user_to_id)

#     if not user_to:
#         return jsonify({"error": "none user has been founded with the provided user_to_id"}), 400

#     existing_friendship = Friendship.query.filter(and_(
#         Friendship.user_from_id == user_from_id, Friendship.user_to_id == user_to_id)).first()

#     if existing_friendship:
#         return jsonify({"error": "this friendship relation already exists"}), 400

#     friendship = Friendship(user_from_id=user_from_id, user_to_id=user_to_id)

#     db.session.add(friendship)
#     db.session.commit()

#     return jsonify({"message": f"friendship between {user_from.user_name} and {user_to.user_name} successfully created"}), 200


# ---------------------------DELETE USER FRIENDSHIP --------------------------------------#
@api.route('/user/friendship', methods=['DELETE'])
def delete_friendship():

    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to create a friendship"}), 400

    user_from_id = data["user_from_id"]
    user_to_id = data["user_to_id"]

    if not user_from_id or not user_to_id:
        return jsonify({"error": "please send the user_to_id and user_from_id to delete the friendship correctly"}), 400

    friendship = Friendship.query.filter(and_(
        Friendship.user_from_id == user_from_id, Friendship.user_to_id == user_to_id)).first()

    if not friendship:
        return jsonify({"error": "friendship not founded"}), 400

    db.session.delete(friendship)
    db.session.commit()

    return jsonify({"message": "friendship deleted successfully"}), 200


# -------------------------------------------FIN CRUD FRIEND --------------------------------------------------------------------------------------------#


# ------------------------------------------- Mission'S CRUD  --------------------------------------------------------------------------------------------#

 # -----------------GET ALL USER Missions------------------#
@api.route('/user/missions', methods=['GET'])
def get_user_missions():

    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to create a friendship"}), 400

    user_id = data["user_id"]

    if not user_id:
        return jsonify({"error": "missing user_id field on the body"}), 400

    missions = Mission.query.filter_by(user_id=user_id).all()

    if not missions:
        return jsonify({"error": "there is no missions for this user_id"}), 400

    return jsonify([mission.serialize() for mission in missions]), 200

 # -----------------GET UNIQUE USER Mission------------------#


@api.route('/user/mission', methods=['GET'])
def get_user_mission():

    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to get an user mission"}), 400

    user_id = data["user_id"]
    mission_id = data["mission_id"]

    if not user_id and not mission_id:
        return jsonify({"error": "missing user_id and mission_id field on the body"}), 400

    mission = Mission.query.filter_by(user_id=user_id, id=mission_id).first()

    if not mission:
        return jsonify({"error": "none mission has been founded with the user_id or mission_id"}), 400

    return jsonify(mission.serialize())

 # -----------------CREATE UNIQUE USER Mission------------------#


@api.route('/user/mission', methods=['POST'])
def create_user_mission():

    data = request.get_json()

    if not data:
        return jsonify({"error": "title, description and user_id fields are missing"}), 400

    title = data.get("title")
    description = data.get("description")
    user_id = data.get("user_id")

    if not title and not user_id:

        return jsonify({"error": "please provide an user_id and a title"}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "there is not user with this user_id"}), 400

    mission = Mission(title=title, user_id=user_id)

    if description:
        mission.description = description

    db.session.add(mission)
    db.session.commit()

    return jsonify(mission.serialize())

 # -----------------DELETE UNIQUE USER Mission------------------#


@api.route('/user/mission', methods=['DELETE'])
def delete_user_mission():

    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to delete an user mission"}), 400

    user_id = data.get("user_id")
    mission_id = data.get("mission_id")

    if not user_id or not mission_id:
        return jsonify({"error": "user_id and mission_id fields are missing"}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "no user was founded with the provided user_id"}), 400

    mission = Mission.query.filter_by(user_id=user_id, id=mission_id).first()

    if not mission:
        return jsonify({"error": "no mission was founded with the provided mission_id"}), 400

    db.session.delete(mission)
    db.session.commit()

    return jsonify({"message": f"the mission with the id {mission_id} associated with the user {user_id} was successfully deleted"}), 200

 # -----------------EDIT UNIQUE USER Mission------------------#


@api.route('/user/mission', methods=['PATCH'])
def edit_user_mission():

    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info to modify an user mission"}), 400

    user_id = data.get("user_id")
    mission_id = data.get("mission_id")

    if not user_id or not mission_id:
        return jsonify({"error": "user_id and mission_id fields are missing"}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "no user was founded with the provided user_id"}), 400

    mission = Mission.query.filter_by(user_id=user_id, id=mission_id).first()

    if not mission:
        return jsonify({"error": "there was not mission founded with the provided user_id and mission_id"}), 400

    title = data.get("title")
    description = data.get("description")

    if not title and not description:
        return jsonify({"error": "no fields to update, please provide a title or a description"}), 400

    if title:
        mission.title = title
    if description:
        mission.description = description

    db.session.commit()

    return jsonify(mission.serialize()), 200


# -------------------------PATCH is_active User Mission----------------#


@api.route('/user/mission/active', methods=['PATCH'])
def set_mission_active():

    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with info with user_id and mission_id"}), 400

    user_id = data.get("user_id")
    mission_id = data.get("mission_id")

    if not user_id or not mission_id:
        return jsonify({"error": "user_id and mission_id fields are missing"})

    mission = Mission.query.filter_by(id=mission_id, user_id=user_id).first()

    if not mission:
        return jsonify({"error": "there's no mission with the provided user_id and mission_id"}), 400

    mission.is_active = not mission.is_active

    db.session.commit()

    return jsonify({"message": f"the actual is_active value of the mission {mission.title} is {mission.is_active}"}), 200


## -----------------------------VER INACTIVE/ACTIVE UNIQUE User Missions---------------------#


@api.route('/user/missions/active', methods=["GET"])
def get_active_missions():

    data = request.get_json()

    if not data:
        return jsonify({"error": "send a body with user_id and missions_state"}), 400

    user_id = data.get("user_id")
    missions_state = data.get("missions_state")

    if not user_id and not missions_state:
        return jsonify({"error": "user_id and missions_state field is missing"})

    missions = Mission.query.filter_by(
        user_id=user_id, is_active=missions_state).all()

    if not missions:
        return jsonify({"error": f"user {user_id} hasn't missions with the state: {missions_state}"}), 400

    return jsonify([mission.serialize() for mission in missions])


# -------------------------------------------FIN CRUD Mission --------------------------------------------------------------------------------------------#

# -------------------------------------------FriendshipMissions CRUD --------------------------------------------------------------------------------------------#

# -----------------GET ALL FRIEND Missions------------------#
@api.route('/friendship/missions', methods=['GET'])
def get_friendship_missions():

    data = request.get_json()

    if not data:
        return jsonify({"error": "frienship_id field is missing"}), 400

    friendship_id = data.get("friendship_id")

    if not friendship_id:
        return jsonify({"error": "none friendship_id provided"}), 400

    friendship_missions = FriendshipMission.query.filter_by(
        friendship_id=friendship_id).all()

    if not friendship_missions:
        return jsonify({"error": "none friendship missions has been founded with the provided friendship_id"}), 400

    return jsonify([friendship_mission.serialize() for friendship_mission in friendship_missions]), 200

 # -----------------GET UNIQUE FRIEND Mission------------------#


@api.route('/friendship/mission', methods=['GET'])
def get_friendship_mission():

    data = request.get_json()

    if not data:
        return jsonify({"error": "none body information has been provided"}), 400

    friendship_id = data.get("friendship_id")
    friendship_mission_id = data.get("friendship_mission_id")

    if not friendship_id or not friendship_mission_id:
        return jsonify({"error": "you have not provided a friendship_id or friendship_mission_id"}), 400

    friendship_mission = FriendshipMission.query.filter_by(
        friendship_id=friendship_id, id=friendship_mission_id).first()

    if not friendship_mission_id:
        return jsonify({"error": "none friendship mission has been founded with the provided friendship_id or friendship_mission_id"}), 400

    return jsonify(friendship_mission.serialize()), 200

 # -----------------CREATE UNIQUE FRIEND Mission------------------#


@api.route('/friendship/mission', methods=['POST'])
def create_friendship_mission():

    data = request.get_json()

    if not data:
        return jsonify({"error": "none body information has been provided"}), 400

    title = data.get("title")
    description = data.get("description")
    friendship_id = data.get("friendship_id")

    if not title and not friendship_id:

        return jsonify({"error": "please provide a friendship_id and a title"}), 400

    friendship = Friendship.query.get(friendship_id)

    if not friendship:
        return jsonify({"error": "there is not friendship with this friendship_id"}), 400

    friendship_mission = FriendshipMission(
        friendship_id=friendship_id, title=title)

    if description:
        friendship_mission.description = description

    db.session.add(friendship_mission)
    db.session.commit()

    return jsonify(friendship_mission.serialize()), 200

 # -----------------DELETE UNIQUE FRIEND Mission------------------#


@api.route('/friendship/mission', methods=['DELETE'])
def delete_friendship_mission():

    data = request.get_json()

    if not data:
        return jsonify({"error": "none body information has been provided"}), 400

    friendship_id = data.get("friendship_id")
    friendship_mission_id = data.get("friendship_mission_id")

    if not friendship_id or not friendship_mission_id:
        return jsonify({"error": "none friendship_id or friendship_mission_id has been provided"}), 400

    if not isinstance(friendship_id, int) or not isinstance(friendship_mission_id, int):
        return jsonify({"error": "friendship_id and friendship_mission_id must be integer numbers"}), 400

    friendship = Friendship.query.get(friendship_id)

    if not friendship:
        return jsonify({"error": "none friendship has been founded with the provided friendship_id"}), 400

    friendship_mission = FriendshipMission.query.filter_by(
        friendship_id=friendship_id, id=friendship_mission_id).first()

    if not friendship_mission:
        return jsonify({"error": "none friendship mission  has been founded with the provided friendship_id and friendship_mission_id"}), 400

    db.session.delete(friendship_mission)
    db.session.commit()

    return jsonify({"message": "friendship mission successfully deleted"}), 200

 # -----------------EDIT UNIQUE FRIEND Mission------------------#


@api.route('/friendship/mission', methods=['PATCH'])
def edit_friendship_mission():

    data = request.get_json()

    if not data:
        return jsonify({"error": "none body information has been provided"}), 400

    friendship_id = data.get("friendship_id")
    friendship_mission_id = data.get("friendship_mission_id")

    if not friendship_id or not friendship_mission_id:
        return jsonify({"error": "none friendship_id or friendship_mission_id has been provided"}), 400

    if not isinstance(friendship_id, int) or not isinstance(friendship_mission_id, int):
        return jsonify({"error": "friendship_id and friendship_mission_id must be integer numbers"}), 400

    friendship = Friendship.query.get(friendship_id)

    if not friendship:
        return jsonify({"error": "none friendship has been founded with the provided friendship_id"}), 400

    friendship_mission = FriendshipMission.query.filter_by(
        friendship_id=friendship_id, id=friendship_mission_id).first()

    if not friendship_mission:
        return jsonify({"error": "none friendship mission has been founded with the provided friendship_id and friendship_mission_id"}), 400

    title = data.get("title")
    description = data.get("description")

    if not title and not description:
        return jsonify({"error": "please provide a title or a description data to modify the actual friendship_mission"}), 400

    if title:

        old_title = friendship_mission.title.replace(" ", "").lower()
        new_title = title.replace(" ", "").lower()

        if old_title == new_title:
            return jsonify({"error": "new title can not be the same as the older one"}), 400

        friendship_mission.title = title

    if description:

        old_description = friendship_mission.description.replace(
            " ", "").lower()
        new_description = description.replace(" ", "").lower()

        if old_description == new_description:
            return jsonify({"error": "new description can not be the same as the older one"}), 400

        friendship_mission.description = description

    db.session.commit()

    return jsonify(friendship_mission.serialize()), 200

# ----------------- PATCH is_active FriendshipMission-------------------------#


@api.route('/friendship/mission/active', methods=['PATCH'])
def set_friendship_mission_active():

    data = request.get_json()

    if not data:
        return jsonify({"error": "none field has been founded, please send a body"})

    friendship_id = data.get("friendship_id")
    mission_id = data.get("mission_id")

    if not friendship_id or not mission_id:
        return jsonify({"error": "friendship_id and mission_id fields are missing"}), 400

    mission = FriendshipMission.query.filter_by(
        friendship_id=friendship_id, id=mission_id).first()

    if not mission:
        return jsonify({"error": "there's no mission with the provided friendship_id and mission_id"}), 400

    mission.is_active = not mission.is_active

    db.session.commit()

    return jsonify({"message": f"mission {mission.title} is_active was successfully changed to {mission.is_active}"}), 200


# ----------------GET is_active FriendshipMisisons---------------#

@api.route('/friendship/missions/active', methods=['GET'])
def get_active_friendship_missions():

    data = request.get_json()

    if not data:
        return jsonify({"error": "none field has been founded, please send a body"})

    friendship_id = data.get("friendship_id")
    missions_state = data.get("missions_state")

    if not friendship_id or not missions_state:
        return jsonify({"error": "friendship_id and missions_state fields are necessary"}), 400

    friendship = Friendship.query.get(friendship_id)

    if not friendship:
        return jsonify({"error": "there's no friendship with the proportionated friendship_id"}), 400

    if not isinstance(missions_state, bool):
        return jsonify({"error": "missions_state must be a boolean"})

    missions = FriendshipMission.query.filter_by(
        friendship_id=friendship_id, is_active=missions_state).all()

    if not missions:
        return jsonify({"error": f"friendship {friendship_id} hasn't missions with the {missions_state} state"})

    return jsonify([mission.serialize() for mission in missions]), 200


# ---------------------------------------------- FIN CRUD FriendshipMissions ---------------------------------------------------------#

# -------------------------------------------FriendshipRequest CRUD ----------------------------------------------------------------------#

# ---------------------VER FriendshipRequests desde un Usuario ----------------------#

@api.route('/user/friendship/requests', methods=['GET'])
def get_friendship_requests():

    data = request.get_json()

    if not data:
        return jsonify({"error": "body was not found, please send user_id field"}), 400

    user_id = data.get("user_id")
    direction = data.get("direction")

    if not user_id or not direction:
        return jsonify({"error": "user_id and direction fields are necessary"}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "there's no user with the proportionated user_id"}), 400

    if direction == "to":
        friendship_requests = FriendshipRequest.query.filter_by(
            user_to_id=user_id).all()

        return jsonify([req.request_from() for req in friendship_requests])

    elif direction == "from":
        friendship_requests = FriendshipRequest.query.filter_by(
            user_from_id=user_id).all()

        return jsonify([req.request_to() for req in friendship_requests])

    else:
        return jsonify({"error": "direction must be 'to' or 'from'"}), 400

# ---------------------CAMBIAR Estado FriendshipRequests desde un Usuario ----------------------#


@api.route('/user/friendship/request/state', methods=['POST'])
def set_friendship_request():

    data = request.get_json()

    if not data:
        return jsonify({"error": "body was not found, please send friendship_id field"}), 400

    friendship_request_id = data.get("friendship_request_id")
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "user_id field is missing"}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "there's no user with the proportionated user_id"}), 404

    if not friendship_request_id:
        return jsonify({"error": "friendship_id field is missing"}), 400

    friendship_request = FriendshipRequest.query.filter(and_(FriendshipRequest.id == friendship_request_id, or_(
        FriendshipRequest.user_from_id == user_id, FriendshipRequest.user_to_id == user_id))).first()

    if not friendship_request:
        return jsonify({"error": "there's no friendship_request founded with the proportionated friendship_request_id and user_id "}), 404

    state = data.get("state")

    if not state:
        return jsonify({"error": "state field was missing"}), 400

    if state == "accepted":
        if friendship_request.user_to_id == user_id:
            user_to_id = friendship_request.user_to_id
            user_to = User.query.get(user_to_id)

            user_from_id = friendship_request.user_from_id
            user_from = User.query.get(user_from_id)

            friendship = Friendship(
                user_from_id=user_from_id, user_to_id=user_to_id)

            db.session.add(friendship)
            db.session.delete(friendship_request)
            db.session.commit()

            return jsonify({"message": f"friendship between {user_from.user_name} and {user_to.user_name} was successfully created"}), 200
        else:
            return jsonify({"error": "just the user who recieve the request can accept it"}), 400

    elif state == "denied":

        db.session.delete(friendship_request)
        db.session.commit()

        return jsonify({"message": f"the curret friendship request was sucessfully denied and deleted"})

    else:
        return jsonify({"error": "state must be 'accepted' or 'denied'"}), 400


# ---------------------CREAR FriendshipRequests desde un Usuario ----------------------#

@api.route('/user/friendship/request', methods=['POST'])
def create_friendship_request():

    data = request.get_json()

    if not data:
        return jsonify({"error": "body was not found, please send 'user_to_id' and 'user_from_id' fields"}), 400

    user_to_id = data.get("user_to_id")
    user_from_id = data.get("user_from_id")

    if not user_to_id or not user_from_id:
        return jsonify({"error": "the 'user_to_id' and 'user_from_id' are required"})

    user_to = User.query.get(user_to_id)

    if not user_to:
        return jsonify({"error": "there's no user with the proportionated 'used_to_id' "}), 404

    user_from = User.query.get(user_from_id)

    if not user_from:
        return jsonify({"error": "there's no user with the proportionated 'used_from_id' "}), 404

    existing_friendship = Friendship.query.filter(or_(and_(Friendship.user_to_id == user_to_id, Friendship.user_from_id == user_from_id), and_(
        Friendship.user_from_id == user_to_id, Friendship.user_to_id == user_from_id))).first()
    
    if existing_friendship:
        return jsonify({"error": f"a friendship between {user_from.user_name} and {user_to.user_name} already exists"}),400
    
    existing_friendship_request = FriendshipRequest.query.filter(or_(and_(FriendshipRequest.user_from_id == user_from_id, FriendshipRequest.user_to_id == user_to_id),and_(FriendshipRequest.user_from_id == user_to_id, FriendshipRequest.user_to_id == user_from_id))).first()

    if existing_friendship_request:
        return jsonify({"error": "already exist a request for this users", "existing_friendship_request": existing_friendship_request.serialize()}),400
    
    friendship_request = FriendshipRequest(user_from_id=user_from_id, user_to_id=user_to_id)

    db.session.add(friendship_request)
    db.session.commit()

    return jsonify({"message": f"friendship request from id {user_from.id}({user_from.user_name}) to id {user_to.id}({user_to.user_name}) was successfully created"})