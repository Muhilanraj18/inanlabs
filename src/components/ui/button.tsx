"use client";

import React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { GlassSurface } from "./GlassSurface";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80 shadow-md backdrop-blur-md border border-white/10",
        glass:
          "bg-white/[0.08] hover:bg-white/[0.16] text-foreground border border-white/20 backdrop-blur-xl shadow-lg hover:shadow-brand-red/20 hover:border-brand-red/60",
        outline:
          "border-border bg-background/60 backdrop-blur-md hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
        secondary:
          "bg-secondary/80 backdrop-blur-md text-secondary-foreground hover:bg-secondary aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted/80 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-white/[0.06]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: number;
  borderWidth?: number;
  blur?: number;
  backgroundOpacity?: number;
  brightness?: number;
  className?: string;
  children?: React.ReactNode;
}

export function GlassButton({
  borderRadius = 12,
  borderWidth = 0.08,
  blur = 14,
  backgroundOpacity = 0.2,
  brightness = 40,
  className = "",
  children,
  onClick,
  disabled,
  type = "button",
  ...props
}: GlassButtonProps) {
  return (
    <GlassSurface
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      blur={blur}
      backgroundOpacity={backgroundOpacity}
      brightness={brightness}
      className={cn(
        "cursor-pointer group hover:border-brand-red/60 transition-all duration-200",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={disabled ? undefined : (onClick as any)}
    >
      <button
        type={type}
        disabled={disabled}
        className="w-full h-full flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground group-hover:text-white transition-colors cursor-pointer outline-none bg-transparent border-none"
        {...props}
      >
        {children}
      </button>
    </GlassSurface>
  );
}

export { Button, buttonVariants };
