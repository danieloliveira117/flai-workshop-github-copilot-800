from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
import datetime


class ApiRootTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

    def test_api_root_at_api_path(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'securepassword123',
        }

    def test_create_user(self):
        response = self.client.post('/api/users/', self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'testuser')

    def test_list_users(self):
        User.objects.create(**self.user_data)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_user(self):
        user = User.objects.create(**self.user_data)
        response = self.client.get(f'/api/users/{user.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')

    def test_update_user(self):
        user = User.objects.create(**self.user_data)
        response = self.client.patch(
            f'/api/users/{user.pk}/', {'username': 'updateduser'}, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'updateduser')

    def test_delete_user(self):
        user = User.objects.create(**self.user_data)
        response = self.client.delete(f'/api/users/{user.pk}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TeamTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team_data = {
            'name': 'Team Alpha',
            'members': ['alice', 'bob'],
        }

    def test_create_team(self):
        response = self.client.post('/api/teams/', self.team_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Team Alpha')

    def test_list_teams(self):
        Team.objects.create(**self.team_data)
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


class ActivityTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.activity_data = {
            'user': 'alice',
            'activity_type': 'Running',
            'duration': 30.0,
            'date': str(datetime.date.today()),
        }

    def test_create_activity(self):
        response = self.client.post('/api/activities/', self.activity_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['activity_type'], 'Running')

    def test_list_activities(self):
        Activity.objects.create(
            user='alice',
            activity_type='Running',
            duration=30.0,
            date=datetime.date.today(),
        )
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


class LeaderboardTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.entry_data = {'user': 'alice', 'score': 150.0}

    def test_create_leaderboard_entry(self):
        response = self.client.post('/api/leaderboard/', self.entry_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user'], 'alice')

    def test_list_leaderboard(self):
        Leaderboard.objects.create(**self.entry_data)
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


class WorkoutTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.workout_data = {
            'name': 'Morning Routine',
            'description': 'A light morning workout',
            'exercises': ['push-ups', 'squats', 'planks'],
        }

    def test_create_workout(self):
        response = self.client.post('/api/workouts/', self.workout_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Morning Routine')

    def test_list_workouts(self):
        Workout.objects.create(**self.workout_data)
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
