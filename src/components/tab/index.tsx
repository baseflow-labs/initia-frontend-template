export default function TabsHeader({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { id: string; name: string; title: string }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}) {
  return (
    <div
      className='mt-4 mx-3 mx-xl-5 mx-xxl-auto'
      style={{ maxWidth: '1620px' }}
    >
      <div className='d-flex justify-content-start gap-1 bg-teal'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={` btn px-4 py-3 rounded-5 
          ${activeTab === tab.id ? 'bg-info text-white fs-6' : 'text-dark'}`}
            onClick={() => setActiveTab(tab.name)}
            style={{ background: 'none' }}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
}
