import { withSubcomponents } from "@/util/util";
import TabView from "./TabView";
import * as Subcomponents from "./Subcomponents";

const TabViewWithSubcomponents = withSubcomponents(TabView, {
  ...Subcomponents,
});

export default TabViewWithSubcomponents;
