export const yesNoOptions = (t: (value: string) => string) => [
  { value: 'Yes', label: t('Global.Form.Labels.Yes') },
  { value: 'No', label: t('Global.Form.Labels.No') },
];

export function devices(t: (value: string) => string) {
  return [
    {
      value: 'TV',
      label: t('Auth.Visits.Detail.Devices.TV'),
    },
    {
      value: 'AC',
      label: t('Auth.Visits.Detail.Devices.AC'),
    },
  ];
}

export function furniture(t: (value: string) => string) {
  return [
    {
      value: 'Table',
      label: t('Auth.Visits.Detail.Furniture.table'),
    },
    {
      value: 'Sofas',
      label: t('Auth.Visits.Detail.Furniture.sofas'),
    },
    {
      value: 'Bed',
      label: t('Auth.Visits.Detail.Furniture.bed'),
    },
  ];
}

export function deviceStatuses(t: (value: string) => string) {
  return [
    {
      value: 'Working',
      label: t('Auth.Visits.Detail.Devices.working'),
    },
    {
      value: 'Not Working',
      label: t('Auth.Visits.Detail.Devices.notWorking'),
    },
  ];
}

export function roomType(t: (value: string) => string, value: string) {
  const roomTypeMapping: { [key: string]: string } = {
    Kitchen: t('Auth.Visits.Detail.Room.kitchen'),
    Bathroom: t('Auth.Visits.Detail.Room.bathroom'),
    Bedroom: t('Auth.Visits.Detail.Room.bedroom'),
    LivingRoom: t('Auth.Visits.Detail.Room.LivingRoom'),
  };
  return roomTypeMapping[value];
}

export const beneficiaryTabs = (t: (value: string) => string) => [];
