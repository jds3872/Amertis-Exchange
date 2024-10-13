"use client";

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function({ id, title, description, action, ...props }) {
				return (
					<Toast key={id} {...props}>
						{/* {promise && (
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
            )} */}
						<div className="grid gap-1 ">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && (
								<ToastDescription>{description}</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
