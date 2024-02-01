import { FaRegCircleCheck } from "react-icons/fa6";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SuccessNotify({ message }) {
  return (
    <Alert variant="success">
      <div className="flex">
        <FaRegCircleCheck className="h-4 w-4  text-green-500 mr-2" />
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
}
