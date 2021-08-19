const router = require("express").Router();
const db = require("../models/Workout.js");

//gets all of the workouts
router.get("/api/workouts", (req, res) => {
    db.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

//returns only 7 days of workouts
router.get("/api/workouts/range", (req, res) => {
    db.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ]).limit(7)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

//adding a new workout
router.post("/api/workouts", (req, res) => {
    db.create({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//updating a workout
router.put("/api/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(req.params.id, {
        $push: { exercises: req.body }
    },
        {
            new: true,
            runValidators: true,
        })
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
