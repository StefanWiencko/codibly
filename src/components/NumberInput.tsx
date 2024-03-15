import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
  NumberInputOwnerState,
} from "@mui/base/Unstable_NumberInput";
import clsx from "clsx";

const resolveSlotProps = (fn: unknown, args: unknown) =>
  typeof fn === "function" ? fn(args) : fn;

const NumberInput = React.forwardRef(function NumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      {...props}
      ref={ref}
      slotProps={{
        root: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              "grid grid-cols-[1fr_8px] grid-rows-2 overflow-hidden font-sans rounded-lg text-slate-900  border border-solid  bg-white   hover:border-violet-400 focus-visible:outline-0 p-1",
              ownerState.focused
                ? "border-violet-400  shadow-lg shadow-outline-purple "
                : "border-slate-300  shadow-md shadow-slate-100 ",
              resolvedSlotProps?.className
            ),
          };
        },
        input: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              "col-start-1 col-end-2 row-start-1 row-end-3 text-sm font-sans leading-normal text-slate-900 bg-inherit border-0 rounded-[inherit]  px-3 py-2 outline-0 focus-visible:outline-0 focus-visible:outline-none",
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
});

export default NumberInput;
