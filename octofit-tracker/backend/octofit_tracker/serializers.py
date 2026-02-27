import ast
from rest_framework import serializers
from bson import ObjectId
from .models import User, Team, Activity, Leaderboard, Workout


def parse_list_field(value):
    """Ensure a JSONField value that may be stored as a string is returned as a list."""
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        try:
            result = ast.literal_eval(value)
            return result if isinstance(result, list) else list(result)
        except Exception:
            return []
    if isinstance(value, dict):
        return list(value.values())
    return []


class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    def get__id(self, obj):
        return str(obj._id) if obj._id else None


class TeamSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = '__all__'

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    def get_members(self, obj):
        return parse_list_field(obj.members)


class ActivitySerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = '__all__'

    def get__id(self, obj):
        return str(obj._id) if obj._id else None


class LeaderboardSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()

    class Meta:
        model = Leaderboard
        fields = '__all__'

    def get__id(self, obj):
        return str(obj._id) if obj._id else None


class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    exercises = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = '__all__'

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    def get_exercises(self, obj):
        return parse_list_field(obj.exercises)
