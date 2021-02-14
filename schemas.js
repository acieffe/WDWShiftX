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

module.exports.shiftSchema = Joi.object({
	shiftX: Joi.object({
		title: Joi.string().required().escapeHTML(),
		start: Joi.date().required().escapeHTML(),
		end: Joi.string().required().escapeHTML(),
		comments: Joi.string().required().escapeHTML(),
	}).required(),
});

module.exports.proficiencySchema = Joi.object({
	proficiency: Joi.object({
		role: Joi.string().required().escapeHTML(),
		property: Joi.string().required().escapeHTML(),
		location: Joi.number().required().escapeHTML(),
	}).required(),
});
