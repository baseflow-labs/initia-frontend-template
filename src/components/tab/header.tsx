const TabsHeader = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { id: string; name: string; title: string }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}) => {
  return (
    <div className="mt-1 mx-3 mx-xl-5 mx-xxl-auto overflow-x-auto" style={{ maxWidth: "80vw" }}>
      <div
        className="d-flex justify-content-start gap-1 bg-teal rounded-2 p-2"
        style={{
          width: "max-content",
          backgroundColor: "rgba(0,0,0,0.025)",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`btn mx-2 px-4 py-3 rounded-2 w-fit  
          ${activeTab === tab.id ? "bg-opacity-primary text-primary fw-bold fs-6" : "text-dark"}`}
            onClick={() => setActiveTab(tab.name)}
            style={{
              background: "none",
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsHeader;
