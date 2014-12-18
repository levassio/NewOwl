"use strict";

var Standup = require('../models/standup.server.model.js');

exports.create = function (req, res, next) {
	var entry = new Standup({
		memberName: req.body.memberName,
		project: req.body.project,
		workYesterday: req.body.workYesterday,
		workToday: req.body.workToday,
		impediment: req.body.impediment
	});

	entry.save(function (err) {
		if (err) {
			next(new Error(err));
		} else {
			res.redirect(301, '/');
		}
	});
};

exports.list = function (req, res, next) {
	var query = Standup.find();
	sortAndQuery(query, res, next);
};

exports.filterByMember = function (req, res, next) {
	var query = Standup.find();
	var member = req.body.memberName;
	if (member) {
		query.where({ memberName: member });
	}

	sortAndQuery(query, res, next);
};

var sortAndQuery = function (query, res, next) {
	query.sort({ createdOn: "desc" })
		.limit(12)
		.exec(function (err, results) {
			if (err) {
				next(new Error(err));
			} else {
				res.render("index", { title: 'Standup - List', notes: results });
			}
		});
};