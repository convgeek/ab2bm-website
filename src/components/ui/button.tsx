import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* Arrow SVG — translates 3px right on hover (.btn:hover .btn-arrow) */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      className={cn("btn-arrow", className)}
      aria-hidden="true"
    >
      <path d="M3 8 H13 M9 4 L13 8 L9 12" />
    </svg>
  )
}

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary:        "btn-primary",
      accent:         "btn-accent",
      secondary:      "btn-secondary",
      "secondary-dark": "btn-secondary-dark",
      ghost:          "btn-ghost",
      "ghost-dark":   "btn-ghost btn-ghost-dark",
      /* Keep legacy shadcn names for backwards compat with existing components */
      default:        "btn-primary",
      outline:        "btn-secondary",
      destructive:    "btn-accent",
      link:           "btn-ghost",
    },
    size: {
      default: "",
      sm:      "btn-sm",
      lg:      "btn-lg",
      xs:      "btn-sm",
      icon:    "aspect-square p-[12px]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
