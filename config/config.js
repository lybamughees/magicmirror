/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "0.0.0.0",	// Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	// ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
	ipWhitelist: [],	// Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR", "DEBUG"], // Add "DEBUG" for even more logging
	// logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert"
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		// {
		// 	module: "calendar",
		// 	header: "US Holidays",
		// 	position: "top_left",
		// 	config: {
		// 		calendars: [
		// 			{
		// 				fetchInterval: 7 * 24 * 60 * 60 * 1000,
		// 				symbol: "calendar-check",
		// 				url: "https://ics.calendarlabs.com/76/mm3137/US_Holidays.ics"
		// 			}
		// 		]
		// 	}
		// },
		{
			module: "compliments",
			position: "lower_third"
		},
		// {
		// 	module: "weather",
		// 	position: "top_right",
		// 	header: "Weather Forecast",
		// 	config: {
		// 		weatherProvider: "envcanada",
		// 		type: "forecast",
		// 		siteCode: "s0000707",
		// 		provCode: "ON",
		// 		location: "Oshawa, ON"
		// 	}
		// },

		{
			module: "Medication-Input",
			position: "top_right"
		},
		{
			module: "Medication-Scheduler",
			position: "bottom_right",
			header: "Medication Scheduler",
			
			
		},

		{
			module: "Medication-Alarm",
			position: "top_center",
			header: "Medication Alarm",
		  },
		  
		// {
		// 	module: "newsfeed",
		// 	position: "bottom_bar",
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "New York Times",
		// 				url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true,
		// 		broadcastNewsFeeds: true,
		// 		broadcastNewsUpdates: true
		// 	}
		// },
		{
			module: "MMM-Cursor",
			config: {
				timeout: 1000
			}
		},
		{
			module: "pillbox",
			position: "bottom_bar",
			config: {
				// See below for configurable options
			}
		},
		{
			module: "MMM-TouchButton",
			position: "bottom_left",
			config: {
				buttons: [
					{
						name: "Solenoid_1",
						icon: "fa fa-toggle-on",
						notification: "SOLENOID_TOGGLE",
						payload: { solenoid: 1 }
					},
					{
						name: "Solenoid_2",
						icon: "fa fa-toggle-on",
						notification: "SOLENOID_TOGGLE",
						payload: { solenoid: 2 }
					},
					{
						name: "Solenoid_3",
						icon: "fa fa-toggle-on",
						notification: "SOLENOID_TOGGLE",
						payload: { solenoid: 3 }
					},
					{
						name: "Solenoid_4",
						icon: "fa fa-toggle-on",
						notification: "SOLENOID_TOGGLE",
						payload: { solenoid: 4 }
					},
					{
						name: "Solenoid_5",
						icon: "fa fa-toggle-on",
						notification: "SOLENOID_TOGGLE",
						payload: { solenoid: 5 }
					},
					{
						name: "Solenoid_6",
						icon: "fa fa-toggle-on",
						notification: "SOLENOID_TOGGLE",
						payload: { solenoid: 6 }
					},
					{
						name: "Solenoid_7",
						icon: "fa fa-toggle-on",
						notification: "SOLENOID_TOGGLE",
						payload: { solenoid: 7 }
					},
					{
						name: "Solenoid_8",
						icon: "fa fa-toggle-on",
						notification: "SOLENOID_TOGGLE",
						payload: { solenoid: 8 }
					}
					// {
					// 	name: "On",
					// 	icon: "fa fa-snowflake-o",
					// 	notification: "MODULE_TOGGLE",
					// 	payload: {hide: [], show: [], toggle:["Clock"]}
					// },
					// {
					// 	name: "Off",
					// 	icon: "fa fa-snowflake-o",
					// 	notification: "MODULE_TOGGLE",
					// 	payload: {hide: [], show: [], toggle:["Clock"]}
					// },
				]
			}
		},
		{
			module: "MMM-ViewNotifications",
			position: "top_left",
			header: "Notifications",
			config: {
				// See below for Configuration Options
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
	module.exports = config;
}
