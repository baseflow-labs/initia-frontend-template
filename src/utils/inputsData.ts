import moment from 'moment';
import { InputSingleProps } from '../components/form';
import { dataDateFormat } from './consts';

export const socialStatusOptions = (t: (value: string) => string) => [
  {
    value: 'Single',
    label: t('Auth.MembershipRegistration.Form.SocialStatus.Single'),
  },
  {
    value: 'Married',
    label: t('Auth.MembershipRegistration.Form.SocialStatus.Married'),
  },
  {
    value: 'Divorced',
    label: t('Auth.MembershipRegistration.Form.SocialStatus.Divorced'),
  },
  {
    value: 'Widower',
    label: t('Auth.MembershipRegistration.Form.SocialStatus.Widower'),
  },
];

export const nationalityOptions = (t: (value: string) => string) => [
  {
    value: 'Saudi',
    label: t('Auth.MembershipRegistration.Form.Nationality.Saudi'),
  },
  {
    value: 'Non Saudi',
    label: t('Auth.MembershipRegistration.Form.Nationality.NonSaudi'),
  },
];

const genderOptions = (t: (value: string) => string) => [
  {
    value: 'Male',
    label: t('Auth.MembershipRegistration.Form.Gender.Male'),
  },
  {
    value: 'Female',
    label: t('Auth.MembershipRegistration.Form.Gender.Female'),
  },
];

export const healthStatusOptions = (t: (value: string) => string) => [
  {
    value: 'Healthy',
    label: t('Auth.MembershipRegistration.Form.HealthStatus.Healthy'),
  },
  {
    value: 'Sick',
    label: t('Auth.MembershipRegistration.Form.HealthStatus.Sick'),
  },
];

export const diseasesOptions = (t: (value: string) => string) => [
  {
    value: 'Disability',
    label: t('Auth.MembershipRegistration.Form.Diseases.Disability'),
  },
  {
    value: 'Hearing Impairment',
    label: t('Auth.MembershipRegistration.Form.Diseases.HearingImpairment'),
  },
  {
    value: 'Visual Impairment',
    label: t('Auth.MembershipRegistration.Form.Diseases.VisualImpairment'),
  },
  {
    value: 'Mental Disability',
    label: t('Auth.MembershipRegistration.Form.Diseases.MentalDisability'),
  },
  {
    value: 'Chronic Diseases',
    label: t('Auth.MembershipRegistration.Form.Diseases.ChronicDiseases'),
  },
  {
    value: 'Neurological Diseases',
    label: t('Auth.MembershipRegistration.Form.Diseases.NeurologicalDiseases'),
  },
  {
    value: 'Genetic Diseases',
    label: t('Auth.MembershipRegistration.Form.Diseases.GeneticDiseases'),
  },
  {
    value: 'Cancerous',
    label: t('Auth.MembershipRegistration.Form.Diseases.Cancerous'),
  },
  {
    value: 'Chest Diseases',
    label: t('Auth.MembershipRegistration.Form.Diseases.ChestDiseases'),
  },
  {
    value: 'Liver Diseases',
    label: t('Auth.MembershipRegistration.Form.Diseases.LiverDiseases'),
  },
  {
    value: 'Skin Diseases',
    label: t('Auth.MembershipRegistration.Form.Diseases.SkinDiseases'),
  },
];

export const occupationOptions = (t: (value: string) => string) => [
  {
    value: 'Government Employee',
    label: t('Auth.MembershipRegistration.Form.Occupation.GovernmentEmployee'),
  },
  {
    value: 'Private-Sector Employee',
    label: t(
      'Auth.MembershipRegistration.Form.Occupation.PrivateSectorEmployee'
    ),
  },
  {
    value: 'Per-Day Worker',
    label: t('Auth.MembershipRegistration.Form.Occupation.PerDayWorker'),
  },
  {
    value: 'No Fixed',
    label: t('Auth.MembershipRegistration.Form.Occupation.NoFixed'),
  },
  {
    value: 'Looking For Job',
    label: t('Auth.MembershipRegistration.Form.Occupation.LookingForJob'),
  },
  {
    value: 'Retiree',
    label: t('Auth.MembershipRegistration.Form.Occupation.Retiree'),
  },
  {
    value: 'Student',
    label: t('Auth.MembershipRegistration.Form.Occupation.Student'),
  },
  {
    value: 'Housewife',
    label: t('Auth.MembershipRegistration.Form.Occupation.Housewife'),
  },
  {
    value: 'Unemployed',
    label: t('Auth.MembershipRegistration.Form.Occupation.Unemployed'),
  },
  {
    value: 'Unable To Work',
    label: t('Auth.MembershipRegistration.Form.Occupation.UnableToWork'),
  },
];

export const educationOptions = (t: (value: string) => string) => [
  {
    value: 'Illiterate',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.Illiterate'),
  },
  {
    value: 'Literate',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.Literate'),
  },
  {
    value: 'Primary School',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.PrimarySchool'),
  },
  {
    value: 'Intermediate School',
    label: t(
      'Auth.MembershipRegistration.Form.EducationLevel.IntermediateSchool'
    ),
  },
  {
    value: 'High School',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.HighSchool'),
  },
  {
    value: 'Diploma',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.Diploma'),
  },
  {
    value: 'Degree',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.Degree'),
  },
  {
    value: 'Higher Diploma',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.HigherDiploma'),
  },
  {
    value: 'Master',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.Master'),
  },
  {
    value: 'Phd',
    label: t('Auth.MembershipRegistration.Form.EducationLevel.Phd'),
  },
];

export const provinceOptions = (t: (value: string) => string) => [
  {
    value: 'Riyadh',
    label: t('Auth.MembershipRegistration.Form.Province.Riyadh'),
  },
  {
    value: 'Makkah',
    label: t('Auth.MembershipRegistration.Form.Province.Makkah'),
  },
  {
    value: 'Madinah',
    label: t('Auth.MembershipRegistration.Form.Province.Madinah'),
  },
  {
    value: 'Eastern Province',
    label: t('Auth.MembershipRegistration.Form.Province.Eastern Province'),
  },
  {
    value: 'Asir',
    label: t('Auth.MembershipRegistration.Form.Province.Asir'),
  },
  {
    value: 'Tabuk',
    label: t('Auth.MembershipRegistration.Form.Province.Tabuk'),
  },
  {
    value: 'Hail',
    label: t('Auth.MembershipRegistration.Form.Province.Hail'),
  },
  {
    value: 'Northern Borders',
    label: t('Auth.MembershipRegistration.Form.Province.NorthernBorders'),
  },
  {
    value: 'Jazan',
    label: t('Auth.MembershipRegistration.Form.Province.Jazan'),
  },
  {
    value: 'Najran',
    label: t('Auth.MembershipRegistration.Form.Province.Najran'),
  },
  {
    value: 'Al-Bahah',
    label: t('Auth.MembershipRegistration.Form.Province.AlBahah'),
  },
  {
    value: 'Al-Jawf',
    label: t('Auth.MembershipRegistration.Form.Province.AlJawf'),
  },
  {
    value: 'Al-Qassim',
    label: t('Auth.MembershipRegistration.Form.Province.AlQassim'),
  },
];

export const homeTypeOptions = (t: (value: string) => string) => [
  {
    value: 'Apartment',
    label: t('Auth.MembershipRegistration.Form.HomeType.Apartment'),
  },
  {
    value: 'Villa',
    label: t('Auth.MembershipRegistration.Form.HomeType.Villa'),
  },
  {
    value: 'Independent Home',
    label: t('Auth.MembershipRegistration.Form.HomeType.IndependentHome'),
  },
  {
    value: 'Folk House',
    label: t('Auth.MembershipRegistration.Form.HomeType.FolkHouse'),
  },
  {
    value: 'Room(s) in Shared House',
    label: t('Auth.MembershipRegistration.Form.HomeType.SharedHouse'),
  },
  {
    value: 'Roof',
    label: t('Auth.MembershipRegistration.Form.HomeType.Roof'),
  },
  {
    value: 'Caravan',
    label: t('Auth.MembershipRegistration.Form.HomeType.Caravan'),
  },
  {
    value: 'Incomplete Building',
    label: t('Auth.MembershipRegistration.Form.HomeType.IncompleteBuilding'),
  },
  {
    value: 'No Permanent Home',
    label: t('Auth.MembershipRegistration.Form.HomeType.NoPermanentHome'),
  },
];
export const relationOptions = (t: (value: string) => string) => [
  {
    value: 'Spouse',
    label: t('Auth.MembershipRegistration.Form.Relation.Spouse'),
  },
  {
    value: 'Parent',
    label: t('Auth.MembershipRegistration.Form.Relation.Parent'),
  },
  {
    value: 'Child',
    label: t('Auth.MembershipRegistration.Form.Relation.Child'),
  },
  {
    value: 'Sibling',
    label: t('Auth.MembershipRegistration.Form.Relation.Sibling'),
  },
  {
    value: 'Grandparent',
    label: t('Auth.MembershipRegistration.Form.Relation.Grandparent'),
  },
  {
    value: 'Grandchild',
    label: t('Auth.MembershipRegistration.Form.Relation.Grandchild'),
  },
  {
    value: 'Paternal Uncle / Aunt',
    label: t('Auth.MembershipRegistration.Form.Relation.PaternalUncleAunt'),
  },
  {
    value: 'Maternal Uncle / Aunt',
    label: t('Auth.MembershipRegistration.Form.Relation.MaternalUncleAunt'),
  },
  {
    value: 'InLow',
    label: t('Auth.MembershipRegistration.Form.Relation.InLow'),
  },
  {
    value: 'None',
    label: t('Auth.MembershipRegistration.Form.Relation.None'),
  },
];

export const payeeOptions = (t: (value: string) => string) => [
  {
    value: 'Self',
    label: t('Auth.MembershipRegistration.Form.Payee.Self'),
  },
  {
    value: 'Relative',
    label: t('Auth.MembershipRegistration.Form.Payee.Relative'),
  },
  {
    value: 'Society',
    label: t('Auth.MembershipRegistration.Form.Payee.Society'),
  },
  {
    value: 'Government',
    label: t('Auth.MembershipRegistration.Form.Payee.Government'),
  },
  {
    value: 'Installment',
    label: t('Auth.MembershipRegistration.Form.Payee.Installment'),
  },
  {
    value: 'Free',
    label: t('Auth.MembershipRegistration.Form.Payee.Free'),
  },
];

export const ageGroupOptions = (t: (value: string) => string) => [
  {
    value: 'Below 5',
    label: t('Auth.MembershipRegistration.Form.AgeGroup.BelowFive'),
  },
  {
    value: '5 - 12',
    label: t('Auth.MembershipRegistration.Form.AgeGroup.FiveToTwelve'),
  },
  {
    value: '12 - 18',
    label: t('Auth.MembershipRegistration.Form.AgeGroup.TwelveToEighteen'),
  },
  {
    value: '18 - 30',
    label: t('Auth.MembershipRegistration.Form.AgeGroup.EighteenToThirty'),
  },
  {
    value: '30 - 45',
    label: t('Auth.MembershipRegistration.Form.AgeGroup.ThirtyToFortyFive'),
  },
  {
    value: '45 - 60',
    label: t('Auth.MembershipRegistration.Form.AgeGroup.FortyFiveToSixty'),
  },
  {
    value: 'Above 60',
    label: t('Auth.MembershipRegistration.Form.AgeGroup.AboveSixty'),
  },
];

export const yesNoOptions = (t: (value: string) => string) => [
  { value: 'Yes', label: t('Global.Form.Labels.Yes') },
  { value: 'No', label: t('Global.Form.Labels.No') },
];

export function statuses(t: (value: string) => string) {
  return [
    {
      value: 'New Member',
      label: t('Auth.MembershipRegistration.Statuses.NewMember'),
    },
    {
      value: 'Incomplete',
      label: t('Auth.MembershipRegistration.Statuses.Incomplete'),
    },
    {
      value: 'Need Help',
      label: t('Auth.MembershipRegistration.Statuses.NeedHelp'),
    },
    {
      value: 'Rejected',
      label: t('Auth.MembershipRegistration.Statuses.Rejected'),
    },
    {
      value: 'Accepted',
      label: t('Auth.MembershipRegistration.Statuses.Accepted'),
    },
    {
      value: 'In Preview',
      label: t('Auth.MembershipRegistration.Statuses.InPreview'),
    },
  ];
}

export function inputsData(t: (value: string) => string): {
  [key: string]: InputSingleProps[];
} {
  return {
    basicDataInputs: [
      {
        type: 'select',
        options: socialStatusOptions(t),
        name: 'socialStatus',
        label: t('Auth.MembershipRegistration.Form.SocialStatus.Title'),
        required: true,
      },
      {
        type: 'text',
        name: 'fullName',
        label: t('Auth.MembershipRegistration.Form.FullName'),
        required: true,
      },
      {
        type: 'select',
        options: nationalityOptions(t),
        name: 'nationality',
        label: t('Auth.MembershipRegistration.Form.Nationality.Title'),
        required: true,
      },
      {
        type: 'date',
        name: 'dob',
        min: moment().subtract(125, 'y').format(dataDateFormat),
        max: moment().subtract(17, 'y').format(dataDateFormat),
        label: t('Auth.MembershipRegistration.Form.Dob'),
        required: true,
      },
      {
        type: 'date',
        name: 'idExpiryDate',
        max: moment().add(10, 'y').format(dataDateFormat),
        label: t('Auth.MembershipRegistration.Form.IdExpiryDate'),
        required: true,
      },
      {
        type: 'numberText',
        name: 'idNumber',
        minLength: 10,
        maxLength: 10,
        label: t('Auth.MembershipRegistration.Form.IdNumber'),
        labelNote: t('Auth.MembershipRegistration.Form.IdNumberNote'),
        required: true,
      },
      {
        type: 'file',
        name: 'familyRecordPhoto',
        label: t('Auth.MembershipRegistration.Form.FamilyRecordPhoto'),
        required: true,
        halfCol: true,
      },
      {
        type: 'file',
        name: 'guardianIdPhoto',
        label: t('Auth.MembershipRegistration.Form.GuardianIdPhoto'),
        required: true,
        halfCol: true,
      },
      {
        type: 'radio',
        options: genderOptions(t),
        name: 'gender',
        label: t('Auth.MembershipRegistration.Form.Gender.Title'),
        required: true,
        halfCol: true,
      },
      {
        type: 'radio',
        options: healthStatusOptions(t),
        name: 'healthStatus',
        label: t('Auth.MembershipRegistration.Form.HealthStatus.Title'),
        required: true,
        halfCol: true,
      },
      {
        type: 'selectMany',
        options: diseasesOptions(t),
        placeholder: t('Auth.MembershipRegistration.Form.Diseases.None'),
        name: 'diseases',
        label: t('Auth.MembershipRegistration.Form.Diseases.Title'),
        required: false,
      },
      {
        type: 'radio',
        options: yesNoOptions(t),
        name: 'incurableDisease',
        label: t('Auth.MembershipRegistration.Form.IncurableDisease'),
        required: true,
      },
      {
        type: 'file',
        name: 'healthStatementPhoto',
        label: t('Auth.MembershipRegistration.Form.HealthStatementPhoto'),
        required: true,
      },
    ],

    contactDataInputs: [
      {
        type: 'phoneNumber',
        name: 'beneficiaryMobile',
        label: t('Auth.MembershipRegistration.Form.BeneficiaryMobile'),
        required: true,
      },
      {
        type: 'phoneNumber',
        name: 'secondaryMobile',
        label: t('Auth.MembershipRegistration.Form.SecondaryMobile'),
        required: false,
      },
      {
        type: 'phoneNumber',
        name: 'backupMobile',
        label: t('Auth.MembershipRegistration.Form.BackupMobile'),
        required: false,
      },
      {
        type: 'email',
        name: 'email',
        label: t('Auth.MembershipRegistration.Form.Email'),
        required: false,
      },
      {
        type: 'numberText',
        name: 'bankAccountNumber',
        label: t('Auth.MembershipRegistration.Form.BankAccountNumber'),
        labelNote: t('Auth.MembershipRegistration.Form.BankAccountNumberNote'),
        required: false,
      },
      {
        type: 'file',
        name: 'ibanPhoto',
        label: t('Auth.MembershipRegistration.Form.IbanPhoto'),
        required: false,
        halfCol: true,
      },
    ],

    qualificationDataInputs: [
      {
        type: 'select',
        options: occupationOptions(t),
        name: 'occupation',
        label: t('Auth.MembershipRegistration.Form.Occupation.Title'),
        required: true,
      },
      {
        type: 'select',
        options: educationOptions(t),
        name: 'educationLevel',
        label: t('Auth.MembershipRegistration.Form.EducationLevel.Title'),
        required: true,
      },
      {
        type: 'title',
        name: 'title1',
        defaultValue: t('Auth.MembershipRegistration.Form.IncomeResources'),
      },
      {
        type: 'number',
        name: 'salary',
        label: t('Auth.MembershipRegistration.Form.Salary'),
        min: 0,
        step: 0.1,
        required: false,
        halfCol: true,
      },
      {
        type: 'file',
        name: 'salaryFile',
        required: false,
        halfCol: true,
      },
      {
        type: 'number',
        name: 'insurances',
        label: t('Auth.MembershipRegistration.Form.Insurances'),
        min: 0,
        step: 0.1,
        required: false,
        halfCol: true,
      },
      {
        type: 'file',
        name: 'insurancesFile',
        required: false,
        halfCol: true,
      },
      {
        type: 'number',
        name: 'comprehensiveRehabilitation',
        label: t(
          'Auth.MembershipRegistration.Form.ComprehensiveRehabilitation'
        ),
        min: 0,
        step: 0.1,
        required: false,
        halfCol: true,
      },
      {
        type: 'file',
        name: 'comprehensiveRehabilitationFile',
        required: false,
        halfCol: true,
      },
      {
        type: 'number',
        name: 'retirement',
        label: t('Auth.MembershipRegistration.Form.Retirement'),
        min: 0,
        step: 0.1,
        required: false,
        halfCol: true,
      },
      {
        type: 'file',
        name: 'retirementFile',
        required: false,
        halfCol: true,
      },
      {
        type: 'number',
        name: 'socialSecurity',
        label: t('Auth.MembershipRegistration.Form.SocialSecurity'),
        min: 0,
        step: 0.1,
        required: false,
        halfCol: true,
      },
      {
        type: 'file',
        name: 'socialSecurityFile',
        required: false,
        halfCol: true,
      },
    ],

    hostelDataInputs: [
      {
        type: 'title',
        name: 'title2',
        defaultValue: t('Auth.MembershipRegistration.Form.Address'),
      },
      {
        type: 'select',
        options: provinceOptions(t),
        name: 'province',
        label: t('Auth.MembershipRegistration.Form.Province.Title'),
        required: true,
      },
      {
        type: 'text',
        name: 'governorate',
        label: t('Auth.MembershipRegistration.Form.Governorate'),
        required: true,
      },
      {
        type: 'text',
        name: 'city',
        label: t('Auth.MembershipRegistration.Form.City'),
        required: true,
      },
      {
        type: 'text',
        name: 'district',
        label: t('Auth.MembershipRegistration.Form.District'),
        required: true,
      },
      {
        type: 'select',
        options: homeTypeOptions(t),
        name: 'homeType',
        label: t('Auth.MembershipRegistration.Form.HomeType.Title'),
        required: true,
        halfCol: true,
      },
      {
        type: 'text',
        name: 'apartmentNo',
        label: t('Auth.MembershipRegistration.Form.ApartmentNo'),
        required: true,
        halfCol: true,
      },
      {
        type: 'location',
        name: 'homeLocation',
        label: t('Auth.MembershipRegistration.Form.HomeLocation'),
        required: true,
      },
      {
        type: 'radio',
        options: [
          {
            value: 'Rental',
            label: t('Auth.MembershipRegistration.Form.HomeOwnership.Rental'),
          },
          {
            value: 'Ownership',
            label: t(
              'Auth.MembershipRegistration.Form.HomeOwnership.Ownership'
            ),
          },
        ],
        name: 'homeOwnership',
        label: t('Auth.MembershipRegistration.Form.HomeOwnership.Title'),
        required: true,
      },
      {
        type: 'file',
        name: 'homeDocumentPhoto',
        label:
          t('Auth.MembershipRegistration.Form.RentalContractPhoto') +
          ' / ' +
          t('Auth.MembershipRegistration.Form.OwnershipDocumentPhoto'),
        required: true,
        halfCol: true,
      },
      {
        type: 'file',
        name: 'nationalAddressDocument',
        label: t('Auth.MembershipRegistration.Form.NationalAddressDocument'),
        required: true,
        halfCol: true,
      },
      {
        type: 'number',
        name: 'rentalCharge',
        label: t('Auth.MembershipRegistration.Form.RentalCharge'),
        min: 0,
        step: 0.1,
        required: true,
      },
      {
        type: 'select',
        options: payeeOptions(t),
        name: 'payee',
        label: t('Auth.MembershipRegistration.Form.Payee.Title'),
        required: true,
      },
    ],

    dependentsDataInputs: [
      {
        type: 'text',
        name: 'fullName',
        label: t('Auth.MembershipRegistration.Form.FullName'),
        required: true,
      },
      {
        type: 'date',
        name: 'dob',
        min: moment().subtract(125, 'y').format(dataDateFormat),
        max: moment().format(dataDateFormat),
        label: t('Auth.MembershipRegistration.Form.Dob'),
        required: true,
      },
      {
        type: 'date',
        name: 'idExpiryDate',
        max: moment().add(10, 'y').format(dataDateFormat),
        label: t('Auth.MembershipRegistration.Form.IdExpiryDate'),
        required: true,
      },
      {
        type: 'numberText',
        name: 'idNumber',
        minLength: 10,
        maxLength: 10,
        label: t('Auth.MembershipRegistration.Form.IdNumber'),
        labelNote: t('Auth.MembershipRegistration.Form.IdNumberNote'),
        required: true,
      },
      {
        type: 'radio',
        options: genderOptions(t),
        name: 'gender',
        label: t('Auth.MembershipRegistration.Form.Gender.Title'),
        required: true,
        halfCol: true,
      },
      {
        type: 'phoneNumber',
        name: 'mobile',
        label: t('Auth.MembershipRegistration.Form.DependentMobile'),
        labelNote: t('Auth.MembershipRegistration.Form.DependentMobileNote'),
        required: false,
      },
      {
        type: 'select',
        options: relationOptions(t),
        name: 'relation',
        label: t('Auth.MembershipRegistration.Form.Relation.Title'),
        required: true,
      },
      {
        type: 'select',
        options: ageGroupOptions(t),
        name: 'ageGroup',
        label: t('Auth.MembershipRegistration.Form.AgeGroup.Title'),
        required: true,
      },
      {
        type: 'radio',
        options: healthStatusOptions(t),
        name: 'healthStatus',
        label: t('Auth.MembershipRegistration.Form.HealthStatus.Title'),
        required: true,
      },
      {
        type: 'selectMany',
        options: diseasesOptions(t),
        placeholder: t('Auth.MembershipRegistration.Form.Diseases.None'),
        name: 'diseases',
        label: t('Auth.MembershipRegistration.Form.Diseases.Title'),
        required: false,
      },
      {
        type: 'radio',
        options: yesNoOptions(t),
        name: 'incurableDisease',
        label: t('Auth.MembershipRegistration.Form.IncurableDisease'),
        required: false,
      },
    ],

    attachmentInputs: [
      {
        type: 'file',
        name: 'absherDocument',
        label: t('Auth.MembershipRegistration.Form.AbsherDocument'),
        required: true,
      },
      {
        type: 'file',
        name: 'tawakkalnaDocument',
        label: t('Auth.MembershipRegistration.Form.TawakkalnaDocument'),
        required: true,
      },
      {
        type: 'file',
        name: 'incomeDocument',
        label: t('Auth.MembershipRegistration.Form.IncomeDocument'),
        labelNote: t('Auth.MembershipRegistration.Form.IncomeDocumentNote'),
        required: true,
      },
      {
        type: 'file',
        name: 'studentsDocument',
        label: t('Auth.MembershipRegistration.Form.StudentsDocument'),
        labelNote: t('Auth.MembershipRegistration.Form.StudentsDocumentNote'),
        required: true,
      },
      {
        type: 'file',
        name: 'rentalDocument',
        label: t('Auth.MembershipRegistration.Form.RentalDocument'),
        required: true,
      },
      {
        type: 'file',
        name: 'masrefDocument',
        label: t('Auth.MembershipRegistration.Form.MasrefDocument'),
        required: true,
      },
      {
        type: 'file',
        name: 'creditStatement',
        label: t('Auth.MembershipRegistration.Form.CreditStatement'),
        labelNote: t('Auth.MembershipRegistration.Form.CreditStatementNote'),
        required: true,
      },
    ],
  };
}

export const beneficiaryTabs = (t: (value: string) => string) => [
  {
    id: 'basicDataInputs',
    name: 'basicDataInputs',
    title: t('Auth.MembershipRegistration.Form.BasicData'),
  },
  {
    id: 'contactDataInputs',
    name: 'contactDataInputs',
    title: t('Auth.MembershipRegistration.Form.ContactData'),
  },
  {
    id: 'qualificationDataInputs',
    name: 'qualificationDataInputs',
    title: t('Auth.MembershipRegistration.Form.QualificationData'),
  },
  {
    id: 'hostelDataInputs',
    name: 'hostelDataInputs',
    title: t('Auth.MembershipRegistration.Form.HostelData'),
  },
  {
    id: 'dependentsDataInputs',
    name: 'dependentsDataInputs',
    title: t('Auth.MembershipRegistration.Form.DependentsData'),
  },
  {
    id: 'attachmentInputs',
    name: 'attachmentInputs',
    title: t('Auth.MembershipRegistration.Form.Attachments'),
  },
];

export const beneficiaryMapping: { [key: string]: string } = {
  basicDataInputs: '',
  contactDataInputs: 'contactsBank',
  qualificationDataInputs: 'income',
  hostelDataInputs: 'housing',
  dependentsDataInputs: 'dependents',
  attachmentInputs: 'staff',
};
