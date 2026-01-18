import * as MetadataApi from "@initia/shared/api/metadata";
import Form from "@initia/shared/ui/components/form";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";

const SystemMetadataSettingsView = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({});

  useLayoutEffect(() => {
    MetadataApi.get().then((res) => {
      setData({
        ...res.payload,
        logo: [{ id: "x", path: res.payload.logo }],
        logoFull: [{ id: "x", path: res.payload.logoFull }],
      });
    });
  }, []);

  const onSubmit = (values: Record<string, unknown>) => {
    return MetadataApi.update(values);
  };

  return (
    <PageTemplate title={t("Auth.Settings.Admin.Metadata.Title")}>
      <Form
        initialValues={data}
        inputs={inputs(t)}
        onFormSubmit={onSubmit as (values?: Record<string, unknown>) => void}
      />
    </PageTemplate>
  );
};

export default SystemMetadataSettingsView;
