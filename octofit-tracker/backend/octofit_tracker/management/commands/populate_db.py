from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        # Create users (Marvel and DC superheroes)
        self.stdout.write('Creating users...')
        users_data = [
            {'username': 'ironman', 'email': 'tony@avengers.com', 'password': 'ironman123'},
            {'username': 'spiderman', 'email': 'peter@avengers.com', 'password': 'spidey123'},
            {'username': 'captainamerica', 'email': 'steve@avengers.com', 'password': 'cap123'},
            {'username': 'thor', 'email': 'thor@avengers.com', 'password': 'thor123'},
            {'username': 'blackwidow', 'email': 'natasha@avengers.com', 'password': 'widow123'},
            {'username': 'hulk', 'email': 'bruce@avengers.com', 'password': 'hulk123'},
            {'username': 'batman', 'email': 'bruce@jl.com', 'password': 'batman123'},
            {'username': 'superman', 'email': 'clark@jl.com', 'password': 'super123'},
            {'username': 'wonderwoman', 'email': 'diana@jl.com', 'password': 'wonder123'},
            {'username': 'theflash', 'email': 'barry@jl.com', 'password': 'flash123'},
            {'username': 'aquaman', 'email': 'arthur@jl.com', 'password': 'aqua123'},
            {'username': 'greenlantern', 'email': 'hal@jl.com', 'password': 'lantern123'},
        ]

        users = {}
        for u in users_data:
            user = User.objects.create(**u)
            users[u['username']] = user
            self.stdout.write(f"  Created user: {user.username}")

        # Create teams
        self.stdout.write('Creating teams...')
        marvel_members = [
            users['ironman'].username,
            users['spiderman'].username,
            users['captainamerica'].username,
            users['thor'].username,
            users['blackwidow'].username,
            users['hulk'].username,
        ]
        dc_members = [
            users['batman'].username,
            users['superman'].username,
            users['wonderwoman'].username,
            users['theflash'].username,
            users['aquaman'].username,
            users['greenlantern'].username,
        ]

        team_marvel = Team.objects.create(name='Team Marvel', members=marvel_members)
        team_dc = Team.objects.create(name='Team DC', members=dc_members)
        self.stdout.write(f"  Created team: {team_marvel.name}")
        self.stdout.write(f"  Created team: {team_dc.name}")

        # Create activities
        self.stdout.write('Creating activities...')
        activities_data = [
            {'user': 'ironman', 'activity_type': 'Repulsor Blast Training', 'duration': 60.0, 'date': date(2024, 1, 10)},
            {'user': 'spiderman', 'activity_type': 'Web Slinging', 'duration': 45.0, 'date': date(2024, 1, 11)},
            {'user': 'captainamerica', 'activity_type': 'Shield Throwing', 'duration': 55.0, 'date': date(2024, 1, 12)},
            {'user': 'thor', 'activity_type': 'Hammer Lifting', 'duration': 90.0, 'date': date(2024, 1, 13)},
            {'user': 'blackwidow', 'activity_type': 'Espionage Training', 'duration': 70.0, 'date': date(2024, 1, 14)},
            {'user': 'hulk', 'activity_type': 'Smashing', 'duration': 30.0, 'date': date(2024, 1, 15)},
            {'user': 'batman', 'activity_type': 'Martial Arts', 'duration': 80.0, 'date': date(2024, 1, 10)},
            {'user': 'superman', 'activity_type': 'Flying', 'duration': 100.0, 'date': date(2024, 1, 11)},
            {'user': 'wonderwoman', 'activity_type': 'Lasso Training', 'duration': 65.0, 'date': date(2024, 1, 12)},
            {'user': 'theflash', 'activity_type': 'Speed Running', 'duration': 20.0, 'date': date(2024, 1, 13)},
            {'user': 'aquaman', 'activity_type': 'Swimming', 'duration': 50.0, 'date': date(2024, 1, 14)},
            {'user': 'greenlantern', 'activity_type': 'Ring Constructs', 'duration': 75.0, 'date': date(2024, 1, 15)},
        ]

        for a in activities_data:
            activity = Activity.objects.create(**a)
            self.stdout.write(f"  Created activity: {activity.user} - {activity.activity_type}")

        # Create leaderboard
        self.stdout.write('Creating leaderboard...')
        leaderboard_data = [
            {'user': 'superman', 'score': 980.0},
            {'user': 'thor', 'score': 950.0},
            {'user': 'ironman', 'score': 900.0},
            {'user': 'batman', 'score': 870.0},
            {'user': 'wonderwoman', 'score': 850.0},
            {'user': 'captainamerica', 'score': 820.0},
            {'user': 'greenlantern', 'score': 800.0},
            {'user': 'blackwidow', 'score': 780.0},
            {'user': 'spiderman', 'score': 760.0},
            {'user': 'aquaman', 'score': 740.0},
            {'user': 'hulk', 'score': 720.0},
            {'user': 'theflash', 'score': 900.0},
        ]

        for lb in leaderboard_data:
            entry = Leaderboard.objects.create(**lb)
            self.stdout.write(f"  Created leaderboard entry: {entry.user} - {entry.score}")

        # Create workouts
        self.stdout.write('Creating workouts...')
        workouts_data = [
            {
                'name': 'Avengers Assemble Workout',
                'description': 'Intense training for Earth\'s mightiest heroes',
                'exercises': [
                    'Repulsor push-ups (3 x 20)',
                    'Shield throw rotations (4 x 15)',
                    'Thor\'s hammer swings (3 x 12)',
                    'Web-slinging pulls (5 x 10)',
                    'Widow\'s bite sprints (8 x 40m)',
                ]
            },
            {
                'name': 'Justice League Protocol',
                'description': 'Training regimen for DC\'s finest heroes',
                'exercises': [
                    'Batman grappling hook pulls (4 x 12)',
                    'Wonder Woman lasso drills (3 x 15)',
                    'Flash speed intervals (10 x 100m)',
                    'Aquaman swimming (5 x 200m)',
                    'Green Lantern ring concentration (3 x 10 min)',
                ]
            },
            {
                'name': 'Hero Core Strength',
                'description': 'Core workout for superheroes of all universes',
                'exercises': [
                    'Plank hold (3 x 60s)',
                    'Spider-Man crunches (4 x 25)',
                    'Super-speed leg raises (3 x 20)',
                    'Hulk jumps (5 x 10)',
                    'Captain America shield rows (3 x 15)',
                ]
            },
        ]

        for w in workouts_data:
            workout = Workout.objects.create(**w)
            self.stdout.write(f"  Created workout: {workout.name}")

        self.stdout.write(self.style.SUCCESS('\nDatabase populated successfully!'))
        self.stdout.write(f"  Users: {User.objects.count()}")
        self.stdout.write(f"  Teams: {Team.objects.count()}")
        self.stdout.write(f"  Activities: {Activity.objects.count()}")
        self.stdout.write(f"  Leaderboard entries: {Leaderboard.objects.count()}")
        self.stdout.write(f"  Workouts: {Workout.objects.count()}")
