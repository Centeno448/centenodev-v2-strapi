import type { Core } from '@strapi/strapi';
import { triggerNextRevalidation, getProjectSlug } from "./revalidation";

const applyTo = ['api::project.project', 'api::homepage.homepage'];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      if (!applyTo.includes(context.uid)) {
        return next();
      }

      // Only run for certain actions
      if (['create', 'update', 'delete'].includes(context.action)) {
        switch (context.uid) {
          case "api::project.project":
            let slugs: string[] = [];

            switch (context.action) {
              case "delete":
                slugs = [await getProjectSlug(context.params.documentId)];
                break;
              case "create":
                slugs = [context.params.data.slug];
                break;
              case "update":
                const oldSlug = await getProjectSlug(context.params.documentId);
                const newSlug = context.params.data.slug;

                slugs = [newSlug];

                if (oldSlug != newSlug) {
                  slugs.push(oldSlug);
                }
                break;
              default:
                break;
            }

            if (slugs.length) {
              try {
                slugs.map(async (slug: string, index: number) => {
                  const path = `/projects/${slug}`;
                  const tag = index == 0 ? "projects" : "";
                  await triggerNextRevalidation(path, tag);
                });
              }
              catch (error) {
                strapi.log.error(`Failed to trigger project revalidation with error ${error}`);
              }
            }
            else {
              strapi.log.warn(`Failed to trigger project revalidation for action ${context.action}. Slug not set`);
            }

            break;

          case "api::homepage.homepage":
            try {
              await triggerNextRevalidation("/");
            }
            catch (error) {
              strapi.log.error(`Failed to trigger homepage revalidation with error ${error}`);
            }
            break;
          default:
            break;
        }

      }

      return next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) { },
};
