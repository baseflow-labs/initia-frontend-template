import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Fragment, useLayoutEffect, useState } from "react";

import TabsHeader from "./header";

const TabsComp = ({
  items,
  activeTabId,
}: {
  items: {
    id: string;
    title: string;
    icon?: IconProp;
    content: React.ReactNode;
  }[];
  activeTabId?: string;
}) => {
  const [activeTab, setActiveTab] = useState(activeTabId || items[0].id);

  useLayoutEffect(() => {
    if (activeTabId) {
      setActiveTab(activeTabId);
    }
  }, [activeTabId]);

  return (
    <Fragment>
      <div className="mt-1 mx-3 mx-xl-5 mx-xxl-auto overflow-x-auto">
        <TabsHeader tabs={items} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {items?.find(({ id }) => id === activeTab)?.content}
    </Fragment>
  );
};

export default TabsComp;
