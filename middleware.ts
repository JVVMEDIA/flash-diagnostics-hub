import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|icon$|icon\\.svg$|apple-icon$|manifest\\.webmanifest$|opengraph-image$|twitter-image$|robots\\.txt$|sitemap\\.xml$|.*\\..*).*)",
  ],
};