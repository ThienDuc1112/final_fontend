import { FaRegCircleCheck } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SuccessNotify({ message, variant, icon }) {
  return (
    <Alert variant={variant}>
      <div className="flex">
        {icon === "success" ? (
          <FaRegCircleCheck className="h-4 w-4  text-green-500 mr-2" />
        ) : (
          <FaExclamationTriangle className="h-4 w-4  text-red-500 mr-2" />
        )}
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
}
