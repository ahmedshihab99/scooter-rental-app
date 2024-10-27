const ScooterService = {
  getAllScooters: async () => {
    // Replace with actual API call
    return [
      { id: 1, name: "Scooter 1", status: "Active" },
      { id: 2, name: "Scooter 2", status: "Inactive" },
    ];
  },

  activateScooter: async (scooterId) => {
    // Replace with actual API call to activate scooter
    console.log(`Activating scooter ${scooterId}`);
    return { success: true };
  },

  deactivateScooter: async (scooterId) => {
    // Replace with actual API call to deactivate scooter
    console.log(`Deactivating scooter ${scooterId}`);
    return { success: true };
  },
};

export default ScooterService;
