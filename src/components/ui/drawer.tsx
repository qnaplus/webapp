import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconX } from "@tabler/icons-react"

type DrawerSwipeDirection = "up" | "down" | "left" | "right"

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  swipeDirection = "right",
  showCloseButton = true,
  ...props
}: DrawerPrimitive.Popup.Props & {
  swipeDirection?: DrawerSwipeDirection
  showCloseButton?: boolean
}) {
  const swipeClasses: Record<DrawerSwipeDirection, string> = {
    right:
      "inset-y-0 right-0 h-full w-full sm:w-3/4 sm:max-w-3xl border-l translate-x-[var(--drawer-swipe-movement-x)] data-starting-style:translate-x-full data-ending-style:translate-x-full",
    left:
      "inset-y-0 left-0 h-full w-full sm:w-3/4 sm:max-w-md border-r translate-x-[var(--drawer-swipe-movement-x)] data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
    down:
      "inset-x-0 bottom-0 w-full h-full sm:h-auto sm:max-h-[85vh] border-t translate-y-[calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y))] data-starting-style:translate-y-full data-ending-style:translate-y-full",
    up:
      "inset-x-0 top-0 w-full h-full sm:h-auto sm:max-h-[85vh] border-b translate-y-[var(--drawer-swipe-movement-y)] data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
  }

  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerPrimitive.Popup
        data-slot="drawer-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out",
          "data-swiping:transition-none",
          swipeClasses[swipeDirection],
          className
        )}
        {...props}
      >
        <DrawerPrimitive.Content className="flex h-full flex-col overflow-y-auto">
          {children}
        </DrawerPrimitive.Content>
        {showCloseButton && (
          <DrawerPrimitive.Close
            data-slot="drawer-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 right-4"
                size="icon-sm"
              />
            }
          >
            <IconX />
            <span className="sr-only">Close</span>
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Popup>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-heading font-medium text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
