import {
  Component,
  ComponentProps,
  JSX,
  mergeProps,
  splitProps,
} from "solid-js";
import styles from "./Button.module.css";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  icon?: Component<ComponentProps<"svg">>;
};

export const Button: Component<ButtonProps> = (_props) => {
  const props = mergeProps<ButtonProps[]>({ variant: "primary" }, _props);
  const [local, others] = splitProps(props, ["variant", "icon", "children"]);
  const { icon: Icon } = local;
  return (
    <button
      classList={{
        [styles.button]: true,
        [styles.primary]: local.variant === "primary",
        [styles.outline]: local.variant === "outline",
      }}
      {...others}
    >
      {Icon && <Icon class={styles.icon} />}
      {local.children}
    </button>
  );
};
