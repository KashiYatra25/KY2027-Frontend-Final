"use client";

export function CardBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[7px]">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(35, 18, 45, 0.98) 0%, rgba(28, 14, 38, 0.99) 30%, rgba(22, 10, 32, 1) 60%, rgba(18, 8, 28, 1) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a853' fill-rule='evenodd'%3E%3Cpath d='M20 20c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7zm0-2c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
