import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DynamicTable from '../../../components/table';
import {
  devices,
  deviceStatuses,
  furniture,
  roomType,
  yesNoOptions,
} from '../../../utils/visitData';
import { useSearchParams } from 'react-router';

type visitReportRoomContentsType = {
  id: string;
  type: string;
  content: string;
  photo: string;
  status: string;
  evaluation: number;
  needRepair: 'Yes' | 'No';
};
type visitType = {
  roomsCount: number;
  visitReportRooms: {
    id: string;
    updatedAt: string;
    createdAt: string;
    roomType: string;
    contentsCount: number;
    recommendation: null;
    note: null;
    visitReportRoomContents: visitReportRoomContentsType[];
  }[];
};

const VisitDetailView = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [visit, setVisit] = useState<visitType>();

  // const getData = () => {
  //   VisitApi.getById(searchParams.id)
  //     .then((res) => {
  //       setVisit(res?.payload);
  //     })
  //     .catch(apiCatchGlobalHandler);
  // };
  // useLayoutEffect(() => {
  //   getData();
  // }, []);

  const title = 'المستفيد';

  const columns = [
    {
      type: 'select',
      name: 'content',
      options: devices(t),
      label: t('Auth.Visits.Detail.device'),
    },
    {
      type: 'select',
      options: deviceStatuses(t),
      name: 'status',
      label: t('Auth.Visits.Detail.deviceStatus'),
    },
    {
      type: 'stars',
      name: 'evaluation',
      label: t('Auth.Visits.Detail.evaluation'),
    },
    {
      type: 'image',
      name: 'photo',
      label: t('Auth.Visits.Detail.devicePhoto'),
    },
    {
      type: 'select',
      options: yesNoOptions(t),
      name: 'needRepair',
      label: t('Auth.Visits.Detail.needRepair'),
    },
  ];
  const columnsFer = [
    {
      type: 'select',
      name: 'content',
      options: furniture(t),
      label: t('Auth.Visits.Detail.furniture'),
    },
    {
      type: 'select',
      options: deviceStatuses(t),
      name: 'status',
      label: t('Auth.Visits.Detail.deviceStatus'),
    },
    {
      type: 'stars',
      name: 'evaluation',
      label: t('Auth.Visits.Detail.evaluation'),
    },
    {
      type: 'image',
      name: 'photo',
      label: t('Auth.Visits.Detail.devicePhoto'),
    },
    {
      type: 'select',
      options: yesNoOptions(t),
      name: 'needRepair',
      label: t('Auth.Visits.Detail.needRepair'),
    },
  ];

  const actionButtons = [
    {
      label: t('Auth.Visits.Report.AddReport'),
      route: '/report',
      outline: true,
    },
    {
      label: t('Auth.Visits.AddVisit'),
      onClick: () => console.log(true),
    },
  ];

  const roomItems =
    visit?.visitReportRooms
      .map(({ visitReportRoomContents }) => visitReportRoomContents)
      .flat() || [];
  const roomsNumber = visit?.roomsCount || 0;
  const furnitureNumber =
    roomItems?.filter(({ type }) => type === 'Furniture').length || 0;
  const devicesNumber = roomItems?.length - furnitureNumber;
  const tabs = [
    `${t('Auth.Visits.Detail.roomsNumber')}  ${roomsNumber}`,
    `${t('Auth.Visits.Detail.devicesNumber')}  ${devicesNumber}`,
    `${t('Auth.Visits.Detail.furnitureNumber')}  ${furnitureNumber}`,
  ];
  return (
    <>
      <h2>{title}</h2>
      <div className='row gap-4 mt-4 w-75'>
        {tabs.map((t) => (
          <div className='px-3 py-3 bg-white rounded-1 border border-1 border-info col-3 align-items-end text-center'>
            <span className='text-dark fs-6 fw-normal font-family-Cairo'>
              {t}
            </span>
          </div>
        ))}
      </div>
      {visit?.visitReportRooms.map((room, idx) => (
        <div
          key={room.id}
          className='mt-5'
        >
          <h2>
            {`${idx + 1} - `} {roomType(t, room.roomType)}
          </h2>
          <DynamicTable
            columns={columns}
            data={room?.visitReportRoomContents.filter(
              ({ type }) => type === 'Device'
            )}
            onPageChange={() => {}}
          />
          <DynamicTable
            columns={columnsFer}
            data={room.visitReportRoomContents.filter(
              ({ type }) => type === 'Furniture'
            )}
            onPageChange={() => {}}
          />
        </div>
      ))}
    </>
  );
};

export default VisitDetailView;
