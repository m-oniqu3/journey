type Props = {
  tabs: string[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

function Tabs(props: Props) {
  const renderedTabs = props.tabs.map((tab) => {
    const isActive = tab === props.activeTab;
    const activeStyles = isActive
      ? "border-b-2 border-black"
      : "border-b-2 border-transparent";

    return (
      <li
        key={tab}
        className={`${activeStyles} cursor-pointer p-3 font-medium hover:bg-grayscale-100 `}
        onClick={() => props.setActiveTab(tab)}
      >
        {tab}
      </li>
    );
  });
  return <ul className="flex flex-wrap gap-4">{renderedTabs}</ul>;
}

export default Tabs;
