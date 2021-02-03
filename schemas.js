const { sanitize } = require('express-mongo-sanitize');
const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');
const { validate } = require('./models/user');

const extension = (joi) => ({
	type: 'string',
	base: joi.string(),
	messages: {
		'string.escapeHTML': '{{#label}} must not include HTML!',
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHTML(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				if (clean !== value) return helpers.error('string.escapeHTML', { value });
				return clean;
			},
		},
	},
});

const Joi = BaseJoi.extend(extension);

module.exports.shiftXSchema = Joi.object({
	shiftX: Joi.object({
		title: Joi.string().required().escapeHTML(),
		startDate: Joi.date().required().escapeHTML(),
		description: Joi.string().required().escapeHTML(),
		location: Joi.string().required().escapeHTML(),
	}).required(),
	deleteImages: Joi.array(),
});

module.exports.shiftWSchema = Joi.object({
	shiftW: Joi.object({
		body: Joi.string().required().escapeHTML(),
		rating: Joi.number().required().escapeHTML(),
	}).required(),
});
