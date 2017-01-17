import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
    //If you have settings.json, you must set mailUrl in there
    // process.env.MAIL_URL = Meteor.settings.mailUrl;
    process.env.MAIL_URL = "smtp://postmaster%40postmaster@sandbox91662a21dcc04b3f8a25b0eb04600535.mailgun.org.mailgun.org:361e747cf7495380b490e52f0e677cca@smtp.mailgun.org:587";
});