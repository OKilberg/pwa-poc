import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import MainPane from "@/shared/components/MainPane/MainPane";
import ManageEmployeesGuides from "./Components/ManageEmployeesGuides";

const Help = () => {
  return (
    <MainPane className="h-[calc(100vh-3rem)] min-h-0">
      <DefaultAppBar
        pageTitle="Help"
        pageDescription="Guides and support"
        url="/admin"
      />
      <section className="px-4 pb-6 gap-2 flex flex-col min-h-0 flex-1 overflow-auto">
        <ManageEmployeesGuides />
      </section>
    </MainPane>
  );
};

export default Help;
