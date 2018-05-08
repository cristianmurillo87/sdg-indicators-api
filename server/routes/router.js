const express = require('express');
const { Pool } = require('pg');

const queries = require('./queries');

const router = express.Router();
const pool = new Pool();

router.get('/goals', (req, res, next) => {
    pool.connect()
        .then((client) => {
            return client.query(queries.getGoals)
                .then((response) => {
                    client.release();
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : response.rows
                    });
                })
                .catch((e) => {
                    client.release();
                    res.status(400).send({
                        success : false,
                        error : e.stack
                    });
                });
        });
});

router.get('/goal/:goal_id', (req, res) => {
    let goal_id = req.params.goal_id;
    pool.connect()
    .then((client) => {
        return client.query(queries.getGoalById, [goal_id])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "Goal not found" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});

router.get('/targets/:goal_id', (req, res) => {
    let goal_id = req.params.goal_id;

    pool.connect()
    .then((client) => {
        return client.query(queries.getTargetsByGoal, [goal_id])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "Invalid goal id" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});

router.get('/target/:target_id', (req, res) => {
    let target_id = req.params.target_id;

    pool.connect()
    .then((client) => {
        return client.query(queries.getTargetById, [target_id])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "Target id not found" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});

router.get('/indicators/:target_id', (req, res) => {
    let target_id = req.params.target_id;
    
    pool.connect()
    .then((client) => {
        return client.query(queries.getIndicatorsByTarget, [target_id])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "Invalid target id" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});

router.get('/indicator/:indicator', (req, res) => {
    let indicator = req.params.indicator;
    
    pool.connect()
    .then((client) => {
        return client.query(queries.getIndicatorById, [indicator])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "Indicator id not found" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});

router.get('/series/:indicator', (req, res) => {
    let indicator = req.params.indicator;
    
    pool.connect()
    .then((client) => {
        return client.query(queries.getSeriesByIndicator, [indicator])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "Invalid indicator" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});

router.get('/series/:series_id/years', (req, res) => {
    let id = req.params.series_id.toUpperCase();
    
    pool.connect()
    .then((client) => {
        return client.query(queries.getYearsForSeries, [id])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "Invalid series code" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});

router.get('/series/:series_id/:year/age', (req, res) => {
    let id = req.params.series_id.toUpperCase();
    let year = req.params.year;
    
    pool.connect()
    .then((client) => {
        return client.query(queries.getAgesForSeries, [id, year])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "No results were found for the request" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});

router.get('/series/:series_id/:year/:age_group_id/genders', (req, res) => {
    let id = req.params.series_id.toUpperCase();
    let year = req.params.year;
    let age_group_id = req.params.age_group_id;
    
    pool.connect()
    .then((client) => {
        return client.query(queries.getGendersForSeries, [id, year, age_group_id])
            .then((resp) => {
                client.release();
                if (resp.rowCount > 0) {
                    res.status(200).send({
                        success : true,
                        http_code : 200,
                        data : resp.rows[0]
                    });
                } else {
                    res.status(404).send({
                        success : false,
                        http_code : 404,
                        message : "No results were found for the request" 
                    });
                }
            })
            .catch((e) => {
                client.release();
                res.status(400).send({
                    success : false,
                    error : e.stack
                });
            });
    });
});


router.get('/mapdata/:series_id/:year', (req, res) => {
    let id = req.params.series_id.toUpperCase();
    let year = req.params.year;
    let age_group = req.query.age_group || 45;
    let gender = req.query.gender || 'B';
    
    pool.connect()
        .then((client) => {
            return client.query(queries.getGeoJSONData, [id, year, age_group, gender])
                .then((resp) => {
                    client.release();
                    if (resp.rowCount > 0) {
                        res.status(200).send({
                            success : true,
                            http_code : 200,
                            data : resp.rows[0]._data
                        });
                    } else {
                        res.status(404).send({
                            success : false,
                            http_code : 404,
                            message : "No results were found for the request" 
                        });
                    }
                })
                .catch((e) => {
                    client.release();
                    res.status(400).send({
                        success : false,
                        error : e.stack
                    });
                });
        });
});

router.get('/seriesdata/:series_id/:country_id', (req, res) => {
    let id = req.params.series_id.toUpperCase();
    let country = req.params.country_id.toUpperCase();
    let age_group = req.query.age_group || 45;
    let gender = req.query.gender || 'B';
    
    pool.connect()
        .then((client) => {
            return client.query(queries.getSeriesData, [id, country, age_group, gender])
                .then((resp) => {
                    client.release();
                    if (resp.rowCount > 0) {
                        res.status(200).send({
                            success : true,
                            http_code : 200,
                            data : resp.rows
                        });
                    } else {
                        res.status(404).send({
                            success : false,
                            http_code : 404,
                            message : "No results were found for the request" 
                        });
                    }
                })
                .catch((e) => {
                    client.release();
                    res.status(400).send({
                        success : false,
                        error : e.stack
                    });
                });
        });
});


module.exports = router;