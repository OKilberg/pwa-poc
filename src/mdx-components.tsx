import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <img {...props} className="rounded-lg" alt="" />,
    ...components,
  };
}
