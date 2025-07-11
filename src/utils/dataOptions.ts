export const getAidTypes = (t: Function) => [
  {
    value: "Cash",
    label: t("Auth.Aids.Cash"),
  },
  {
    value: "In-Kind",
    label: t("Auth.Aids.In-Kind"),
  },
];

export const getAidStatuses = (t: Function) => [
  {
    value: "Pending",
    label: t("Auth.Aids.Statuses.Pending"),
  },
  {
    value: "Granted",
    label: t("Auth.Aids.Statuses.Granted"),
  },
  {
    value: "Rejected",
    label: t("Auth.MembershipRegistration.Statuses.Rejected"),
  },
];

export const getVisitStatuses = (t: Function) => [
  {
    value: "Pending",
    label: t("Auth.Visits.Statuses.Pending"),
  },
  {
    value: "Approved",
    label: t("Auth.Visits.Statuses.Approved"),
  },
  {
    value: "Delayed",
    label: t("Auth.Visits.Statuses.Delayed"),
  },
  {
    value: "Done",
    label: t("Auth.Visits.Statuses.Done"),
  },
  {
    value: "Cancelled",
    label: t("Auth.Visits.Statuses.Cancelled"),
  },
];

export const getNationalities = (t: Function) => [
  {
    value: "Saudi",
    label: t("Auth.MembershipRegistration.Form.Nationality.Saudi"),
  },
  {
    value: "Non Saudi",
    label: t("Auth.MembershipRegistration.Form.Nationality.NonSaudi"),
  },
];

export const getProvinces = (t: Function) => [
  {
    value: "Riyadh",
    label: t("Auth.MembershipRegistration.Form.Province.Riyadh"),
  },
  {
    value: "Makkah",
    label: t("Auth.MembershipRegistration.Form.Province.Makkah"),
  },
  {
    value: "Madinah",
    label: t("Auth.MembershipRegistration.Form.Province.Madinah"),
  },
  {
    value: "Eastern Province",
    label: t("Auth.MembershipRegistration.Form.Province.Eastern Province"),
  },
  {
    value: "Asir",
    label: t("Auth.MembershipRegistration.Form.Province.Asir"),
  },
  {
    value: "Tabuk",
    label: t("Auth.MembershipRegistration.Form.Province.Tabuk"),
  },
  {
    value: "Hail",
    label: t("Auth.MembershipRegistration.Form.Province.Hail"),
  },
  {
    value: "Northern Borders",
    label: t("Auth.MembershipRegistration.Form.Province.NorthernBorders"),
  },
  {
    value: "Jazan",
    label: t("Auth.MembershipRegistration.Form.Province.Jazan"),
  },
  {
    value: "Najran",
    label: t("Auth.MembershipRegistration.Form.Province.Najran"),
  },
  {
    value: "Al-Bahah",
    label: t("Auth.MembershipRegistration.Form.Province.AlBahah"),
  },
  {
    value: "Al-Jawf",
    label: t("Auth.MembershipRegistration.Form.Province.AlJawf"),
  },
  {
    value: "Al-Qassim",
    label: t("Auth.MembershipRegistration.Form.Province.AlQassim"),
  },
];

export const getHomeTypes = (t: Function) => [
  {
    value: "Apartment",
    label: t("Auth.MembershipRegistration.Form.HomeType.Apartment"),
  },
  {
    value: "Villa",
    label: t("Auth.MembershipRegistration.Form.HomeType.Villa"),
  },
  {
    value: "Independent Home",
    label: t("Auth.MembershipRegistration.Form.HomeType.IndependentHome"),
  },
  {
    value: "Folk House",
    label: t("Auth.MembershipRegistration.Form.HomeType.FolkHouse"),
  },
  {
    value: "Room(s) in Shared House",
    label: t("Auth.MembershipRegistration.Form.HomeType.SharedHouse"),
  },
  {
    value: "Roof",
    label: t("Auth.MembershipRegistration.Form.HomeType.Roof"),
  },
  {
    value: "Caravan",
    label: t("Auth.MembershipRegistration.Form.HomeType.Caravan"),
  },
  {
    value: "Incomplete Building",
    label: t("Auth.MembershipRegistration.Form.HomeType.IncompleteBuilding"),
  },
  {
    value: "No Permanent Home",
    label: t("Auth.MembershipRegistration.Form.HomeType.NoPermanentHome"),
  },
];

export const getBeneficiaryStatuses = (t: Function) => [
  {
    value: "New Member",
    label: t("Auth.MembershipRegistration.Statuses.NewMember"),
  },
  {
    value: "Incomplete",
    label: t("Auth.MembershipRegistration.Statuses.Incomplete"),
  },
  {
    value: "Need Help",
    label: t("Auth.MembershipRegistration.Statuses.NeedHelp"),
  },
  {
    value: "Rejected",
    label: t("Auth.MembershipRegistration.Statuses.Rejected"),
  },
  {
    value: "Reviewed",
    label: t("Auth.MembershipRegistration.Statuses.Reviewed"),
  },
  {
    value: "Cancelled",
    label: t("Auth.MembershipRegistration.Statuses.Cancelled"),
  },
  {
    value: "Accepted",
    label: t("Auth.MembershipRegistration.Statuses.Accepted"),
  },
  {
    value: "In Preview",
    label: t("Auth.MembershipRegistration.Statuses.InPreview"),
  },
];

export const getGenders = (t: Function) => [
  {
    value: "Male",
    label: t("Auth.MembershipRegistration.Form.Gender.Male"),
  },
  {
    value: "Female",
    label: t("Auth.MembershipRegistration.Form.Gender.Female"),
  },
];

export const getDependentRelations = (t: Function) => [
  {
    value: "Spouse",
    label: t("Auth.MembershipRegistration.Form.Relation.Spouse"),
  },
  {
    value: "Parent",
    label: t("Auth.MembershipRegistration.Form.Relation.Parent"),
  },
  {
    value: "Child",
    label: t("Auth.MembershipRegistration.Form.Relation.Child"),
  },
  {
    value: "Sibling",
    label: t("Auth.MembershipRegistration.Form.Relation.Sibling"),
  },
  {
    value: "Grandparent",
    label: t("Auth.MembershipRegistration.Form.Relation.Grandparent"),
  },
  {
    value: "Grandchild",
    label: t("Auth.MembershipRegistration.Form.Relation.Grandchild"),
  },
  {
    value: "Paternal Uncle / Aunt",
    label: t("Auth.MembershipRegistration.Form.Relation.PaternalUncleAunt"),
  },
  {
    value: "Maternal Uncle / Aunt",
    label: t("Auth.MembershipRegistration.Form.Relation.MaternalUncleAunt"),
  },
  {
    value: "InLow",
    label: t("Auth.MembershipRegistration.Form.Relation.InLow"),
  },
  {
    value: "None",
    label: t("Auth.MembershipRegistration.Form.Relation.None"),
  },
];

export const getAgeGroups = (t: Function) => [
  {
    value: "Below 5",
    label: t("Auth.MembershipRegistration.Form.AgeGroup.BelowFive"),
  },
  {
    value: "5 - 12",
    label: t("Auth.MembershipRegistration.Form.AgeGroup.FiveToTwelve"),
  },
  {
    value: "12 - 18",
    label: t("Auth.MembershipRegistration.Form.AgeGroup.TwelveToEighteen"),
  },
  {
    value: "18 - 30",
    label: t("Auth.MembershipRegistration.Form.AgeGroup.EighteenToThirty"),
  },
  {
    value: "30 - 45",
    label: t("Auth.MembershipRegistration.Form.AgeGroup.ThirtyToFortyFive"),
  },
  {
    value: "45 - 60",
    label: t("Auth.MembershipRegistration.Form.AgeGroup.FortyFiveToSixty"),
  },
  {
    value: "Above 60",
    label: t("Auth.MembershipRegistration.Form.AgeGroup.AboveSixty"),
  },
];

export const getHealthStatuses = (t: Function) => [
  {
    value: "Healthy",
    label: t("Auth.MembershipRegistration.Form.HealthStatus.Healthy"),
  },
  {
    value: "Sick",
    label: t("Auth.MembershipRegistration.Form.HealthStatus.Sick"),
  },
];

export const getDiseases = (t: Function) => [
  {
    value: "Disability",
    label: t("Auth.MembershipRegistration.Form.Diseases.Disability"),
  },
  {
    value: "Hearing Impairment",
    label: t("Auth.MembershipRegistration.Form.Diseases.HearingImpairment"),
  },
  {
    value: "Visual Impairment",
    label: t("Auth.MembershipRegistration.Form.Diseases.VisualImpairment"),
  },
  {
    value: "Mental Disability",
    label: t("Auth.MembershipRegistration.Form.Diseases.MentalDisability"),
  },
  {
    value: "Chronic Diseases",
    label: t("Auth.MembershipRegistration.Form.Diseases.ChronicDiseases"),
  },
  {
    value: "Neurological Diseases",
    label: t("Auth.MembershipRegistration.Form.Diseases.NeurologicalDiseases"),
  },
  {
    value: "Genetic Diseases",
    label: t("Auth.MembershipRegistration.Form.Diseases.GeneticDiseases"),
  },
  {
    value: "Cancerous",
    label: t("Auth.MembershipRegistration.Form.Diseases.Cancerous"),
  },
  {
    value: "Chest Diseases",
    label: t("Auth.MembershipRegistration.Form.Diseases.ChestDiseases"),
  },
  {
    value: "Liver Diseases",
    label: t("Auth.MembershipRegistration.Form.Diseases.LiverDiseases"),
  },
  {
    value: "Skin Diseases",
    label: t("Auth.MembershipRegistration.Form.Diseases.SkinDiseases"),
  },
];

export const getYesNo = (t: Function) => [
  { value: "Yes", label: t("Global.Form.Labels.Yes") },
  { value: "No", label: t("Global.Form.Labels.No") },
];

export const getSocialStatuses = (t: Function) => [
  {
    value: "Single",
    label: t("Auth.MembershipRegistration.Form.SocialStatus.Single"),
  },
  {
    value: "Married",
    label: t("Auth.MembershipRegistration.Form.SocialStatus.Married"),
  },
  {
    value: "Divorced",
    label: t("Auth.MembershipRegistration.Form.SocialStatus.Divorced"),
  },
  {
    value: "Widower",
    label: t("Auth.MembershipRegistration.Form.SocialStatus.Widower"),
  },
];

export const getHomeOwnerships = (t: Function) => [
  {
    value: "Rental",
    label: t("Auth.MembershipRegistration.Form.HomeOwnership.Rental"),
  },
  {
    value: "Ownership",
    label: t("Auth.MembershipRegistration.Form.HomeOwnership.Ownership"),
  },
];

export const getHomeRentalPayees = (t: Function) => [
  {
    value: "Self",
    label: t("Auth.MembershipRegistration.Form.Payee.Self"),
  },
  {
    value: "Relative",
    label: t("Auth.MembershipRegistration.Form.Payee.Relative"),
  },
  {
    value: "Society",
    label: t("Auth.MembershipRegistration.Form.Payee.Society"),
  },
  {
    value: "Government",
    label: t("Auth.MembershipRegistration.Form.Payee.Government"),
  },
  {
    value: "Installment",
    label: t("Auth.MembershipRegistration.Form.Payee.Installment"),
  },
  {
    value: "Free",
    label: t("Auth.MembershipRegistration.Form.Payee.Free"),
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

export const getBeneficiaryCategories = (t: Function) => [
  {
    value: "A",
    label: t("Auth.MembershipRegistration.Form.Category.A"),
  },
  {
    value: "B",
    label: t("Auth.MembershipRegistration.Form.Category.B"),
  },
  {
    value: "C",
    label: t("Auth.MembershipRegistration.Form.Category.C"),
  },
  {
    value: "D",
    label: t("Auth.MembershipRegistration.Form.Category.D"),
  },
  {
    value: "Uncategorized",
    label: t("Auth.MembershipRegistration.Form.Category.Uncategorized"),
  },
  {
    value: "Above Grading",
    label: t("Auth.MembershipRegistration.Form.Category.AboveGrading"),
  },
];

export const getOccupations = (t: Function) => [
  {
    value: "Government Employee",
    label: t("Auth.MembershipRegistration.Form.Occupation.GovernmentEmployee"),
  },
  {
    value: "Private-Sector Employee",
    label: t(
      "Auth.MembershipRegistration.Form.Occupation.PrivateSectorEmployee"
    ),
  },
  {
    value: "Per-Day Worker",
    label: t("Auth.MembershipRegistration.Form.Occupation.PerDayWorker"),
  },
  {
    value: "No Fixed",
    label: t("Auth.MembershipRegistration.Form.Occupation.NoFixed"),
  },
  {
    value: "Looking For Job",
    label: t("Auth.MembershipRegistration.Form.Occupation.LookingForJob"),
  },
  {
    value: "Retiree",
    label: t("Auth.MembershipRegistration.Form.Occupation.Retiree"),
  },
  {
    value: "Student",
    label: t("Auth.MembershipRegistration.Form.Occupation.Student"),
  },
  {
    value: "Housewife",
    label: t("Auth.MembershipRegistration.Form.Occupation.Housewife"),
  },
  {
    value: "Unemployed",
    label: t("Auth.MembershipRegistration.Form.Occupation.Unemployed"),
  },
  {
    value: "Unable To Work",
    label: t("Auth.MembershipRegistration.Form.Occupation.UnableToWork"),
  },
];

export const getEducationLevels = (t: Function) => [
  {
    value: "Illiterate",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.Illiterate"),
  },
  {
    value: "Literate",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.Literate"),
  },
  {
    value: "Primary School",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.PrimarySchool"),
  },
  {
    value: "Intermediate School",
    label: t(
      "Auth.MembershipRegistration.Form.EducationLevel.IntermediateSchool"
    ),
  },
  {
    value: "High School",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.HighSchool"),
  },
  {
    value: "Diploma",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.Diploma"),
  },
  {
    value: "Degree",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.Degree"),
  },
  {
    value: "Higher Diploma",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.HigherDiploma"),
  },
  {
    value: "Master",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.Master"),
  },
  {
    value: "Phd",
    label: t("Auth.MembershipRegistration.Form.EducationLevel.Phd"),
  },
];

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
