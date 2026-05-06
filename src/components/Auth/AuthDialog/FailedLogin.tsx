import { XCircle } from "@/components/icons";

export const FailedLogin = () => {
    return (
        <>
        <div className="mb-10 text-center mx-auto inline-block bg-error p-3 rounded-md">
          <div className="flex item-center gap-4">
            <XCircle className="text-xl" aria-hidden="true" />
            <p className="text-sm font-medium">Failed! Logged in failed.</p>
          </div>
        </div>
      </>
    )
}