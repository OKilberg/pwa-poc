import { Columns } from "@/mdx-components";
import { ParentComponent } from "./types";

const MdxLayout = ({ children }: ParentComponent) => {
  return (
    <article className="prose w-full max-w-none">
      <Columns>{children}</Columns>
    </article>
  );
};

export default MdxLayout;
