const router = require("express").Router();
const Workout = require("../models/Workout.js");

//gets all of the workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: `$exercises.duration`
                }
            }
        }
    ])
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

//returns only 7 days of workouts
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: `$exercises.duration`
                    }
                }
            }
        ]).sort({_id:-1}).limit(7)
        .then((data)=> {
        res.json(data)
    }) .catch(err => {
        res.status(400).json(err)
    });
});

//adding a new workout
router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//updating a workout
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, {
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
