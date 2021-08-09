exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("exercises")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("exercises").insert([
                {
                    "name": "90/90",
                    "category": "Stretch"
                },
                {
                    "name": "Butterfly",
                    "category": "Stretch"
                },
                {
                    "name": "Chest expansion",
                    "category": "Stretch"
                },
                {
                    "name": "Extended puppy pose",
                    "category": "Stretch"
                },
                {
                    "name": "Figure Four",
                    "category": "Stretch"
                },
                {
                    "name": "Frog",
                    "category": "Stretch"
                },
                {
                    "name": "Knee to Chest",
                    "category": "Stretch"
                },
                {
                    "name": "Spinal Twist Lunge",
                    "category": "Stretch"
                },
                {
                    "name": "Hip Flexor Lunge",
                    "category": "Stretch"
                },
                {
                    "name": "Quad",
                    "category": "Stretch"
                },
                {
                    "name": "Sphinx Pose",
                    "category": "Stretch"
                },
                {
                    "name": "Standing Hamstring",
                    "category": "Stretch"
                },
                {
                    "name": "Triceps Back Pull",
                    "category": "Stretch"
                },
                {
                    "name": "Bicycle Crunches",
                    "category": "Core"
                },
                {
                    "name": "Bicycle Kicks",
                    "category": "Core"
                },
                {
                    "name": "Cross leg crunches",
                    "category": "Core"
                },
                {
                    "name": "Crunches",
                    "category": "Core"
                },
                {
                    "name": "V-up",
                    "category": "Core"
                },
                {
                    "name": "Diagonal v-ups",
                    "category": "Core"
                },
                {
                    "name": "Dumbbell leg crunch",
                    "category": "Core"
                },
                {
                    "name": "Heel touch alternate",
                    "category": "Core"
                },
                {
                    "name": "Heel touch front",
                    "category": "Core"
                },
                {
                    "name": "High Plank",
                    "category": "Core"
                },
                {
                    "name": "High Side Plank (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "Side Plank (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "High Side Plank Twists (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "Side Plank Twist (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "Hollow Hold",
                    "category": "Core"
                },
                {
                    "name": "Knee Crunches",
                    "category": "Core"
                },
                {
                    "name": "Knee Wipers",
                    "category": "Core"
                },
                {
                    "name": "Leg Raise",
                    "category": "Core"
                },
                {
                    "name": "Leg wiper raise",
                    "category": "Core"
                },
                {
                    "name": "Leg Wipers",
                    "category": "Core"
                },
                {
                    "name": "Military Plank",
                    "category": "Core"
                },
                {
                    "name": "Plank",
                    "category": "Core"
                },
                {
                    "name": "Plank knees to elbow",
                    "category": "Core"
                },
                {
                    "name": "Plank switches",
                    "category": "Core"
                },
                {
                    "name": "Plank cross toe touch",
                    "category": "Core"
                },
                {
                    "name": "Plank with leg raise",
                    "category": "Core"
                },
                {
                    "name": "Reverse crunches",
                    "category": "Core"
                },
                {
                    "name": "Russian twist",
                    "category": "Core"
                },
                {
                    "name": "Russian twist legs up",
                    "category": "Core"
                },
                {
                    "name": "Shoulder bridge leg raises (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "Side leg raise (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "Side Plank Crunches (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "Assisted Side Plank Crunches (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "Single leg hip raises (Left & Right)",
                    "category": "Core"
                },
                {
                    "name": "Straight feet up crunches",
                    "category": "Core"
                },
                {
                    "name": "Starfish crunch",
                    "category": "Core"
                },
                {
                    "name": "Toe-touch crunches",
                    "category": "Core"
                },
                {
                    "name": "Mountain Climber",
                    "category": "Core"
                },
                {
                    "name": "Shoulder Tap Plank",
                    "category": "Core"
                },
                {
                    "name": "Burpee Squat-Jumps Pushup",
                    "category": "Full Body"
                },
                {
                    "name": "Burpee Pushup",
                    "category": "Full Body"
                },
                {
                    "name": "Burpee",
                    "category": "Full Body"
                },
                {
                    "name": "Dumbbell deadlifts",
                    "category": "Full Body"
                },
                {
                    "name": "Jumping jacks",
                    "category": "Full Body"
                },
                {
                    "name": "Jumping rope",
                    "category": "Full Body"
                },
                {
                    "name": "Kettlebell snatch",
                    "category": "Full Body"
                },
                {
                    "name": "Archer Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Bench dumbbell row (Left & Right)",
                    "category": "Upper Body"
                },
                {
                    "name": "Clapping Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Diamond Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Double biceps curls",
                    "category": "Upper Body"
                },
                {
                    "name": "Double hammer curls",
                    "category": "Upper Body"
                },
                {
                    "name": "Dumbbell front raise (Both & alternatives)",
                    "category": "Upper Body"
                },
                {
                    "name": "Dumbbell lateral raises",
                    "category": "Upper Body"
                },
                {
                    "name": "Dumbbell row",
                    "category": "Upper Body"
                },
                {
                    "name": "Dumbbell scaption",
                    "category": "Upper Body"
                },
                {
                    "name": "Dumbbell shoulder press",
                    "category": "Upper Body"
                },
                {
                    "name": "Dumbbell thruster",
                    "category": "Upper Body"
                },
                {
                    "name": "Floor chest press",
                    "category": "Upper Body"
                },
                {
                    "name": "Incline Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Decline Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Knee Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "One-arm Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Pike Push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Lateral Plank Walk",
                    "category": "Upper Body"
                },
                {
                    "name": "Pull over",
                    "category": "Upper Body"
                },
                {
                    "name": "Reverse fly",
                    "category": "Upper Body"
                },
                {
                    "name": "Shadow boxing (Free & Dumbbell)",
                    "category": "Upper Body"
                },
                {
                    "name": "Single biceps curls",
                    "category": "Upper Body"
                },
                {
                    "name": "Single hammer curls",
                    "category": "Upper Body"
                },
                {
                    "name": "Sphinx push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Spiderman push-ups",
                    "category": "Upper Body"
                },
                {
                    "name": "Standing Triceps",
                    "category": "Upper Body"
                },
                {
                    "name": "Triceps extension",
                    "category": "Upper Body"
                },
                {
                    "name": "Upright row",
                    "category": "Upper Body"
                },
                {
                    "name": "Lunges",
                    "category": "Lower Body"
                },
                {
                    "name": "Lunges Bounces",
                    "category": "Lower Body"
                },
                {
                    "name": "Lunges Jump",
                    "category": "Lower Body"
                },
                {
                    "name": "Lunges Walk",
                    "category": "Lower Body"
                },
                {
                    "name": "Dumbbell Lunges",
                    "category": "Lower Body"
                },
                {
                    "name": "Squats",
                    "category": "Lower Body"
                },
                {
                    "name": "Pistol Squats",
                    "category": "Lower Body"
                },
                {
                    "name": "Single Leg dumbbell squats",
                    "category": "Lower Body"
                },
                {
                    "name": "Squat Jumps",
                    "category": "Lower Body"
                },
                {
                    "name": "Squat Pulse",
                    "category": "Lower Body"
                },
                {
                    "name": "Squat side leg lift",
                    "category": "Lower Body"
                },
                {
                    "name": "Sumo squats",
                    "category": "Lower Body"
                },
                {
                    "name": "Calf Raise",
                    "category": "Lower Body"
                },
                {
                    "name": "Cossack squats",
                    "category": "Lower Body"
                },
                {
                    "name": "Crab Walk",
                    "category": "Lower Body"
                },
                {
                    "name": "Donkey Kick (Left & Right)",
                    "category": "Lower Body"
                },
                {
                    "name": "Fire Hydrant (Right & Left)",
                    "category": "Lower Body"
                },
                {
                    "name": "Glute Bridge",
                    "category": "Lower Body"
                },
                {
                    "name": "High knees run",
                    "category": "Lower Body"
                },
                {
                    "name": "Hip Thrust (Free & Dumbbell)",
                    "category": "Lower Body"
                },
                {
                    "name": "Kick Back (Left & Right)",
                    "category": "Lower Body"
                },
                {
                    "name": "Run on the spot",
                    "category": "Lower Body"
                },
                {
                    "name": "Wall sit",
                    "category": "Lower Body"
                }

            ]);
        });
};
