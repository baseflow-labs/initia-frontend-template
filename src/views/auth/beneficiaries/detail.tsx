import {
  faBoxOpen,
  faCircle,
  faEdit,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as BeneficiaryApi from '../../../api/profile/beneficiary';
import {
  renderDataFromOptions,
  statusColorRender,
} from '../../../utils/fucntions';
import DynamicTable, { dataRender } from '../../../components/table';
import TabsHeader from '../../../components/tab';
import {
  beneficiaryTabs,
  inputsData,
  beneficiaryMapping,
  statuses,
} from '../../../utils/inputsData';

const BeneficiaryDetailView = () => {
  const { t } = useTranslation();
  const [beneficiary, setBeneficiary] = useState<any>();
  const [tab, setTab] = useState<string>('basicDataInputs');
  const [dependent, setDependent] = useState<string>('');

  const fieldsToShow = inputsData(t);

  useEffect(() => {
    BeneficiaryApi.getById('7c5610f6-49c9-406c-beb7-e2173c72e005').then(
      (res) => {
        setBeneficiary(res as any);
      }
    );
  }, []);

  const title = beneficiary?.fullName;

  const columns = [
    {
      name: 'field',
      label: t('Auth.Beneficiaries.Profile.field'),
    },
    {
      name: 'info',
      label: t('Auth.Beneficiaries.Profile.info'),
    },
    {
      name: 'notes',
      label: t('Auth.Beneficiaries.Profile.notes'),
    },
    {
      type: 'custom',
      render: (row: any) => (
        <Fragment>
          <FontAwesomeIcon
            icon={faCircle}
            className={`text-${statusColorRender(row.status)}`}
          />{' '}
          {renderDataFromOptions(row.status, statuses(t))}
        </Fragment>
      ),
      name: 'editStatus',
      label: t('Auth.Beneficiaries.Profile.editStatus'),
    },
  ];

  const dependentTabs = beneficiary?.dependents?.map(
    ({ id, fullName }: { id: string; fullName: string }) => ({
      id: id,
      name: fullName,
      title: fullName,
    })
  );

  const data = fieldsToShow[tab]?.map(({ name, label, type, options }) => {
    let beneficiaryData = beneficiaryMapping[tab]
      ? beneficiary?.[beneficiaryMapping[tab]]
      : beneficiary;

    if (tab === 'dependentsDataInputs') {
      if (!dependent) {
        setDependent(beneficiaryData[0].id);
      }
      beneficiaryData = beneficiaryData?.find(
        ({ id }: { id: string }) => dependent === id
      );
    }

    return {
      id: name,
      field: t(label || ''),
      info: dataRender({
        data: beneficiaryData?.[name],
        type,
        options,
      }),
    };
  });

  return (
    <>
      <h2 className='text-dark fs-5 fw-semibold font-family-Cairo m-0 px-3 py-2'>
        {title}
      </h2>
      <TabsHeader
        tabs={beneficiaryTabs(t)}
        activeTab={tab}
        setActiveTab={setTab}
      />
      {tab === 'dependentsDataInputs' && (
        <TabsHeader
          tabs={dependentTabs}
          activeTab={dependent}
          setActiveTab={setDependent}
        />
      )}
      <DynamicTable
        columns={columns}
        data={data}
        onPageChange={() => console.log(1)}
        size={data.length}
        actions={[
          {
            icon: faEdit,
            label: t('Auth.Beneficiaries.Profile.editRequest'),
            onClick: (data: string | object) => console.log(data),
          },
          {
            icon: faBoxOpen,
            label: t('Auth.Beneficiaries.Profile.archive'),
            onClick: (data: string | object) => console.log(data),
          },
        ]}
      />
    </>
  );
};

export default BeneficiaryDetailView;
