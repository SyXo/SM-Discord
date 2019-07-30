const PresenceModule = require('./PresenceModule');
const moment = require('moment');

module.exports = (data) => {
    var startTimeStamp = data.time == null ? false : startTime(data.time)
    var endTimeStamp = (data.time == null || data.totTime == null) ? false : endTime(data.time, data.totTime)

    const template = {
        details: data.name,
        state: data.options,
        startTimestamp: startTimeStamp,
        endTimestamp: endTimeStamp,
        largeImageKey: 'logo',
        largeImageText: 'Смотрит аниме',
        smallImageKey: 'ava',
        smallImageText: 'SM Discord',
        instance: false
    }

    PresenceModule.setRPC(data.type, `605777473694597121`, template);
}

function startTime(time) {
    let date = new Date();
    const [h, m, s] = time.split(':');
    if (!m) {
        if (h) date.setSeconds(date.getSeconds() - h);
    } else if (!s) {
        if (h) date.setMinutes(date.getMinutes() - h);
        if (m) date.setSeconds(date.getSeconds() - m);
    } else {
        if (h) date.setHours(date.getHours() - h);
        if (m) date.setMinutes(date.getMinutes() - m);
        if (s) date.setSeconds(date.getSeconds() - s);
    }
    return date;
}

function endTime(time, totTime) {
    let date = new Date();
    const [h, m, s] = time.split(':');
    if (!m) {
        if (h) date.setSeconds(date.getSeconds() - h);
    } else if (!s) {
        if (h) date.setMinutes(date.getMinutes() - h);
        if (m) date.setSeconds(date.getSeconds() - m);
    } else {
        if (h) date.setHours(date.getHours() - h);
        if (m) date.setMinutes(date.getMinutes() - m);
        if (s) date.setSeconds(date.getSeconds() - s);
    }
    const [ht, mt, st] = totTime.split(':');
    if (!mt) {
        date = moment(date).add(ht, 's').toDate();
    } else if (!st) {
        date = moment(date).add(mt, 's').add(ht, 'm').toDate();
    } else {
        date = moment(date).add(st, 's').add(mt, 'm').add(ht, 'h').toDate();
    }
    return date;
}