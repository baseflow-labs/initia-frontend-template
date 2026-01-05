import Button from "../core/button";

const TabsHeader = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { id: string; title: string }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}) => {
  return (
    <div className="mt-1 mx-3 mx-xl-5 mx-xxl-auto overflow-x-auto" style={{ maxWidth: "80vw" }}>
      <div
        className="d-flex justify-content-start gap-1 rounded-2 p-2"
        style={{
          width: "max-content",
          backgroundColor: "rgba(0,0,0,0.025)",
        }}
      >
        {tabs.map((tab, i) => (
          <Button
            key={i}
            outline={activeTab === tab.id}
            color={activeTab === tab.id ? "primary" : "dark"}
            className={`mx-2 px-4 py-3 w-fit  
          ${activeTab === tab.id ? "fw-bold fs-6" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: "none",
            }}
          >
            {tab.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TabsHeader;
