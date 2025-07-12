import type { MDXComponents } from "mdx/types";
import { ParentComponent } from "./shared/components/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <img {...props} className="rounded-lg" alt="" />,
    ...components,
  };
}

export const Columns = ({ children }: ParentComponent) => {
  return <div className="grid md:grid-cols-2 w-full md:gap-6">{children}</div>;
};
