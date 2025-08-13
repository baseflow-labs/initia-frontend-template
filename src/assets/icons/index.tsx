import {
  aidsIcon,
  archiveIcon,
  attachmentIcon,
  beneficiariesIcon,
  contactIcon,
  contactUsIcon,
  dashboardIcon,
  dateIcon,
  deleteIcon,
  dependantIcon,
  dependantWhiteIcon,
  deviceIcon,
  dropdownDotsIcon,
  editIcon,
  excelIcon,
  filterIcon,
  furnitureIcon,
  grandAidIcon,
  helpIcon,
  infoIcon,
  locationIcon,
  membershipFormIcon,
  menuBarsIcon,
  messagesIcon,
  mutedStarIcon,
  notificationsIcon,
  pdfIcon,
  pickedStarIcon,
  profileIcon,
  resetFilterIcon,
  riyalIcon,
  searchIcon,
  settingsIcon,
  successIcon,
  supportIcon,
  takePhotoIcon,
  viewIcon,
  visitReportIcon,
  visitsIcon,
} from "./icons";

interface Props {
  icon:
    | "riyal"
    | "search"
    | "visits"
    | "view"
    | "visitReport"
    | "aids"
    | "archive"
    | "attachment"
    | "beneficiaries"
    | "menuBars"
    | "dashboard"
    | "date"
    | "delete"
    | "dependant"
    | "dependantWhite"
    | "device"
    | "dropdownDots"
    | "edit"
    | "excel"
    | "filter"
    | "furniture"
    | "grandAid"
    | "help"
    | "info"
    | "location"
    | "membershipForm"
    | "messages"
    | "mutedStar"
    | "notifications"
    | "pdf"
    | "pickedStar"
    | "profile"
    | "resetFilter"
    | "settings"
    | "success"
    | "support"
    | "contact"
    | "contactUs"
    | "takePhoto";
}

const IconComp = ({ icon }: Props) => {
  const iconName = () => {
    switch (icon) {
      case "riyal":
        return riyalIcon;
      case "search":
        return searchIcon;
      case "visits":
        return visitsIcon;
      case "view":
        return viewIcon;
      case "visitReport":
        return visitReportIcon;
      case "aids":
        return aidsIcon;
      case "archive":
        return archiveIcon;
      case "attachment":
        return attachmentIcon;
      case "beneficiaries":
        return beneficiariesIcon;
      case "menuBars":
        return menuBarsIcon;
      case "dashboard":
        return dashboardIcon;
      case "date":
        return dateIcon;
      case "delete":
        return deleteIcon;
      case "dependant":
        return dependantIcon;
      case "dependantWhite":
        return dependantWhiteIcon;
      case "device":
        return deviceIcon;
      case "dropdownDots":
        return dropdownDotsIcon;
      case "edit":
        return editIcon;
      case "excel":
        return excelIcon;
      case "filter":
        return filterIcon;
      case "furniture":
        return furnitureIcon;
      case "grandAid":
        return grandAidIcon;
      case "help":
        return helpIcon;
      case "info":
        return infoIcon;
      case "location":
        return locationIcon;
      case "membershipForm":
        return membershipFormIcon;
      case "messages":
        return messagesIcon;
      case "mutedStar":
        return mutedStarIcon;
      case "notifications":
        return notificationsIcon;
      case "pdf":
        return pdfIcon;
      case "pickedStar":
        return pickedStarIcon;
      case "profile":
        return profileIcon;
      case "resetFilter":
        return resetFilterIcon;
      case "settings":
        return settingsIcon;
      case "success":
        return successIcon;
      case "support":
        return supportIcon;
      case "takePhoto":
        return takePhotoIcon;
      case "contact":
        return contactIcon;
      case "contactUs":
        return contactUsIcon;
      default:
        return takePhotoIcon;
    }
  };

  return <img src={iconName()} className="w-100" />;
};

export default IconComp;
