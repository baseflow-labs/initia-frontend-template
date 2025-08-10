import { Fragment, useState } from "react";

export default function TabsComp({
  tabs,
}: {
  tabs: { id: number; title: string; body: React.ReactNode }[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Fragment>
      <div
        className="mt-4 mx-3 mx-xl-5 mx-xxl-auto overflow-x-auto"
        style={{ maxWidth: "80vw" }}
      >
        <div
          className="d-flex justify-content-start gap-1 bg-teal rounded-5 p-2"
          style={{
            width: "max-content",
            backgroundColor: "rgba(0,0,0,0.025)",
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`btn mx-2 px-4 py-3 rounded-5 w-fit  
          ${
            activeTab === tab.id
              ? "bg-opacity-info text-info fw-bold fs-6"
              : "text-dark"
          }`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {tabs[activeTab]?.body}
    </Fragment>
  );
}
