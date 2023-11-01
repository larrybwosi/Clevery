import { rightBarText } from "../content";

const RightSidebar = () => {
    return (
      <div className="bg-gray-800 text-gray-100 h-100% w-[200px] px-4 py-8">
        
        <h5 className="font-thin">{rightBarText}</h5>
      </div>
    );
  };

export default RightSidebar;
