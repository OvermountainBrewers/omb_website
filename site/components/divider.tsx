// my-12! (important): inside `prose` articles, Tailwind 4 emits the typography
// plugin's hr margin after my-12, so without it the divider grows to 56px.
export const Divider = () => <hr className="my-12!" />;
