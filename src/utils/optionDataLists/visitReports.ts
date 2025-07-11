export const getRoomContentTypes = (t: Function) => [
  {
    value: "Device",
    label: t("Auth.Visits.Report.Device"),
    subList: getRoomDeviceContents(t),
  },
  {
    value: "Furniture",
    label: t("Auth.Visits.Report.Furniture"),
    subList: getRoomFurnitureContents(t),
  },
];

export const getRoomTypes = (t: Function) => [
  { value: "Entry", label: t("Auth.Visits.Report.Entry") },
  { value: "Living Room", label: t("Auth.Visits.Report.LivingRoom") },
  { value: "Dining Room", label: t("Auth.Visits.Report.DiningRoom") },
  { value: "Bedroom", label: t("Auth.Visits.Report.Bedroom") },
  { value: "Kitchen", label: t("Auth.Visits.Report.Kitchen") },
  { value: "Bathroom", label: t("Auth.Visits.Report.Bathroom") },
  { value: "Maid Room", label: t("Auth.Visits.Report.MaidRoom") },
  { value: "Storage", label: t("Auth.Visits.Report.Storage") },
  { value: "Laundry", label: t("Auth.Visits.Report.Laundry") },
  { value: "Guest Room", label: t("Auth.Visits.Report.GuestRoom") },
  { value: "Prayer Room", label: t("Auth.Visits.Report.PrayerRoom") },
  { value: "Hallway", label: t("Auth.Visits.Report.Hallway") },
  { value: "Balcony", label: t("Auth.Visits.Report.Balcony") },
];

export const getRoomDeviceContents = (t: Function) => [
  { label: t("Auth.Visits.Report.Fridge"), value: "Fridge" },
  { label: t("Auth.Visits.Report.Freezer"), value: "Freezer" },
  { label: t("Auth.Visits.Report.Oven"), value: "Oven" },
  { label: t("Auth.Visits.Report.Microwave"), value: "Microwave" },
  {
    label: t("Auth.Visits.Report.AirConditioner"),
    value: "Air Conditioner",
  },
  {
    label: t("Auth.Visits.Report.WashingMachine"),
    value: "Washing Machine",
  },
  { label: t("Auth.Visits.Report.Dishwasher"), value: "Dishwasher" },
  { label: t("Auth.Visits.Report.WaterHeater"), value: "Water Heater" },
  { label: t("Auth.Visits.Report.TV"), value: "TV" },
  { label: t("Auth.Visits.Report.Router"), value: "Router" },
];

export const getRoomFurnitureContents = (t: Function) => [
  { label: t("Auth.Visits.Report.DiningTable"), value: "Dining Table" },
  { label: t("Auth.Visits.Report.Sofa"), value: "Sofa" },
  { label: t("Auth.Visits.Report.Bed"), value: "Bed" },
  { label: t("Auth.Visits.Report.Wardrobe"), value: "Wardrobe" },
  {
    label: t("Auth.Visits.Report.DressingTable"),
    value: "Dressing Table",
  },
  { label: t("Auth.Visits.Report.Desk"), value: "Desk" },
  { label: t("Auth.Visits.Report.Shelf"), value: "Shelf" },
  { label: t("Auth.Visits.Report.Nightstand"), value: "Nightstand" },
  { label: t("Auth.Visits.Report.PrayerMat"), value: "Prayer Mat" },
  { label: t("Auth.Visits.Report.ShoeRack"), value: "Shoe Rack" },
];

export const getRoomContentStatuses = (t: Function) => [
  { value: "Working", label: t("Auth.Visits.Report.Working") },
  { value: "Not Working", label: t("Auth.Visits.Report.NotWorking") },
  {
    value: "Needs Maintenance",
    label: t("Auth.Visits.Report.NeedsMaintenance"),
  },
];
