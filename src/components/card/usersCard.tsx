interface Props {
  label: string;
  researchers: {
    name: string;
    photo: string;
    beneficiariesCount: number;
    visitsCount: number;
    aidsCount: number;
    reportsCount: number;
  }[];
}

const UsersCard = ({ label, researchers }: Props) => {
  return (
    <div className="card p-4 my-4 rounded-4">
      <h3 className="mb-4">
        {label} {researchers.length}
      </h3>

      <table className="table table-responsive align-middle">
        <thead>
          <tr>
            <th className="fw-bold">معلومات الباحث</th>

            <th className="fw-bold">عدد الزيارات</th>

            <th className="fw-bold">عدد المعونات</th>

            <th className="fw-bold">عدد التقارير</th>
          </tr>
        </thead>

        <tbody>
          {researchers.map(
            (
              {
                name,
                photo,
                beneficiariesCount,
                visitsCount,
                aidsCount,
                reportsCount,
              },
              i
            ) => (
              <tr
                className={i === researchers.length - 1 ? "border-white" : ""}
                key={i}
              >
                <td>
                  <div className="d-flex py-2">
                    <div>
                      <img src={photo} height={60} className="me-3 rounded-4" />
                    </div>

                    <div>
                      <h5>{name}</h5>

                      <div className="text-secondary">
                        {beneficiariesCount} {"مستفيد"}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{visitsCount}</td>

                <td>{aidsCount}</td>

                <td>{reportsCount}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersCard;
