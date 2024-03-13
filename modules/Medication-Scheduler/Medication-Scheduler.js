/* Magic Mirror
 * Module: Medication-Scheduler
 *
 * By Lyba Mughees
 * MIT Licensed.
 */

/* global Module, Log */

Module.register("Medication-Scheduler", {
  defaults: {
    passcode: "1234", // Set your default passcode here
    locked: false
  },

  start: function () {
    Log.info("Medication-Scheduler module started...");
    // Fetch medication options when the module starts
    this.sendSocketNotification("GET_MEDICATIONS");
  },

  notificationReceived: function (notification, payload) {
    // if (notification === "UNLOCK_MEDICATION_SCHEDULER") {
    //     this.config.locked = false;
    //     this.updateDom();
    // } else if (notification === "LOCK_MEDICATION_SCHEDULER") {
    //     this.config.locked = true;
    //     this.updateDom();
    // }
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "MEDICATION_DATA_FOUND") {
      this.medicationData = payload;
      this.updateDom();
    } else if (notification === "MEDICATION_OPTIONS") {
      // Update the medication dropdown list with options received from the backend
      this.updateMedicationOptions(payload);
    }
  },

  log: function (data) {
    this.sendSocketNotification("LOG", data);
  },

  getStyles: function () {
    return ["Medication-Scheduler.css"];
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.className = "medication-scheduler";

    if (this.config.locked) {

    }
    else {

      this.sendSocketNotification("GET_MEDICATIONS");
      this.updateDom();
      // Select medication ID input field
      const medicationIdInput = document.createElement("input");
      medicationIdInput.type = "hidden"; // Hide the input field
      medicationIdInput.id = "medication-id-input"; // Set an ID for easy selection if needed
      wrapper.appendChild(medicationIdInput);

      // Select medication dropdown list
      const medicationDropdown = document.createElement("select");
      medicationDropdown.className = "medication-select";
      medicationDropdown.addEventListener("change", () => {
        // Set the value of the medication ID input field to the selected medication's ID
        medicationIdInput.value = medicationDropdown.value;
      });
      wrapper.appendChild(medicationDropdown);

      // Select days
      const daysSelect = document.createElement("select");
      daysSelect.multiple = true;
      daysSelect.className = "medication-select";
      daysSelect.size = 7; // Set the size to display all options without scrolling
      const daysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      daysOptions.forEach((day) => {
        const option = document.createElement("option");
        option.value = day;
        option.text = day;
        daysSelect.appendChild(option);
      });
      wrapper.appendChild(daysSelect);

      // Select times
      const timesSelect = document.createElement("select");
      timesSelect.multiple = true;
      timesSelect.className = "medication-select";
      timesSelect.size = 7;
      // Create options for all hours and minutes
      for (let hours = 0; hours <= 23; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
          const formattedTime = `${(hours < 10 ? '0' : '') + hours}:${(minutes === 0 ? '00' : minutes)}`;
          const option = document.createElement("option");
          option.value = formattedTime;
          option.text = formattedTime;
          timesSelect.appendChild(option);
        }
      }
      wrapper.appendChild(timesSelect);


      wrapper.appendChild(timesSelect);

      // Schedule button
      const scheduleButton = document.createElement("button");
      scheduleButton.innerText = "Schedule Medication";
      scheduleButton.className = "medication-button";
      scheduleButton.addEventListener("click", () => {
        const medicationIdValue = medicationDropdown.value.trim(); // Get the selected medication's ID
        const selectedDays = Array.from(daysSelect.selectedOptions).map((option) => option.value);
        const selectedTimes = Array.from(timesSelect.selectedOptions).map((option) => option.value);


        this.sendSocketNotification("SCHEDULE_MEDICATION", { medication_id: medicationIdValue, days: selectedDays, times: selectedTimes });
        //Prepare medication data objects for each day-time combination
        const medicationData = [];
        selectedDays.forEach(day => {
          selectedTimes.forEach(time => {
            medicationData.push({
              medication_id: medicationIdValue,
              day: this.convertDayToNumber(day), // Convert day to number (0 for Sunday, 1 for Monday, etc.)
              time: time
            });
          });
        });

        // Send schedule data to the cloud
        this.sendNotification("CLOUD_PUSH_SCHEDULE", {
          patient_id: "b6673aee-c9d8-11ee-8491-029e9cf81533",
          cabinet_id: "b45569c2-c9d9-11ee-8491-029e9cf81533",
          medications: medicationData
        });
        this.log(medicationData);


      });

      wrapper.appendChild(scheduleButton);

      // Delete schedule button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete Schedule";
      deleteButton.className = "medication-button";
      deleteButton.addEventListener("click", () => {
        const medicationIdValue = medicationDropdown.value.trim(); // Get the selected medication's ID
        const selectedDays = Array.from(daysSelect.selectedOptions).map((option) => option.value);
        const selectedTimes = Array.from(timesSelect.selectedOptions).map((option) => option.value);
        this.sendSocketNotification("DELETE_SCHEDULE", { medication_id: medicationIdValue, days: selectedDays, times: selectedTimes });
      });
      wrapper.appendChild(deleteButton);

      // Lock button
      const lockButton = document.createElement("button");
      lockButton.innerText = "Lock";
      lockButton.className = "medication-button";
      lockButton.addEventListener("click", () => {
        this.config.locked = true;
        this.sendNotification("LOCK_MEDICATION_INPUT");
        this.updateDom();
      });
      wrapper.appendChild(lockButton);
    }
    return wrapper;

  },

  updateMedicationOptions: function (medications) {
    const medicationDropdown = document.querySelector(".medication-select");
    // Clear existing options
    medicationDropdown.innerHTML = '';
    // Add new options
    medications.forEach(medication => {
      const option = document.createElement("option");
      option.value = medication.medication_id;
      option.text = `${medication.brand_name} (${medication.generic_name})`;
      medicationDropdown.appendChild(option);
    });
  },


  // Helper function to convert day name to number (0 for Sunday, 1 for Monday, etc.)
  convertDayToNumber: function (dayName) {
    const dayMap = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6,
    };
    return dayMap[dayName];
  }
});
