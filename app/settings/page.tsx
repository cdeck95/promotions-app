"use client";

import { Button } from "@/components/ui/button";

export default function UserSettings() {
  return (
    <div className="grid gridcol-1 min-h-screen w-full items-start p-4 lg:p-8 gap-4">
      <Button
        onClick={() =>
          window.open(
            "https://billing.stripe.com/p/login/test_6oE4hHfNgePw27m7ss"
          )
        }
      >
        <a href="https://billing.stripe.com/p/login/test_6oE4hHfNgePw27m7ss">
          Manage Subscription
        </a>
      </Button>
    </div>
  );
}
