import { Styleable } from "./types";

const Divider = ({ className }: Styleable) => {
  return <div className={"divider " + className} />;
};

export default Divider;
