declare module "@cashfreepayments/cashfree-js" {
  interface CashfreeConfig {
    mode: "sandbox" | "production";
  }

  interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | HTMLElement;
    appearance?: {
      width?: string;
      height?: string;
    };
  }

  interface CheckoutResult {
    error?: {
      message: string;
    };
    redirect?: boolean;
    paymentDetails?: {
      paymentMessage: string;
    };
  }

  interface Cashfree {
    checkout(options: CheckoutOptions): Promise<CheckoutResult>;
  }

  export function load(config: CashfreeConfig): Promise<Cashfree>;
}
