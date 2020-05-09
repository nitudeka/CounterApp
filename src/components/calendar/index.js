import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {getExpenses} from '../../store/actions';
import moment from 'moment';
import {colorPrimary, colorBlack, colorWhite} from '../../util/styleVars';

const getDates = (startTime, today) => {
  const dates = [];
  const totalDaysFromLastMonth = moment(startTime)
    .startOf('month')
    .get('day');
  const lastDateOfLastMonth = moment(startTime)
    .add(-1, 'month')
    .endOf('month')
    .get('date');
  const daysInCurrentMonth = moment(startTime)
    .endOf('month')
    .get('date');
  const lastDay =
    moment(startTime)
      .endOf('month')
      .get('day') + 1;

  for (
    let i = lastDateOfLastMonth;
    i > lastDateOfLastMonth - totalDaysFromLastMonth;
    i--
  ) {
    dates.unshift({
      timestamp: moment(i, 'DD').valueOf(),
      value: i,
      status: 'past',
    });
  }
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    dates.push({
      timestamp: moment(i, 'DD').valueOf(),
      value: i,
      status: today === i ? 'today' : 'present',
    });
  }
  for (let i = 1; i <= 7 - lastDay; i++) {
    dates.push({
      timestamp: moment(i, 'DD').valueOf(),
      value: i,
      status: 'future',
    });
  }
  const transformedDates = [];
  const totalDates = dates.length;
  for (let i = 0; i < totalDates / 7; i++) {
    transformedDates.push(dates.splice(0, 7));
  }
  return transformedDates;
};

const Date = ({
  status,
  value,
  activeDate,
  setActiveDate,
  dispatch,
  timestamp,
}) => {
  const today = status === 'today';
  const past = status === 'past';
  const future = status === 'future';
  const isActiveDate = value === activeDate && !past && !future;
  const onPress = () => {
    if (past || future) return;
    setActiveDate(value);
    dispatch(getExpenses(timestamp));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        styles.dateContainer,
        today && styles.todayContainer,
        isActiveDate && styles.activeDateContainer,
      ]}>
      <Text
        style={[
          styles.date,
          today && styles.today,
          isActiveDate && styles.activeDate,
          past && styles.past,
          future && styles.future,
        ]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const Row = ({dates, activeDate, setActiveDate, dispatch}) => {
  const renderDates = dates.map(({value, status, timestamp}, i) => {
    return (
      <Date
        key={i}
        dispatch={dispatch}
        timestamp={timestamp}
        setActiveDate={setActiveDate}
        activeDate={activeDate}
        value={value}
        status={status}
      />
    );
  });
  return <View style={styles.row}>{renderDates}</View>;
};

const Calendar = () => {
  const days = moment.weekdaysShort();
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(moment().valueOf());
  const [today, setToday] = useState(moment(startTime).get('date'));
  const [activeDate, setActiveDate] = useState(today);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const dates = getDates(startTime, today);
    setDates(dates);
  }, [startTime]);

  const rows = dates.map((item, i) => {
    return (
      <Row
        key={i}
        dispatch={dispatch}
        setActiveDate={setActiveDate}
        activeDate={activeDate}
        dates={item}
      />
    );
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.daysContainer}>
        {days.map((item, i) => {
          return (
            <Text key={i} style={styles.day}>
              {item}
            </Text>
          );
        })}
      </View> */}
      {rows}
    </View>
  );
};

const height = 45;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colorWhite.toString(),
    padding: 10,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateContainer: {
    height: height,
    width: height,
    borderRadius: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorWhite.toString(),
    margin: 3,
  },
  date: {
    color: colorPrimary.toString(),
    fontSize: 16,
  },
  todayContainer: {
    borderColor: colorPrimary,
    borderWidth: 1,
  },
  activeDate: {
    color: colorWhite.toString(),
  },
  activeDateContainer: {
    backgroundColor: colorPrimary.toString(),
    elevation: 6,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '700',
    height: height,
    width: height,
  },
  today: {fontWeight: '700'},
  past: {color: colorBlack.fade(0.5).toString(), fontWeight: '700'},
  future: {color: colorBlack.fade(0.5).toString(), fontWeight: '700'},
});

export default Calendar;
