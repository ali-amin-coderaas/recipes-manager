import { Toast } from "primereact/toast";
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => {
	return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
	const [toastRef, setToastRef] = useState(null);

	const showToast = useCallback(
		(severity, summary, detail, life = 3000) => {
			if (toastRef) {
				toastRef.show({ severity, summary, detail, life });
			}
		},
		[toastRef]
	);

	return (
		<ToastContext.Provider value={{ showToast, toastRef, setToastRef }}>
			<Toast ref={setToastRef} position="bottom-right" />
			{children}
		</ToastContext.Provider>
	);
};
