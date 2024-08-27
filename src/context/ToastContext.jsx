import { Toast } from "primereact/toast";
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
	const [toastRef, setToastRef] = useState(null);

	const showToast = useCallback(
		(severity, summary, detail, life = 3000) => {
			toastRef?.show({ severity, summary, detail, life });
		},
		[toastRef]
	);

	const toastMethods = {
		showSuccessToast: (summary, detail, life) => showToast("success", summary, detail, life),
		showErrorToast: (summary, detail, life) => showToast("error", summary, detail, life),
		showWarningToast: (summary, detail, life) => showToast("warn", summary, detail, life),
		showInfoToast: (summary, detail, life) => showToast("info", summary, detail, life),
		showToast
	};

	return (
		<ToastContext.Provider value={toastMethods}>
			<Toast ref={setToastRef} />
			{children}
		</ToastContext.Provider>
	);
};
