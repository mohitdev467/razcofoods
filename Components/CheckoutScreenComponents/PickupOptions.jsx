import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

// Dummy OptionBox for UI
const OptionBox = ({ label, subLabel, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.optionBox, selected && styles.optionBoxSelected]}
  >
    <Text style={[styles.optionText, selected && styles.selectedText]}>
      {label}
    </Text>
    {subLabel && (
      <Text style={[styles.optionSub, selected && styles.selectedText]}>
        {subLabel}
      </Text>
    )}
  </TouchableOpacity>
);

const PickupOptions = ({
  onDateChange,
  onTimeChange,
  handleLocationChange,
  selectedLocation,
}) => {
  const currentDate = new Date();
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  // ➤ Generate next 5 days
  const nextFiveDays = Array.from({ length: 5 }, (_, i) => {
    const day = new Date();
    day.setDate(currentDate.getDate() + i);
    return {
      label: day.toLocaleDateString("en-US", { weekday: "short" }), // e.g. Wed
      subLabel: day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }), // e.g. Apr 16
      fullDate: day,
    };
  });

  // ➤ Full time slots
  const fullTimeSlots = [
    "9am to 10am",
    "10am to 11am",
    "11am to 12pm",
    "12pm to 1pm",
    "1pm to 2pm",
    "2pm to 3pm",
    "3pm to 4pm",
    "4pm to 5pm",
    "5pm to 6pm",
    "6pm to 7pm",
    "7pm to 8pm",
  ];

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const parseSlotEnd = (slot) => {
    const match = slot.match(/to (\d+)(am|pm)/);
    if (!match) return 0;
    let hour = parseInt(match[1]);
    const period = match[2];
    if (period === "pm" && hour !== 12) hour += 12;
    if (period === "am" && hour === 12) hour = 0;
    return hour;
  };

  const getAvailableSlotsForDate = (selectedDate) => {
    const isToday = selectedDate.toDateString() === new Date().toDateString();

    if (!isToday) return fullTimeSlots;

    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    return fullTimeSlots.filter((slot) => currentHour < parseSlotEnd(slot));
  };

  const handleDateSelect = (day, index) => {
    setSelectedDateIndex(index);
    onDateChange(day); // parent callback
    const filteredSlots = getAvailableSlotsForDate(day);
    setAvailableSlots(filteredSlots);
    if (filteredSlots.length > 0) {
      const firstSlot = filteredSlots[0];
      setSelectedTime(firstSlot);
      onTimeChange(firstSlot);
    }
  };

  const handleTimeSelect = (slot) => {
    setSelectedTime(slot);
    onTimeChange(slot);
  };

  useEffect(() => {
    const today = nextFiveDays[0].fullDate;
    setSelectedDateIndex(0);
    onDateChange(today);
    const filteredSlots = getAvailableSlotsForDate(today);
    setAvailableSlots(filteredSlots);
    if (filteredSlots.length > 0) {
      const firstSlot = filteredSlots[0];
      setSelectedTime(firstSlot);
      onTimeChange(firstSlot);
    }
  }, []);

  return (
    <View style={styles.pickupContainer}>
      {/* Static location selection */}
      <View style={styles.gridRow}>
        <OptionBox
          label="Lindsay"
          selected={selectedLocation === "Lindsay"}
          onPress={() => handleLocationChange("Lindsay")}
        />
        <OptionBox
          label="Firebaugh"
          selected={selectedLocation === "Firebaugh"}
          onPress={() => handleLocationChange("Firebaugh")}
        />
      </View>

      {/* Dynamic date selection */}
      {nextFiveDays
        .reduce((rows, day, idx) => {
          if (idx % 2 === 0) rows.push([]);
          rows[rows.length - 1].push({ ...day, idx });
          return rows;
        }, [])
        .map((row, rowIndex) => (
          <View style={styles.gridRow} key={rowIndex}>
            {row.map((day, i) => (
              <OptionBox
                key={i}
                label={day.label}
                subLabel={day.subLabel}
                selected={selectedDateIndex === day.idx}
                onPress={() => handleDateSelect(day.fullDate, day.idx)}
              />
            ))}
          </View>
        ))}

      <Text style={styles.timeHeading}>Select Time Slot</Text>
      <View style={styles.timeSlots}>
        {availableSlots.map((slot, index) => (
          <TouchableOpacity key={index} onPress={() => handleTimeSelect(slot)}>
            <Text
              style={[
                styles.timeSlot,
                selectedTime === slot && styles.activeTime,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PickupOptions;

const styles = StyleSheet.create({
  pickupContainer: {
    gap: rh(2),
  },
  gridRow: {
    flexDirection: "row",
    gap: rw(4),
    marginBottom: rh(1),
  },
  optionBox: {
    paddingVertical: rh(2),
    paddingHorizontal: rw(5),
    backgroundColor: "#f1f1f1",
    borderRadius: rw(2),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  optionBoxSelected: {
    backgroundColor: "#00b894",
  },
  optionText: {
    fontSize: rf(2),
    fontWeight: "bold",
    color: "#333",
  },
  selectedText: {
    color: "#fff",
  },
  optionSub: {
    fontSize: rf(1.6),
    color: "#444",
  },
  timeHeading: {
    fontSize: rf(2.2),
    fontWeight: "600",
    marginVertical: rh(2),
  },
  timeSlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: rw(4),
  },
  timeSlot: {
    padding: rw(3),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: rw(2),
    fontSize: rf(2),
    color: "#444",
    width: Responsive.widthPx(35),
  },
  activeTime: {
    backgroundColor: "#00b894",
    color: "#fff",
    borderColor: "#00b894",
  },
});
