import { CheckCircle } from "@/components/icons";

export const UserRegistered = () => {
    return (
        <>
        <div className="mb-10 text-center mx-auto inline-block bg-green-500 p-3 rounded-md text-white">
          <div className="flex item-center gap-4">
            <CheckCircle className="text-xl" aria-hidden="true" />
            <p className="text-sm font-medium">Success! User Registered successfully.</p>
          </div>
        </div>
      </>
    )
}