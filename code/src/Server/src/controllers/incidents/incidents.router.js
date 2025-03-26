'use strict';

const express = require('express');
const router = express.Router();

const incidentsController = require('./incidents.controller');

router.route('/').get(incidentsController.getIncidents);
// .post(incidentsController.createIncident);

router.route('/:incidentId').get(incidentsController.getAISuggestion);
//     .get(incidentsController.getIncidentById)
//     .post(incidentsController.updateIncidentById)
//     .delete(incidentsController.deleteIncidentById);
router.route('/chat').post(incidentsController.createAIChat);

module.exports = router;
