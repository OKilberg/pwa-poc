import { ParentComponent } from "./types";

const MdxLayout = ({ children }: ParentComponent) => {
  return <article className="prose">{children}</article>;
};

export default MdxLayout;
