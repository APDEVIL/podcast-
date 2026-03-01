// For the main better-auth package
declare module "better-auth" {
  export function betterAuth(config: any): any;

  export type BetterAuth = ReturnType<typeof betterAuth>;
}