export const curriedCssVarSetter = ref => (postfix = "") => v => {
  const tag = ref.current;
  if (!tag) return;

  Object.keys(v).forEach(key => {
    tag.style.setProperty(
      `--mouse-${key}${postfix ? `-${postfix}` : ""}`,
      v[key]
    );
  });
};

export const noop = () => {};
