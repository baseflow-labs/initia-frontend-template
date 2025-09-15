import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddUsers from "./addUser";

import * as UserApi from "../../../api/profile/user";
import DemoLoginNote from "../../../layouts/auth/demoLoginNote";
import TablePage from "../../../layouts/auth/pages/tablePage";
import {
  apiCatchGlobalHandler,
  renderDataFromOptions,
} from "../../../utils/function";
import { getUserRoles } from "../../../utils/optionDataLists/users";
import { User } from "../../../types/beneficiaries";

const UsersView = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });

  const getData = ({
    filters = currentFilters,
    page = paginationMeta.page,
    capacity = paginationMeta.capacity,
    search = currentSearch,
  }) => {
    setCurrentFilters(filters);
    const customFilters = [];

    if (search) {
      customFilters.push({
        field: "name",
        filteredTerm: {
          dataType: "string",
          value: search,
        },
        filterOperator: "contains",
      });
    }

    return UserApi.getAll({
      filters,
      page,
      capacity,
      customFilters,
    })
      .then((res: any) => {
        setUsers(
          res.payload.map(
            ({
              staff = { fullName: "" },
              beneficiary = { fullName: "" },
              ...rest
            }) => ({
              ...rest,
              name: staff?.fullName || beneficiary?.fullName,
            })
          )
        );

        if (res.extra) {
          setPaginationMeta({
            page: res.extra.page,
            capacity: res.extra.capacity,
            count: res.extra.count,
            pagesCount: res.extra.pagesCount,
          });
        }

        return res;
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData({});
  }, []);

  const columns = [
    {
      type: "text",
      name: "id",
      label: t("Auth.Users.Id"),
    },
    {
      type: "custom",
      name: "name",
      label: t("Auth.Users.Name"),
    },
    {
      type: "phoneNumber",
      name: "username",
      label: t("Global.Labels.PhoneNumber"),
    },
    {
      type: "email",
      name: "email",
      label: t("Global.Form.Label.Email"),
    },
    {
      type: "custom",
      name: "role",
      label: t("Auth.Users.Role"),
      render: (row: any) => renderDataFromOptions(row.role, getUserRoles(t)),
    },
  ];

  const onSearch = (e: string) => {
    setCurrentSearch(e);
    getData({ page: 1, capacity: 10, search: e });
  };

  const actionButtons = [
    {
      label: t("Auth.Users.AddUser"),
      onClick: () => setOpenModal({ id: "", name: "", username: "", role: "" }),
    },
  ];

  return (
    <Fragment>
      <DemoLoginNote />

      <TablePage
        title={t("Auth.Users.Title")}
        actionButtons={actionButtons}
        columns={columns}
        onSearch={onSearch}
        searchPlaceholder={t("Auth.Users.SearchBarPlaceholder")}
        data={users}
        paginationMeta={paginationMeta}
        tableActions={(id?: string) => [
          {
            icon: faUserGear,
            label: t("Global.Form.Labels.Edit"),
            spread: true,
            onClick: (id: string) =>
              setOpenModal(
                users?.find((u) => u.id === id) || {
                  id: "",
                  name: "",
                  username: "",
                  role: "",
                }
              ),
          },
        ]}
        onGetData={getData}
        onPageChange={(page, capacity) => {
          getData({
            page,
            capacity,
          });
        }}
      />

      <AddUsers
        openModal={openModal}
        setOpenModal={setOpenModal}
        getData={getData}
      />
    </Fragment>
  );
};

export default UsersView;
