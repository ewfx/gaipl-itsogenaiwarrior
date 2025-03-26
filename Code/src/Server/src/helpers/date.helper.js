'use strict';

exports.getCurrentTimeinTimeStamp = () => {
    return new Date().getTime();
};

exports.convertDateToTimeStamp = date => {
    return new Date(date).getTime();
};

exports.isCurrentTimeGreaterThanTimeStamp = timeStamp => {
    return this.getCurrentTimeinTimeStamp() > timeStamp;
};

exports.addMilliSecondstoCurrentTimeStamp = (ms = 0) => {
    return this.getCurrentTimeinTimeStamp() + ms;
};

exports.addSecondstoCurrentTimeStamp = (seconds = 0) => {
    const milliSeconds =
        seconds * global.APP_DATA.MAGIC_NUMBERS.MILLI_SECONDS_FOR_SECONDS;

    return this.getCurrentTimeinTimeStamp() + milliSeconds;
};

exports.getCurrentTimestampInISOFormat = () => {
    return new Date().toISOString();
};
